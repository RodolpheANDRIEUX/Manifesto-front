<script>
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
    import Canvas from './Canvas.svelte';
    import './style.css';
    import { onNavigate } from "$app/navigation";

    onNavigate(() => {
        if (!document.startViewTransition) return;

        return new Promise((fulfill) => {
            document.startViewTransition(() => new Promise(fulfill));
        });
    });

</script>


<div class="app">
    <Header />

    <main>
        <Canvas />
        <slot />
    </main>

    <Footer />
</div>


<style>
    .app {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 150vh;
    }

    .app::before {
        content: "";
        position: absolute;
        inset: 0;
        background: url("/noise.svg") 10vh repeat;
        mix-blend-mode: multiply;
        z-index: -1;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
