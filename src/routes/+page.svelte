<svelte:head>
    <title>Manifesto</title>
    <meta name="description" content="De l'idée au produit — structure, code et déploie ton projet sans friction." />
    <meta name="keywords" content="productivité, Manifesto, génération de code, déploiement" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="Manifesto" />
    <meta property="og:description" content="De l'idée au produit sans friction." />
    <meta property="og:image" content="https://manifesto-app.fr/logo.svg" />
    <meta property="og:url" content="https://manifesto-app.fr/" />
    <meta property="og:type" content="website" />
</svelte:head>

<script>
    import { fly, slide, fade } from 'svelte/transition';
    import { quadInOut, quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    const bars = ['/M1.png', '/M23.png', '/M23.png'];
    const LOGO_ANIMATION_DELAY_MS = 2000;
    const BAR_STAGGER_DELAY_MS = 200;
    const LOGO_SIZE_VH = 16;

    const pitch = "De l'idée au produit  —  structure, code et déploie ton projet sans friction.";

    const ctas = [
        { label: 'Structurer mon idée',   icon: '→', description: 'UX, wireframes & architecture' },
        { label: 'Construire mon produit', icon: '→', description: 'Templates & génération de code' },
        { label: 'Mettre en ligne',        icon: '→', description: 'CI/CD, hébergement & monitoring' },
    ];

    const conceptionFeatures = [
        { icon: 'chat',   label: 'Questionnaire guidé par IA',     desc: 'Répondez à quelques questions, l\'IA structure votre vision.' },
        { icon: 'person', label: 'Génération de personas',          desc: 'Profils utilisateurs détaillés générés automatiquement.' },
        { icon: 'list',   label: 'User stories structurées',        desc: 'Backlog priorisé et stories au format standard Agile.' },
        { icon: 'arch',   label: 'Architecture suggérée',           desc: 'Stack technique adaptée à vos besoins et contraintes.' },
        { icon: 'export', label: 'Export PDF & Markdown',           desc: 'Cahier des charges prêt à partager en un clic.' },
    ];

    const stacks = [
        'React', 'Vue', 'Svelte', 'Next.js',
        'Node', 'Python', 'Go', 'Postgres',
        'MongoDB', 'Redis', 'Docker', 'Stripe',
    ];

    const codeFeatures = [
        { label: 'Templates production-ready',   desc: 'Bases de code testées et maintenues par la communauté.' },
        { label: 'Tests inclus d\'office',       desc: 'Couverture unitaire et e2e générée avec le projet.' },
        { label: 'Documentation auto-générée',   desc: 'README, JSDoc et Storybook pré-remplis.' },
        { label: 'CI/CD préconfigurée',          desc: 'GitHub Actions prêt à merger dès le premier commit.' },
    ];

    const deployTargets = [
        { name: 'Vercel',   tag: 'Serverless' },
        { name: 'Netlify',  tag: 'CDN global' },
        { name: 'Railway',  tag: 'Full-stack' },
        { name: 'Fly.io',   tag: 'Edge' },
        { name: 'AWS',      tag: 'Enterprise' },
        { name: 'VPS',      tag: 'Custom' },
    ];

    const deployFeatures = [
        { label: 'CI/CD automatique',       desc: 'Chaque push déclenche build, tests et deploy.' },
        { label: 'SSL + CDN inclus',        desc: 'HTTPS et distribution globale sans configuration.' },
        { label: 'Monitoring temps réel',   desc: 'Logs, métriques et alertes centralisés.' },
        { label: 'Rollback en 1 clic',      desc: 'Retour arrière instantané sur n\'importe quelle version.' },
    ];

    let showM    = false;
    let showText = false;

    onMount(() => {
        showM = true;
        setTimeout(() => (showText = true), LOGO_ANIMATION_DELAY_MS);
    });
</script>

<h1>Manifesto</h1>

<form method="POST">
    <input name="email" type="email" placeholder="email@example.com" />
    <button type="submit">Tester le serveur</button>
</form>

<!-- ═══ HERO ═══ -->
<section class="hero">
    <div class="hero-left">
        <div class="logo-container">
            {#if showM}
                <div class="M">
                    {#each bars as bar, i}
                        <img class="M-bars" src={bar} alt="M" style="height: {LOGO_SIZE_VH}vh"
                             in:fly|global={{ y: 100, delay: BAR_STAGGER_DELAY_MS * i, duration: 1000, easing: quadInOut }}>
                    {/each}
                </div>
            {/if}
            {#if showText}
                <p class="logo-text" style="font-size: {LOGO_SIZE_VH * 0.55}vw"
                   in:slide={{ duration: 1000, easing: quadInOut, axis: 'x' }}>anifesto</p>
            {/if}
        </div>
        <p class="pitch" class:visible={showText}>{pitch}</p>
    </div>

    <div class="hero-right">
        {#if showText}
            {#each ctas as cta, i}
                <button class="cta" in:fly|global={{ x: 30, duration: 800, delay: i * 150, easing: quintOut }}>
                    <span class="cta-content">
                        <span class="cta-label">{cta.label}</span>
                        <span class="cta-desc">{cta.description}</span>
                    </span>
                    <span class="cta-icon">{cta.icon}</span>
                </button>
            {/each}
        {/if}
    </div>
</section>

<!-- ═══ COMMENT CA MARCHE ═══ -->
{#if showText}
<section class="how-it-works" in:fade={{ duration: 600, delay: 400 }}>
    <h2 class="section-title">Comment ça marche ?</h2>

    <!-- ── PIPELINE ── -->
    <!--
        Grille à 7 colonnes : phase | conn | phase | conn | phase | conn-court | résultat
        Rangée 1 : artifacts (badges) centrés sur les colonnes connecteur
        Rangée 2 : rail (icônes + lignes + résultat)
    -->
    <div class="pipeline-wrap">

        <!-- ── rangée 1 : artifacts ── -->
        <div class="pipe-artifact pipe-artifact--1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z"/>
            </svg>
            Cahier des charges
        </div>

        <div class="pipe-artifact pipe-artifact--2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>
            </svg>
            Repo GitHub
        </div>

        <!-- ── rangée 2 : rail ── -->
        <div class="pipe-phase pipe-phase--conception">
            <div class="pipe-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
            </div>
            <span>Conception</span>
        </div>

        <div class="pipe-conn pipe-conn--1">
            <div class="pipe-line"></div>
            <svg class="pipe-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
            </svg>
        </div>

        <div class="pipe-phase pipe-phase--code">
            <div class="pipe-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25z"/>
                </svg>
            </div>
            <span>Code</span>
        </div>

        <div class="pipe-conn pipe-conn--2">
            <div class="pipe-line"></div>
            <svg class="pipe-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
            </svg>
        </div>

        <div class="pipe-phase pipe-phase--deploy">
            <div class="pipe-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75z"/>
                </svg>
            </div>
            <span>Déploiement</span>
        </div>

        <div class="pipe-conn pipe-conn--3">
            <div class="pipe-line"></div>
            <svg class="pipe-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
            </svg>
        </div>

        <div class="pipe-result">
            <div class="result-pulse"></div>
            <span>En ligne</span>
        </div>

    </div>

    <!-- ══════════════════════════════════════ -->
    <!-- STEP 1 — DÉVELOPPER UNE IDÉE          -->
    <!-- ══════════════════════════════════════ -->
    <div class="step" id="step-conception">
        <div class="step-header">
            <div class="step-number" style="--clr: var(--color-theme-2)">01</div>
            <div class="step-header-text">
                <h3 class="step-name">Développez votre idée</h3>
                <p class="step-subtitle">Transformez votre vision en spécifications claires et exploitables.</p>
            </div>
        </div>

        <div class="step-body">
            <div class="step-features">
                {#each conceptionFeatures as feat}
                    <div class="feature-row">
                        <div class="feature-dot" style="background: var(--color-theme-2)"></div>
                        <div class="feature-text">
                            <span class="feature-label">{feat.label}</span>
                            <span class="feature-desc">{feat.desc}</span>
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Mock : cahier des charges -->
            <div class="mock-card mock-doc">
                <div class="mock-header">
                    <div class="mock-dots">
                        <span></span><span></span><span></span>
                    </div>
                    <span class="mock-title-bar">cahier_des_charges.md</span>
                </div>
                <div class="mock-body">
                    <div class="doc-section">
                        <div class="doc-tag" style="color: var(--color-theme-2)">Objectif</div>
                        <div class="doc-lines">
                            <div class="doc-line" style="width: 88%"></div>
                            <div class="doc-line" style="width: 72%"></div>
                        </div>
                    </div>
                    <div class="doc-section">
                        <div class="doc-tag" style="color: var(--color-theme-2)">Personas</div>
                        <div class="doc-persona">
                            <div class="persona-avatar"></div>
                            <div class="doc-lines" style="flex:1">
                                <div class="doc-line" style="width: 60%"></div>
                                <div class="doc-line" style="width: 45%"></div>
                            </div>
                        </div>
                        <div class="doc-persona">
                            <div class="persona-avatar"></div>
                            <div class="doc-lines" style="flex:1">
                                <div class="doc-line" style="width: 55%"></div>
                                <div class="doc-line" style="width: 40%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="doc-section">
                        <div class="doc-tag" style="color: var(--color-theme-2)">User stories</div>
                        <div class="doc-stories">
                            <div class="story-item"><span class="story-id">US-01</span><div class="doc-line" style="width:75%"></div></div>
                            <div class="story-item"><span class="story-id">US-02</span><div class="doc-line" style="width:60%"></div></div>
                            <div class="story-item"><span class="story-id">US-03</span><div class="doc-line" style="width:80%"></div></div>
                        </div>
                    </div>
                    <div class="doc-section">
                        <div class="doc-tag" style="color: var(--color-theme-2)">Stack suggérée</div>
                        <div class="doc-stack-chips">
                            <span class="stack-chip">Next.js</span>
                            <span class="stack-chip">Postgres</span>
                            <span class="stack-chip">Stripe</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ══════════════════════════════════════ -->
    <!-- STEP 2 — CODER MON PROJET             -->
    <!-- ══════════════════════════════════════ -->
    <div class="step" id="step-code">
        <div class="step-header">
            <div class="step-number" style="--clr: var(--color-theme-1)">02</div>
            <div class="step-header-text">
                <h3 class="step-name">Générez votre code</h3>
                <p class="step-subtitle">Du cahier des charges au repo prêt à déployer, sans friction.</p>
            </div>
        </div>

        <div class="step-body">
            <!-- Mock : éditeur de code -->
            <div class="mock-card mock-editor">
                <div class="mock-header">
                    <div class="mock-dots">
                        <span></span><span></span><span></span>
                    </div>
                    <span class="mock-title-bar">Terminal</span>
                </div>
                <div class="mock-body mock-terminal">
                    <p class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">manifesto generate</span></p>
                    <p class="term-line term-dim">Lecture du cahier des charges...</p>
                    <p class="term-line"><span class="term-ok">✓</span> Stack détectée : <span class="term-hl">Next.js + Postgres</span></p>
                    <p class="term-line"><span class="term-ok">✓</span> 42 fichiers générés</p>
                    <p class="term-line"><span class="term-ok">✓</span> Tests créés (couverture 87%)</p>
                    <p class="term-line"><span class="term-ok">✓</span> CI/CD configurée</p>
                    <p class="term-line term-dim">─────────────────────</p>
                    <p class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">git push origin main</span></p>
                    <p class="term-line"><span class="term-ok">✓</span> Repo créé : <span class="term-hl">github.com/you/my-app</span></p>
                    <p class="term-cursor">_</p>
                </div>
            </div>

            <div class="step-right">
                <div class="stack-grid">
                    {#each stacks as s}
                        <div class="stack-tile">{s}</div>
                    {/each}
                </div>
                <div class="step-features" style="margin-top: 1.5rem">
                    {#each codeFeatures as feat}
                        <div class="feature-row">
                            <div class="feature-dot" style="background: var(--color-theme-1)"></div>
                            <div class="feature-text">
                                <span class="feature-label">{feat.label}</span>
                                <span class="feature-desc">{feat.desc}</span>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <!-- ══════════════════════════════════════ -->
    <!-- STEP 3 — DÉPLOYER MON CODE            -->
    <!-- ══════════════════════════════════════ -->
    <div class="step" id="step-deploy">
        <div class="step-header">
            <div class="step-number" style="--clr: var(--color-theme-3)">03</div>
            <div class="step-header-text">
                <h3 class="step-name">Mettez en ligne</h3>
                <p class="step-subtitle">Un deploy, zéro friction. Votre produit est live en quelques secondes.</p>
            </div>
        </div>

        <div class="step-body">
            <div class="step-left">
                <div class="deploy-grid">
                    {#each deployTargets as t}
                        <div class="deploy-tile">
                            <span class="deploy-name">{t.name}</span>
                            <span class="deploy-tag">{t.tag}</span>
                        </div>
                    {/each}
                </div>
                <div class="step-features" style="margin-top: 1.5rem">
                    {#each deployFeatures as feat}
                        <div class="feature-row">
                            <div class="feature-dot" style="background: var(--color-theme-3)"></div>
                            <div class="feature-text">
                                <span class="feature-label">{feat.label}</span>
                                <span class="feature-desc">{feat.desc}</span>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Mock : log de déploiement -->
            <div class="mock-card mock-deploy">
                <div class="mock-header">
                    <div class="mock-dots">
                        <span></span><span></span><span></span>
                    </div>
                    <span class="mock-title-bar">Deploy — my-app</span>
                    <span class="deploy-status-badge">Live</span>
                </div>
                <div class="mock-body mock-terminal">
                    <p class="term-line"><span class="term-ok">✓</span> Cloning repository</p>
                    <p class="term-line"><span class="term-ok">✓</span> Installing dependencies</p>
                    <p class="term-line"><span class="term-ok">✓</span> Running tests <span class="term-dim">(42/42 passed)</span></p>
                    <p class="term-line"><span class="term-ok">✓</span> Building production bundle</p>
                    <p class="term-line"><span class="term-ok">✓</span> Optimizing assets</p>
                    <p class="term-line"><span class="term-ok">✓</span> Provisioning SSL certificate</p>
                    <p class="term-line"><span class="term-ok">✓</span> Deploying to edge network</p>
                    <p class="term-line term-dim">─────────────────────</p>
                    <div class="deploy-live-row">
                        <div class="live-dot"></div>
                        <a class="deploy-url" href="#" tabindex="-1">https://my-app.manifesto.fr</a>
                        <span class="deploy-arrow">↗</span>
                    </div>
                    <div class="deploy-stats">
                        <div class="stat"><span class="stat-val">1.2s</span><span class="stat-key">Build</span></div>
                        <div class="stat"><span class="stat-val">99</span><span class="stat-key">Perf</span></div>
                        <div class="stat"><span class="stat-val">A+</span><span class="stat-key">SSL</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>
{/if}

<style>
    h1 {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    /* ══════════════════════════════════
       HERO
    ══════════════════════════════════ */
    .hero {
        display: grid;
        grid-template-columns: 1fr minmax(260px, 360px);
        align-items: center;
        min-height: 60vh;
        padding: clamp(2rem, 6vw, 4rem) clamp(1.5rem, 8vw, 10%);
        gap: clamp(1.5rem, 4vw, 3rem);
    }

    .hero-left {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .logo-container {
        display: flex;
        align-items: center;
    }

    .M {
        display: flex;
        margin-bottom: 3vh;
    }

    .logo-text {
        color: var(--color-theme-1);
        margin: 0;
    }

    .pitch {
        font-size: clamp(0.9rem, 1.4vw, 1.2rem);
        color: var(--color-text);
        margin: 0;
        opacity: 0;
        max-width: 48ch;
        line-height: 1.6;
        transition: opacity 0.8s ease 0.2s;
    }

    .pitch.visible { opacity: 0.6; }

    .hero-right {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .cta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        background: rgba(255,255,255,0.03);
        color: var(--color-text);
        border: 1px solid rgba(244,241,237,0.1);
        border-radius: 10px;
        padding: 0.9rem 1.2rem;
        cursor: pointer;
        text-align: left;
        transition: border-color 0.2s, background 0.2s, transform 0.15s;
    }

    .cta:hover {
        border-color: var(--color-theme-1);
        background: rgba(0,206,147,0.06);
        transform: translateX(4px);
    }

    .cta-content { display: flex; flex-direction: column; gap: 0.15rem; }
    .cta-label   { font-size: 0.9rem; font-weight: 500; }
    .cta-desc    { font-size: 0.7rem; opacity: 0.4; }

    .cta-icon {
        color: var(--color-theme-1);
        opacity: 0.6;
        transition: opacity 0.2s, transform 0.2s;
        flex-shrink: 0;
    }

    .cta:hover .cta-icon { opacity: 1; transform: translateX(3px); }

    /* ══════════════════════════════════
       HOW IT WORKS – wrapper
    ══════════════════════════════════ */
    .how-it-works {
        padding: clamp(2rem, 6vw, 5rem) clamp(1.5rem, 8vw, 10%);
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }

    .section-title {
        font-size: clamp(1rem, 1.6vw, 1.4rem);
        font-weight: 400;
        border: 1px solid rgba(244,241,237,0.2);
        border-radius: 6px;
        padding: 0.75rem 1.5rem;
        align-self: center;
        margin: 0;
    }

    /* ══════════════════════════════════
       PIPELINE  (grille CSS partagée)
       col: phase | conn | phase | conn | phase | conn-court | résultat
    ══════════════════════════════════ */
    .pipeline-wrap {
        display: grid;
        grid-template-columns: auto 1fr auto 1fr auto 0.5fr auto;
        grid-template-rows: auto auto;
        align-items: center;
        justify-items: center;
        row-gap: 0.6rem;
        border: 1px solid rgba(244,241,237,0.07);
        border-radius: 20px;
        background: rgba(255,255,255,0.015);
        padding: 2rem 3.5rem;
        overflow-x: auto;
    }

    /* ── artifacts (rangée 1) ── */
    .pipe-artifact {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        border: 1px solid rgba(244,241,237,0.14);
        border-radius: 20px;
        padding: 0.35rem 0.9rem;
        background: rgba(255,255,255,0.04);
        font-size: 0.7rem;
        letter-spacing: 0.04em;
        opacity: 0.75;
        white-space: nowrap;
        /* petit trait vertical vers la ligne du rail */
        position: relative;
    }

    .pipe-artifact::after {
        content: '';
        position: absolute;
        bottom: -0.65rem;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 0.6rem;
        background: rgba(244,241,237,0.15);
    }

    .pipe-artifact svg {
        width: 13px;
        height: 13px;
        opacity: 0.55;
        flex-shrink: 0;
    }

    /* ── phases (rangée 2) ── */
    .pipe-phase {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .pipe-icon {
        width: 64px;
        height: 64px;
        border-radius: 16px;
        border: 1px solid color-mix(in srgb, var(--clr) 45%, transparent);
        background: color-mix(in srgb, var(--clr) 9%, transparent);
        color: var(--clr);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: box-shadow 0.3s, transform 0.2s;
        cursor: default;
    }

    .pipe-icon:hover {
        box-shadow: 0 0 24px color-mix(in srgb, var(--clr) 28%, transparent);
        transform: translateY(-2px);
    }

    .pipe-icon svg { width: 26px; height: 26px; }

    .pipe-phase > span {
        font-size: 0.68rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        opacity: 0.4;
        white-space: nowrap;
    }

    /* ── connecteurs (rangée 2) ── */
    .pipe-conn {
        /* justify-self: stretch pour remplir la colonne 1fr */
        justify-self: stretch;
        display: flex;
        align-items: center;
        /* décalage vers le bas pour centrer sur l'icône
           (compense l'étiquette texte sous l'icône) */
        padding-bottom: 1.6rem;
    }

    .pipe-line {
        flex: 1;
        height: 1px;
        background: rgba(244,241,237,0.12);
    }

    .pipe-arrow {
        width: 18px;
        height: 18px;
        color: rgba(244,241,237,0.2);
        flex-shrink: 0;
    }

    /* ── résultat (rangée 2) ── */
    .pipe-result {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .result-pulse {
        width: 64px;
        height: 64px;
        border-radius: 16px;
        border: 1px solid color-mix(in srgb, var(--color-theme-1) 40%, transparent);
        background: color-mix(in srgb, var(--color-theme-1) 10%, transparent);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .result-pulse::after {
        content: '';
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--color-theme-1);
        box-shadow: 0 0 14px var(--color-theme-1);
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.55; transform: scale(0.8); }
    }

    .pipe-result > span {
        font-size: 0.68rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        opacity: 0.4;
        white-space: nowrap;
    }

    /* ══════════════════════════════════
       STEPS – shared
    ══════════════════════════════════ */
    .step {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
    }

    .step-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .step-number {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 700;
        color: color-mix(in srgb, var(--clr) 30%, transparent);
        line-height: 1;
        flex-shrink: 0;
        letter-spacing: -0.04em;
        font-variant-numeric: tabular-nums;
    }

    .step-header-text {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .step-name {
        font-size: clamp(1.4rem, 2.5vw, 2rem);
        font-weight: 500;
        margin: 0;
        letter-spacing: -0.02em;
    }

    .step-subtitle {
        font-size: clamp(0.85rem, 1.2vw, 1rem);
        opacity: 0.45;
        margin: 0;
        max-width: 52ch;
        line-height: 1.5;
    }

    .step-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: clamp(1.5rem, 4vw, 3rem);
        align-items: start;
    }

    .step-body--reverse { direction: rtl; }
    .step-body--reverse > * { direction: ltr; }

    /* feature list */
    .step-features {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .feature-row {
        display: flex;
        align-items: flex-start;
        gap: 0.9rem;
    }

    .feature-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex-shrink: 0;
        margin-top: 0.45rem;
        opacity: 0.8;
    }

    .feature-text {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
    }

    .feature-label {
        font-size: 0.9rem;
        font-weight: 500;
        line-height: 1.3;
    }

    .feature-desc {
        font-size: 0.78rem;
        opacity: 0.4;
        line-height: 1.4;
    }

    /* step-right / step-left containers */
    .step-right, .step-left {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    /* ══════════════════════════════════
       MOCK CARDS (shared chrome)
    ══════════════════════════════════ */
    .mock-card {
        border: 1px solid rgba(244,241,237,0.1);
        border-radius: 14px;
        overflow: hidden;
        background: rgba(0,0,0,0.35);
    }

    .mock-header {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.6rem 0.9rem;
        border-bottom: 1px solid rgba(244,241,237,0.07);
        background: rgba(255,255,255,0.03);
    }

    .mock-dots { display: flex; gap: 5px; }
    .mock-dots span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(244,241,237,0.15);
    }

    .mock-title-bar {
        font-size: 0.72rem;
        opacity: 0.35;
        letter-spacing: 0.04em;
        flex: 1;
    }

    .mock-body { padding: 1.2rem; }

    /* ══════════════════════════════════
       MOCK — DOCUMENT (step 1)
    ══════════════════════════════════ */
    .doc-section {
        margin-bottom: 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .doc-tag {
        font-size: 0.65rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-weight: 600;
    }

    .doc-lines {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .doc-line {
        height: 8px;
        border-radius: 4px;
        background: rgba(244,241,237,0.1);
    }

    .doc-persona {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 0.4rem;
    }

    .persona-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(244,241,237,0.1);
        flex-shrink: 0;
    }

    .doc-stories { display: flex; flex-direction: column; gap: 0.4rem; }

    .story-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .story-id {
        font-size: 0.6rem;
        font-family: var(--font-mono);
        opacity: 0.35;
        flex-shrink: 0;
        letter-spacing: 0.05em;
    }

    .doc-stack-chips {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
    }

    .stack-chip {
        font-size: 0.65rem;
        padding: 0.2rem 0.55rem;
        border-radius: 20px;
        border: 1px solid rgba(151,71,254,0.35);
        color: var(--color-theme-2);
        background: rgba(151,71,254,0.08);
    }

    /* ══════════════════════════════════
       MOCK — TERMINAL (steps 2 & 3)
    ══════════════════════════════════ */
    .mock-terminal {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        line-height: 1.8;
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .term-line { margin: 0; display: flex; align-items: center; gap: 0.4rem; }
    .term-prompt { color: var(--color-theme-1); opacity: 0.7; }
    .term-cmd    { color: var(--color-text); }
    .term-ok     { color: var(--color-theme-1); }
    .term-hl     { color: var(--color-theme-3); }
    .term-dim    { opacity: 0.3; }
    .term-cursor { color: var(--color-theme-1); animation: blink 1s step-end infinite; margin: 0; }

    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

    /* ══════════════════════════════════
       STACK GRID (step 2)
    ══════════════════════════════════ */
    .stack-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem;
    }

    .stack-tile {
        border: 1px solid rgba(244,241,237,0.1);
        border-radius: 8px;
        padding: 0.5rem 0.4rem;
        font-size: 0.72rem;
        text-align: center;
        opacity: 0.6;
        background: rgba(255,255,255,0.02);
        transition: border-color 0.2s, opacity 0.2s;
        cursor: default;
    }

    .stack-tile:hover {
        border-color: var(--color-theme-1);
        opacity: 1;
    }

    /* ══════════════════════════════════
       DEPLOY GRID (step 3)
    ══════════════════════════════════ */
    .deploy-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
    }

    .deploy-tile {
        border: 1px solid rgba(244,241,237,0.1);
        border-radius: 10px;
        padding: 0.75rem 0.6rem;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        background: rgba(255,255,255,0.02);
        transition: border-color 0.2s, background 0.2s;
        cursor: default;
    }

    .deploy-tile:hover {
        border-color: var(--color-theme-3);
        background: rgba(101,198,202,0.05);
    }

    .deploy-name { font-size: 0.82rem; font-weight: 500; }
    .deploy-tag  { font-size: 0.62rem; opacity: 0.35; letter-spacing: 0.05em; }

    /* deploy mock specifics */
    .deploy-status-badge {
        font-size: 0.6rem;
        padding: 0.15rem 0.5rem;
        border-radius: 20px;
        background: rgba(0,206,147,0.15);
        border: 1px solid rgba(0,206,147,0.3);
        color: var(--color-theme-1);
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .deploy-live-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.3rem;
    }

    .live-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--color-theme-1);
        box-shadow: 0 0 8px var(--color-theme-1);
        flex-shrink: 0;
        animation: pulse 2s ease-in-out infinite;
    }

    .deploy-url {
        font-size: 0.72rem;
        color: var(--color-theme-3);
        text-decoration: none;
        opacity: 0.85;
    }

    .deploy-arrow { opacity: 0.4; font-size: 0.72rem; }

    .deploy-stats {
        display: flex;
        gap: 1.5rem;
        margin-top: 0.8rem;
        padding-top: 0.8rem;
        border-top: 1px solid rgba(244,241,237,0.07);
    }

    .stat { display: flex; flex-direction: column; gap: 0.1rem; }
    .stat-val { font-size: 0.9rem; font-weight: 600; color: var(--color-theme-1); }
    .stat-key { font-size: 0.58rem; opacity: 0.35; letter-spacing: 0.07em; text-transform: uppercase; }

    /* ══════════════════════════════════
       RESPONSIVE
    ══════════════════════════════════ */
    @media (max-width: 900px) {
        .hero { grid-template-columns: 1fr; min-height: auto; }
        .logo-text { display: none; }

        .step-body, .step-body--reverse {
            grid-template-columns: 1fr;
            direction: ltr;
        }

        .pipeline-wrap { padding: 1.5rem 1rem; }
        .pipe-icon { width: 52px; height: 52px; border-radius: 12px; }
        .pipe-icon svg { width: 20px; height: 20px; }
        .result-pulse { width: 52px; height: 52px; border-radius: 12px; }

        .stack-grid { grid-template-columns: repeat(3, 1fr); }
        .deploy-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 600px) {
        .pipeline-artifacts { display: none; }
        .stack-grid { grid-template-columns: repeat(2, 1fr); }
    }
</style>
