import { fail } from '@sveltejs/kit';
import {
    GITLAB_TOKEN,
    MANIFESTO_CENTRAL_PROJECT_ID,
    MANIFESTO_GROUP_ID,
    MANIFESTO_API_URL,
    MANIFESTO_INTERNAL_TOKEN
} from '$env/static/private';

function generateDbPassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from(crypto.getRandomValues(new Uint32Array(20)))
        .map((x) => chars[x % chars.length])
        .join('');
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const githubUrl = data.get('repoUrl')?.trim() ?? '';
        const domain    = data.get('domain')?.trim()   ?? '';

        // Validation — on renvoie les valeurs pour restaurer le formulaire côté client
        if (!githubUrl) {
            return fail(422, { error: 'L\'URL du repo GitHub est requise.', repoUrl: githubUrl, domain });
        }
        try { new URL(githubUrl); } catch {
            return fail(422, { error: 'URL GitHub invalide (ex: https://github.com/user/repo).', repoUrl: githubUrl, domain });
        }
        if (!domain || !/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(domain)) {
            return fail(422, { error: 'Le domaine ne peut contenir que des lettres, chiffres et tirets, et ne peut pas commencer ou finir par un tiret.', repoUrl: githubUrl, domain });
        }

        const projectName = domain.toLowerCase().replace(/[^a-z0-9-]/g, '-');

        try {
            // 1. Création du repo par import depuis GitHub
            const createRepoRes = await fetch('https://gitlab.com/api/v4/projects', {
                method: 'POST',
                headers: {
                    'PRIVATE-TOKEN': GITLAB_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: projectName,
                    namespace_id: MANIFESTO_GROUP_ID,
                    import_url: githubUrl,
                    initialize_with_readme: false
                })
            });

            const newRepo = await createRepoRes.json();

            if (!createRepoRes.ok) {
                const detail = newRepo.message
                    ? (typeof newRepo.message === 'object' ? JSON.stringify(newRepo.message) : newRepo.message)
                    : JSON.stringify(newRepo);
                return fail(422, { error: `GitLab (création repo) : ${detail}`, repoUrl: githubUrl, domain });
            }

            // 2. Déclenchement de la pipeline centrale
            const pipelineRes = await fetch(
                `https://gitlab.com/api/v4/projects/${MANIFESTO_CENTRAL_PROJECT_ID}/pipeline`,
                {
                    method: 'POST',
                    headers: {
                        'PRIVATE-TOKEN': GITLAB_TOKEN,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ref: 'main',
                        variables: [
                            { key: 'PROJECT_NAME',            value: projectName        },
                            { key: 'USER_GITLAB_REPO_URL',    value: newRepo.web_url    },
                            { key: 'DB_PASSWORD',             value: generateDbPassword() },
                            { key: 'MANIFESTO_API_URL',       value: MANIFESTO_API_URL  },
                            { key: 'MANIFESTO_INTERNAL_TOKEN', value: MANIFESTO_INTERNAL_TOKEN }
                        ]
                    })
                }
            );

            const pipelineData = await pipelineRes.json();

            if (!pipelineRes.ok) {
                return fail(422, {
                    error: `GitLab (pipeline) : ${JSON.stringify(pipelineData.message)}`,
                    repoUrl: githubUrl,
                    domain
                });
            }

            return {
                success: true,
                repoUrl:     newRepo.web_url,
                pipelineId:  pipelineData.id,
                domain,
                projectName
            };

        } catch (err) {
            console.error('Deploy error:', err.message);
            return fail(500, { error: `Erreur réseau : ${err.message}`, repoUrl: githubUrl, domain });
        }
    }
};
