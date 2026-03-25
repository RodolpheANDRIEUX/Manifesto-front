<script>
    import { fly } from 'svelte/transition';
    import { quadOut } from "svelte/easing";
    import { projects } from '$lib/data/projects.js';

    const CARD_STAGGER_DELAY_MS = 100;
    const CARD_ANIMATION_OFFSET_MS = 300;
</script>

<section>
    {#each projects as project, i}
        <a href={project.url} class="card" in:fly|global={{
            delay: CARD_STAGGER_DELAY_MS * i + CARD_ANIMATION_OFFSET_MS,
            duration: 300,
            easing: quadOut,
            y: 50,
            }}>
            <img src={project.img} alt={project.name} />
            <p>{project.name}</p>
        </a>
    {/each}
</section>

<style>
    section {
        columns: 310px;
        gap: 10px;
        max-width: 72rem;
        width: 100%;
        margin: 2rem auto;
        box-sizing: border-box;
        padding: 0 1rem;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .card {
        background-color: #ffffff00;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 10px;
        box-shadow: 0 2px 4px #00000030;
        transition: .3s;
        display: flex;
        flex-direction: column;
        break-inside: avoid; /* just like me atm */
        -webkit-column-break-inside: avoid;
        overflow: hidden;
        margin-bottom: 10px;
    }

    .card p {
        margin: 0;
        padding: 10px;
        font-weight: 700;
    }

    .card:hover {
        background-color: #ffffff10;
        transform: translate(0, -4px);
    }

    .card:active {
        transform: translate(0, 0);
    }
</style>