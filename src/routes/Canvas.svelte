<div id="container">
    <div class="shape" id="A"></div>
    <div class="shape" id="B"></div>
    <div class="shape" id="C"></div>
    <div class="shape" id="D"></div>
</div>


<style>

    .shape {
        position: absolute;
    }

    #container {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: -10;
        overflow: hidden;
    }

    #A {
        top: 52vh;
        left: 18vw;
        width: 220px;
        height: 60vh;
        border-radius: 50%;
        rotate: 45deg;
        background: var(--color-theme-1);
        filter: blur(100px);
        animation: Garen-E 35s linear infinite;
    }

    #B {
        top: 24vh;
        left: 75vw;
        width: 200px;
        height: 20vh;
        border-radius: 50%;
        rotate: -45deg;
        background: var(--color-theme-2);
        filter: blur(88px);
        animation: Garen-E 15s linear infinite;
        transform-origin: 0 50%;
    }

    #C {
        top: 10px;
        left: 10px;
        width: 200px;
        height: 100px;
        border-radius: 50%;
        background: var(--color-theme-3);
        filter: blur(70px);
        opacity: .5;
    }

    #D {
        top: 90vh;
        left: 82vw;
        width: 200px;
        height: 20vh;
        rotate: -45deg;
        background: var(--color-theme-4);
        filter: blur(100px);
        animation: Garen-E 15s 10s linear infinite;
        transform-origin: 0 50%;
    }

    @keyframes Garen-E {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>