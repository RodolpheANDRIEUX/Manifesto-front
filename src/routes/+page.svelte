<svelte:head>
    <title>Manifesto</title>
    <meta name="description" content="A boilerplate for Manifesto apps" />

    <!-- SEO -->
    <meta name="keywords" content="productivity, Manifesto, manifesto app" />
    <meta name="robots" content="index, follow" />
    <!-- Open Graph tags for social media platforms -->
    <meta property="og:title" content="Manifesto" />
    <meta property="og:description" content="The best productivity apps" />
    <meta property="og:image" content="https://manifesto-app.fr/logo.svg" />
    <meta property="og:url" content="https://manifesto-app.fr/" />
    <meta property="og:type" content="website" />
</svelte:head>

<script>
    import { fly, slide, fade } from 'svelte/transition';
    import {quadInOut, quintOut} from "svelte/easing";
    import {onMount} from 'svelte';

    const bars = ['/M1.png', '/M23.png', '/M23.png'];
    const LOGO_ANIMATION_DELAY_MS = 2000;
    const BAR_STAGGER_DELAY_MS = 200;
    const LOGO_SIZE_VH = 16;

    const pitch = "De l'idée au produit  —  structure, code et déploie ton projet sans friction.";

    const ctas = [
        { label: 'Structurer mon idée', icon: '→', description: 'UX, wireframes & architecture' },
        { label: 'Construire mon produit', icon: '→', description: 'Templates & génération de code' },
        { label: 'Mettre en ligne', icon: '→', description: 'CI/CD, hébergement & monitoring' },
    ];

    let showM  = false;
    let showText = false;

    onMount(() => {
        showM = true;
        setTimeout(() => showText = true, LOGO_ANIMATION_DELAY_MS);
    });
</script>

<h1>Manifesto</h1>

