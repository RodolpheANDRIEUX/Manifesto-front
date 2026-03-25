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
    import { fly, slide } from 'svelte/transition';
    import {quadInOut} from "svelte/easing";
    import {onMount} from 'svelte';

    const bars = ['/M1.png', '/M23.png', '/M23.png'];
    const LOGO_ANIMATION_DELAY_MS = 2000;
    const BAR_STAGGER_DELAY_MS = 200;

    let showM  = false;
    let showText = false;

    onMount(() => {
        showM = true;
        setTimeout(() => showText = true, LOGO_ANIMATION_DELAY_MS);
    });
</script>


<h1>Manifesto</h1>

<div class="container">
    {#if showM}
        <div class="M" >
            {#each bars as bar, i}
                <img class="M-bars" src={bar} alt="M"
                     in:fly|global={{ y: 100, delay: BAR_STAGGER_DELAY_MS * i, duration: 1000, easing: quadInOut }}
                >
            {/each}
        </div>
    {/if}

    {#if showText}
        <p in:slide={{ duration: 1000, easing: quadInOut, axis : 'x'}}>anifesto</p>
    {/if}
</div>

{#if showText}
    <div></div>
{/if}

<style>
    h1 {
        position: absolute;
        opacity: 0;
    }

    .container {
        display: flex;
        height: 80vh;
        margin: 0 auto;
        align-items: center;
    }

    .M-bars {
        height: 28vh;
    }

    .M {
        margin-bottom: 3vh;
    }

    p {
        font-size: 10vw;
        color: var(--color-theme-1);
        margin: 0;
    }

    @media ( max-width : 700px) {
        p {
            display: none;
        }

    }

</style>