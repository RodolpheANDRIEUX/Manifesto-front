<script>
    import { onMount } from 'svelte';

    let canvas;

    onMount(() => {
        const ctx = canvas.getContext('2d');

        const COLOR       = '#00ce93';
        const COUNT       = 250;
        const RADIUS      = 1.5;
        const WAVE_SPEED  = 600;   // ms to cross full screen
        const HOVER_R     = 300;   // mouse influence radius (px)
        const DECAY       = 0.996; // opacity multiplier per frame
        const LERP_UP     = 0.14;  // speed when rising toward hover target
        const MAX_DISPLACE = 60;   // max displacement in direction at opacity=1 (px)

        let W, H, particles, maxDist;
        let mouse     = { x: -9999, y: -9999 };
        let prevMouse = { x: -9999, y: -9999 };
        let mouseDir  = { x: 0, y: 0 };   // normalized mouse movement direction
        let lastMoveTs = -9999;

        function init() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
            maxDist = Math.hypot(W, H);
            particles = Array.from({ length: COUNT }, () => {
                const x = Math.random() * W;
                const y = Math.random() * H;
                const d = Math.hypot(x, y);
                return {
                    ox: x, oy: y, // original position (for reset)
                    x, y,         // mutable reference (absorbs direction changes)
                    fx: 0.2  + Math.random() * 0.5,
                    fy: 0.15 + Math.random() * 0.4,
                    px: Math.random() * Math.PI * 2,
                    py: Math.random() * Math.PI * 2,
                    ax: 6 + Math.random() * 12,
                    ay: 6 + Math.random() * 14,
                    o:       0,
                    hit:     false,
                    dir:     { x: d > 0 ? x / d : 1, y: d > 0 ? y / d : 0 }, // wave direction from origin
                    inHover: false,
                };
            });
        }

        init();

        let start = null;
        let raf;

        function animate(ts) {
            if (!start) start = ts;
            const elapsed = ts - start;
            const sec     = elapsed / 1000;

            // Mouse velocity direction (computed once per frame)
            const dmx = mouse.x - prevMouse.x;
            const dmy = mouse.y - prevMouse.y;
            const dm  = Math.hypot(dmx, dmy);
            if (dm > 1) { mouseDir.x = dmx / dm; mouseDir.y = dmy / dm; }
            prevMouse.x = mouse.x;
            prevMouse.y = mouse.y;

            const waveFront = (elapsed / WAVE_SPEED) * maxDist;
            const moving    = ts - lastMoveTs < 80;

            ctx.clearRect(0, 0, W, H);

            for (const p of particles) {
                // Wave: one-time boost
                if (!p.hit && Math.hypot(p.x, p.y) <= waveFront) {
                    p.o   = 1;
                    p.hit = true;
                }

                // Hover target (only while mouse moves)
                const floatX = p.ax * Math.sin(sec * p.fx + p.px);
                const floatY = p.ay * Math.sin(sec * p.fy + p.py);
                const cx     = p.x + floatX + p.dir.x * p.o * MAX_DISPLACE;
                const cy     = p.y + floatY + p.dir.y * p.o * MAX_DISPLACE;

                const dist    = Math.hypot(cx - mouse.x, cy - mouse.y);
                const inHover = dist < HOVER_R;
                const hTarget = moving && inHover
                    ? Math.pow(1 - dist / HOVER_R, 2) * 0.75
                    : 0;

                // Direction update on hover entry only — absorb old displacement into p.x/y to avoid jump
                if (inHover && !p.inHover && dm > 1) {
                    p.x += (p.dir.x - mouseDir.x) * p.o * MAX_DISPLACE;
                    p.y += (p.dir.y - mouseDir.y) * p.o * MAX_DISPLACE;
                    p.dir.x = mouseDir.x;
                    p.dir.y = mouseDir.y;
                }
                p.inHover = inHover;

                // Opacity: lerp up toward hover, decay otherwise
                p.o = hTarget > p.o
                    ? p.o + (hTarget - p.o) * LERP_UP
                    : p.o * DECAY;

                if (p.o < 0.01) { p.x = p.ox; p.y = p.oy; p.inHover = false; continue; }

                ctx.beginPath();
                ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2);
                ctx.fillStyle   = COLOR;
                ctx.globalAlpha = p.o;
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            raf = requestAnimationFrame(animate);
        }

        raf = requestAnimationFrame(animate);

        const onResize    = () => init();
        const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; lastMoveTs = performance.now(); };
        const onMouseOut  = ()  => { mouse.x = -9999; mouse.y = -9999; };

        window.addEventListener('resize',    onResize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseout',  onMouseOut);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize',    onResize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseout',  onMouseOut);
        };
    });
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        position: fixed;
        inset: 0;
        z-index: -10;
        pointer-events: none;
    }
</style>