<!-- HERO -->
<section class="hero">
    <div class="hero-left">
        <div class="logo-container">
            {#if showM}
                <div class="M">
                    {#each bars as bar, i}
                        <img class="M-bars" src={bar} alt="M" style="height: {LOGO_SIZE_VH}vh"
                             in:fly|global={{ y: 100, delay: BAR_STAGGER_DELAY_MS * i, duration: 1000, easing: quadInOut }}
                        >
                    {/each}
                </div>
            {/if}

            {#if showText}
                <p class="logo-text" style="font-size: {LOGO_SIZE_VH * 0.55}vw" in:slide={{ duration: 1000, easing: quadInOut, axis: 'x'}}>anifesto</p>
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

<!-- COMMENT CA MARCHE -->
{#if showText}
<section class="how-it-works" in:fade={{ duration: 600, delay: 400 }}>
    <h2 class="section-title">Comment ça marche ?</h2>

    <!-- PIPELINE SCHEMA -->
    <div class="pipeline">

        <div class="pipeline-phase" style="--clr: var(--color-theme-2)">
            <div class="phase-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
            </div>
            <span class="phase-label">Conception</span>
        </div>

        <div class="pipeline-connector">
            <div class="connector-track">
                <div class="track-line"></div>
                <div class="artifact-bubble">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z"/>
                    </svg>
                    <span>Cahier des charges</span>
                </div>
                <div class="track-line"></div>
            </div>
            <div class="connector-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                </svg>
            </div>
        </div>

        <div class="pipeline-phase" style="--clr: var(--color-theme-1)">
            <div class="phase-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25z"/>
                </svg>
            </div>
            <span class="phase-label">Code</span>
        </div>

        <div class="pipeline-connector">
            <div class="connector-track">
                <div class="track-line"></div>
                <div class="artifact-bubble">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>
                    </svg>
                    <span>Repo GitHub</span>
                </div>
                <div class="track-line"></div>
            </div>
            <div class="connector-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                </svg>
            </div>
        </div>

        <div class="pipeline-phase" style="--clr: var(--color-theme-3)">
            <div class="phase-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75z"/>
                </svg>
            </div>
            <span class="phase-label">Déploiement</span>
        </div>

        <div class="pipeline-connector pipeline-connector--short">
            <div class="connector-track">
                <div class="track-line"></div>
            </div>
            <div class="connector-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                </svg>
            </div>
        </div>

        <div class="pipeline-result">
            <div class="result-dot"></div>
            <span>En ligne</span>
        </div>

    </div>

    <!-- STEPS -->
    <div class="steps">
        <div class="step">
            <h3 class="step-title">Développer une idée</h3>
            <div class="step-content"></div>
        </div>

        <div class="step">
            <h3 class="step-title">Coder mon projet</h3>
            <div class="step-content"></div>
        </div>

        <div class="step">
            <h3 class="step-title">Déployer mon code</h3>
            <div class="step-content"></div>
        </div>
    </div>
</section>
{/if}

<style>
    h1 {
        position: absolute;
        opacity: 0;
    }

    /* HERO */
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

    .pitch.visible {
        opacity: 0.6;
    }

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
        background: rgba(255, 255, 255, 0.03);
        color: var(--color-text);
        border: 1px solid rgba(244, 241, 237, 0.1);
        border-radius: 10px;
        padding: 0.9rem 1.2rem;
        cursor: pointer;
        text-align: left;
        transition: border-color 0.2s, background 0.2s, transform 0.15s;
    }

    .cta:hover {
        border-color: var(--color-theme-1);
        background: rgba(0, 206, 147, 0.06);
        transform: translateX(4px);
    }

    .cta-content {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
    }

    .cta-label {
        font-size: 0.9rem;
        font-weight: 500;
    }

    .cta-desc {
        font-size: 0.7rem;
        opacity: 0.4;
    }

    .cta-icon {
        color: var(--color-theme-1);
        opacity: 0.6;
        transition: opacity 0.2s, transform 0.2s;
        flex-shrink: 0;
    }

    .cta:hover .cta-icon {
        opacity: 1;
        transform: translateX(3px);
    }

    /* HOW IT WORKS */
    .how-it-works {
        padding: clamp(2rem, 6vw, 4rem) clamp(1.5rem, 8vw, 10%);
        display: flex;
        flex-direction: column;
        gap: 3.5rem;
    }

    .section-title {
        font-size: clamp(1rem, 1.6vw, 1.4rem);
        font-weight: 400;
        border: 1px solid rgba(244, 241, 237, 0.2);
        border-radius: 6px;
        padding: 0.75rem 1.5rem;
        align-self: center;
        margin: 0;
    }

    /* PIPELINE */
    .pipeline {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding: 2.5rem 1rem;
        border: 1px solid rgba(244, 241, 237, 0.06);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.015);
    }

    .pipeline-phase {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        flex-shrink: 0;
    }

    .phase-icon {
        width: 52px;
        height: 52px;
        border-radius: 12px;
        border: 1px solid color-mix(in srgb, var(--clr) 40%, transparent);
        background: color-mix(in srgb, var(--clr) 8%, transparent);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--clr);
        transition: box-shadow 0.3s;
    }

    .phase-icon:hover {
        box-shadow: 0 0 20px color-mix(in srgb, var(--clr) 25%, transparent);
    }

    .phase-icon svg {
        width: 22px;
        height: 22px;
    }

    .phase-label {
        font-size: 0.72rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        opacity: 0.5;
        white-space: nowrap;
    }

    /* CONNECTOR */
    .pipeline-connector {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        padding-bottom: 1.4rem; /* offset for label below icon */
    }

    .connector-track {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
    }

    .track-line {
        width: 36px;
        height: 1px;
        background: rgba(244, 241, 237, 0.12);
    }

    .artifact-bubble {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        border: 1px solid rgba(244, 241, 237, 0.14);
        border-radius: 20px;
        padding: 0.3rem 0.7rem;
        background: rgba(255, 255, 255, 0.04);
        white-space: nowrap;
    }

    .artifact-bubble svg {
        width: 13px;
        height: 13px;
        opacity: 0.55;
        flex-shrink: 0;
    }

    .artifact-bubble span {
        font-size: 0.65rem;
        opacity: 0.45;
        letter-spacing: 0.03em;
    }

    .connector-arrow {
        width: 18px;
        height: 18px;
        color: rgba(244, 241, 237, 0.2);
        flex-shrink: 0;
    }

    .connector-arrow svg {
        width: 100%;
        height: 100%;
    }

    .pipeline-connector--short .connector-track {
        flex-direction: row;
    }

    .pipeline-connector--short .track-line {
        width: 36px;
        height: 1px;
    }

    /* RESULT */
    .pipeline-result {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        flex-shrink: 0;
        padding-bottom: 1.4rem;
    }

    .result-dot {
        width: 52px;
        height: 52px;
        border-radius: 12px;
        border: 1px solid color-mix(in srgb, var(--color-theme-1) 40%, transparent);
        background: color-mix(in srgb, var(--color-theme-1) 12%, transparent);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .result-dot::after {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--color-theme-1);
        box-shadow: 0 0 12px var(--color-theme-1);
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.6; transform: scale(0.85); }
    }

    .pipeline-result span {
        font-size: 0.72rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        opacity: 0.5;
        white-space: nowrap;
    }

    /* STEPS */
    .steps {
        display: flex;
        flex-direction: column;
        gap: 3.5rem;
    }

    .step {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .step-title {
        font-size: clamp(1rem, 1.4vw, 1.2rem);
        font-weight: 400;
        border: 1px solid rgba(244, 241, 237, 0.2);
        border-radius: 6px;
        padding: 0.75rem 1.5rem;
        margin: 0;
        align-self: center;
        width: min(50%, 480px);
        text-align: center;
    }

    .step-content {
        min-height: 180px;
        border: 1px solid rgba(244, 241, 237, 0.07);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.02);
    }

    @media (max-width: 820px) {
        .hero {
            grid-template-columns: 1fr;
            min-height: auto;
        }

        .logo-text { display: none; }

        .step-title { width: min(80%, 480px); }

        .pipeline {
            justify-content: flex-start;
            padding: 1.5rem 0.75rem;
        }

        .track-line { width: 20px; }

        .connector-arrow { width: 14px; height: 14px; }
    }
</style>
