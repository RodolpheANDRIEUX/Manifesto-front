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
        gap: 3rem;
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
    }
</style>
