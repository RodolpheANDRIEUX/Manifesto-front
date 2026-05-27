<script>
  import { enhance } from '$app/forms';
  export let form;

  let loading = false;
  let logLines = [];
  let logTimers = [];

  // Séquence de logs simulés pendant le traitement serveur
  const LOG_SEQUENCE = [
    { ms: 700,  text: 'Connexion à l\'API GitLab...' },
    { ms: 1600, text: 'Création du repository...' },
    { ms: 2800, text: 'Import depuis GitHub en cours...' },
    { ms: 4200, text: 'Déclenchement de la pipeline centrale...' },
  ];

  function startLog() {
    logLines = [];
    LOG_SEQUENCE.forEach(({ ms, text }) => {
      logTimers.push(setTimeout(() => { logLines = [...logLines, text]; }, ms));
    });
  }

  function stopLog() {
    logTimers.forEach(clearTimeout);
    logTimers = [];
  }
</script>


{#if form?.success}

  <!-- ══════════════════════
       PANNEAU SUCCÈS
  ══════════════════════ -->
  <div class="deploy-wrap">
    <div class="deploy-header">
      <p class="step-tag">03 — Déploiement</p>
      <h2>Déploiement lancé</h2>
      <p class="subtitle">Votre infrastructure est en cours de provisionnement.</p>
    </div>

    <div class="success-panel">

      <div class="success-log">
        <div class="slog-line"><span class="ok">✓</span> Repository importé sur GitLab</div>
        <div class="slog-line"><span class="ok">✓</span> Pipeline centrale déclenchée · <span class="mono dim">#{form.pipelineId}</span></div>
        <div class="slog-line async-note">
          La suite (build, provisionnement, SSL) s'exécute dans la pipeline GitLab de façon asynchrone.
        </div>
      </div>

      <div class="success-meta">
        <div class="meta-row">
          <span class="meta-label">Repository</span>
          <a href={form.repoUrl} target="_blank" rel="noreferrer" class="meta-value link">
            {form.repoUrl.replace('https://', '')} ↗
          </a>
        </div>
        <div class="meta-row">
          <span class="meta-label">Domaine cible</span>
          <span class="meta-value mono">{form.domain}.manifesto.uno</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Projet</span>
          <span class="meta-value mono">{form.projectName}</span>
        </div>
      </div>

      <p class="success-note">
        Le build et le déploiement prennent généralement 3 à 8 minutes.
        Votre app sera disponible à l'adresse ci-dessus une fois la pipeline terminée.
      </p>

      <a href="/deploy" class="new-deploy-btn">Nouveau déploiement →</a>
    </div>
  </div>

{:else}

  <!-- ══════════════════════
       FORMULAIRE
  ══════════════════════ -->
  <div class="deploy-wrap">
    <div class="deploy-header">
      <p class="step-tag">03 — Déploiement</p>
      <h2>Mettez en ligne</h2>
      <p class="subtitle">Importez votre repo GitHub et déployez sur l'infrastructure Manifesto en quelques secondes.</p>
    </div>

    <!-- Pipeline steps reminder -->
    <div class="pipeline-hint">
      <div class="ph-step active">
        <span class="ph-num">1</span>
        <span>Import GitHub → GitLab</span>
      </div>
      <div class="ph-sep">→</div>
      <div class="ph-step">
        <span class="ph-num">2</span>
        <span>Pipeline CI/CD</span>
      </div>
      <div class="ph-sep">→</div>
      <div class="ph-step">
        <span class="ph-num">3</span>
        <span>Live sur votre domaine</span>
      </div>
    </div>

    <form method="POST" use:enhance={() => {
      loading = true;
      startLog();
      return async ({ update }) => {
        stopLog();
        loading = false;
        // reset: false conserve les valeurs du formulaire en cas d'erreur
        await update({ reset: false });
      };
    }}>

      <div class="field">
        <label for="repoUrl">Repo GitHub source</label>
        <input
          type="url"
          id="repoUrl"
          name="repoUrl"
          placeholder="https://github.com/votre-compte/votre-app"
          value={form?.repoUrl ?? ''}
          autocomplete="url"
          required
          disabled={loading}
        />
        <span class="field-hint">Le repo doit être public ou accessible par Manifesto.</span>
      </div>

      <div class="field">
        <label for="domain">Domaine Manifesto</label>
        <div class="input-row">
          <input
            type="text"
            id="domain"
            name="domain"
            placeholder="mon-projet"
            value={form?.domain ?? ''}
            pattern="[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]"
            autocomplete="off"
            required
            disabled={loading}
          />
          <span class="suffix">.manifesto.uno</span>
        </div>
        <span class="field-hint">Lettres, chiffres et tirets uniquement.</span>
      </div>

      <!-- Log de progression animé -->
      {#if loading}
        <div class="loading-log" aria-live="polite" aria-label="Progression du déploiement">
          {#if logLines.length === 0}
            <div class="ll-line"><span class="spinner-sm"></span> Initialisation…</div>
          {/if}
          {#each logLines as line, i}
            <div class="ll-line" class:ll-latest={i === logLines.length - 1}>
              {#if i < logLines.length - 1}
                <span class="ll-ok">✓</span>
              {:else}
                <span class="spinner-sm"></span>
              {/if}
              {line}
            </div>
          {/each}
        </div>
      {/if}

      <button type="submit" disabled={loading}>
        {#if loading}
          <span class="spinner"></span> Orchestration en cours…
        {:else}
          Démarrer le déploiement →
        {/if}
      </button>

    </form>

    <!-- Erreur -->
    {#if form?.success === false}
      <div class="error-panel" role="alert">
        <div class="error-head">
          <span class="error-icon">⚠</span>
          <span class="error-title">Échec du déploiement</span>
        </div>
        <p class="error-msg">{form.error}</p>
        <p class="error-hint">
          Vérifiez que le repo GitHub est public et accessible, et que le nom de domaine n'est pas déjà utilisé.
        </p>
      </div>
    {/if}

  </div>

{/if}


<style>
  /* ══════════════════════════════════
     LAYOUT
  ══════════════════════════════════ */
  .deploy-wrap {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 520px;
    margin: 0 auto;
    padding: clamp(3rem, 8vh, 6rem) clamp(1.5rem, 5vw, 2rem);
  }

  /* ── header ── */
  .deploy-header { display: flex; flex-direction: column; gap: 0.4rem; }

  .step-tag {
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-theme-3);
    opacity: 0.75;
    margin: 0;
  }

  h2 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 500;
    margin: 0;
    letter-spacing: -0.02em;
    color: var(--color-text);
  }

  .subtitle {
    font-size: 0.85rem;
    opacity: 0.55;
    margin: 0;
    line-height: 1.5;
    max-width: 42ch;
  }

  /* ══════════════════════════════════
     PIPELINE HINT
  ══════════════════════════════════ */
  .pipeline-hint {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1rem;
    border: 1px solid rgba(244,241,237,0.1);
    border-radius: 10px;
    background: rgba(255,255,255,0.02);
    flex-wrap: wrap;
  }

  .ph-step {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    opacity: 0.45;
  }

  .ph-step.active { opacity: 0.9; }

  .ph-num {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 1px solid rgba(244,241,237,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    flex-shrink: 0;
  }

  .ph-step.active .ph-num {
    border-color: var(--color-theme-1);
    color: var(--color-theme-1);
  }

  .ph-sep { opacity: 0.25; font-size: 0.75rem; }

  /* ══════════════════════════════════
     FORM
  ══════════════════════════════════ */
  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    border: 1px solid rgba(244,241,237,0.1);
    border-radius: 14px;
    background: rgba(255,255,255,0.02);
    padding: 1.75rem;
  }

  .field { display: flex; flex-direction: column; gap: 0.4rem; }

  label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-theme-1);
  }

  .field-hint {
    font-size: 0.7rem;
    opacity: 0.45;
    line-height: 1.4;
  }

  input {
    width: 100%;
    background: rgba(0,0,0,0.35);
    border: 1px solid rgba(244,241,237,0.12);
    border-radius: 8px;
    padding: 0.7rem 0.9rem;
    color: var(--color-text);
    font-size: 0.9rem;
    font-family: inherit;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  input:focus { outline: none; border-color: rgba(0,206,147,0.45); }
  input::placeholder { opacity: 0.25; }
  input:disabled { opacity: 0.5; cursor: not-allowed; }

  .input-row { position: relative; display: flex; align-items: center; }
  .input-row input { padding-right: 9.5rem; }

  .suffix {
    position: absolute;
    right: 0.9rem;
    font-size: 0.75rem;
    color: var(--color-text);
    opacity: 0.35;
    white-space: nowrap;
    pointer-events: none;
  }

  /* ══════════════════════════════════
     LOADING LOG
  ══════════════════════════════════ */
  .loading-log {
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(244,241,237,0.08);
    border-radius: 8px;
    padding: 0.9rem 1rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .ll-line {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.55;
    transition: opacity 0.3s;
  }

  .ll-latest { opacity: 1; }
  .ll-ok { color: var(--color-theme-1); flex-shrink: 0; }

  /* ── submit button ── */
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.85rem 1.2rem;
    background: rgba(0,206,147,0.1);
    border: 1px solid rgba(0,206,147,0.3);
    border-radius: 8px;
    color: var(--color-theme-1);
    font-size: 0.88rem;
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
  }

  button:hover:not(:disabled) {
    background: rgba(0,206,147,0.16);
    border-color: rgba(0,206,147,0.55);
    transform: translateY(-1px);
  }

  button:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ══════════════════════════════════
     SPINNERS
  ══════════════════════════════════ */
  .spinner {
    width: 0.85rem;
    height: 0.85rem;
    border: 1.5px solid rgba(0,206,147,0.3);
    border-top-color: var(--color-theme-1);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    flex-shrink: 0;
  }

  .spinner-sm {
    width: 0.65rem;
    height: 0.65rem;
    border: 1.5px solid rgba(244,241,237,0.2);
    border-top-color: rgba(244,241,237,0.7);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
    display: inline-block;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ══════════════════════════════════
     ERROR PANEL
  ══════════════════════════════════ */
  .error-panel {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1.1rem 1.25rem;
    border-radius: 10px;
    background: rgba(255,60,60,0.06);
    border: 1px solid rgba(255,60,60,0.2);
    border-left: 3px solid rgba(255,80,80,0.7);
  }

  .error-head { display: flex; align-items: center; gap: 0.5rem; }
  .error-icon { font-size: 0.9rem; color: rgba(255,120,120,0.9); }
  .error-title { font-size: 0.88rem; font-weight: 600; }

  .error-msg {
    font-size: 0.8rem;
    opacity: 0.75;
    margin: 0;
    font-family: var(--font-mono);
    word-break: break-word;
  }

  .error-hint {
    font-size: 0.75rem;
    opacity: 0.5;
    margin: 0.2rem 0 0;
    line-height: 1.4;
  }

  /* ══════════════════════════════════
     SUCCESS PANEL
  ══════════════════════════════════ */
  .success-panel {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    border: 1px solid rgba(0,206,147,0.2);
    border-radius: 14px;
    background: rgba(0,206,147,0.04);
    padding: 1.75rem;
  }

  /* log terminal success */
  .success-log {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(244,241,237,0.08);
    border-radius: 8px;
    padding: 1rem 1.1rem;
  }

  .slog-line {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .ok { color: var(--color-theme-1); flex-shrink: 0; }
  .mono { font-family: var(--font-mono); }
  .dim { opacity: 0.5; }

  .slog-line.async-note {
    opacity: 0.45;
    font-family: inherit;
    font-size: 0.72rem;
    margin-top: 0.2rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(244,241,237,0.07);
    line-height: 1.4;
  }

  /* meta rows */
  .success-meta {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding-top: 0.25rem;
  }

  .meta-row {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    font-size: 0.83rem;
  }

  .meta-label {
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.5;
    flex-shrink: 0;
    min-width: 7rem;
  }

  .meta-value { opacity: 0.85; }
  .meta-value.mono { font-family: var(--font-mono); font-size: 0.78rem; }
  .meta-value.link { color: var(--color-theme-1); text-decoration: none; word-break: break-all; }
  .meta-value.link:hover { text-decoration: underline; }

  .success-note {
    font-size: 0.78rem;
    opacity: 0.5;
    margin: 0;
    line-height: 1.5;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(244,241,237,0.08);
  }

  .new-deploy-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    color: var(--color-theme-1);
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.2s;
    align-self: flex-start;
  }

  .new-deploy-btn:hover { opacity: 1; text-decoration: underline; }
</style>
