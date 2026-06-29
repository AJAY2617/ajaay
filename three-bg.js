/* ============================================================
   Three.js spiral galaxy background (Milky Way style)
   Degrades gracefully: if THREE isn't available (CDN blocked),
   the CSS gradient + blobs remain as the background.
   ============================================================ */
(function () {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 6000);
    camera.position.set(0, 300, 720);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Soft round glowing sprite for each star
    function makeSprite() {
        const c = document.createElement('canvas');
        c.width = c.height = 64;
        const ctx = c.getContext('2d');
        const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.3, 'rgba(255,255,255,0.55)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(c);
    }
    const sprite = makeSprite();

    /* ---------- Spiral galaxy ---------- */
    const P = {
        count: 22000,
        radius: 1300,
        branches: 4,     // number of spiral arms
        turns: 1.05,     // how many times the arms wrap
        randomness: 0.32,
        randomnessPower: 3,
        thickness: 0.18, // vertical spread (flat disk)
        size: 7,
        insideColor: 0xff7eb6,  // warm pink core
        outsideColor: 0x22d3ee  // cyan edges
    };

    const positions = new Float32Array(P.count * 3);
    const colors = new Float32Array(P.count * 3);
    const cInside = new THREE.Color(P.insideColor);
    const cOutside = new THREE.Color(P.outsideColor);

    for (let i = 0; i < P.count; i++) {
        const i3 = i * 3;

        // concentrate stars toward the core for a bright centre
        const r = Math.pow(Math.random(), 1.6) * P.radius;
        const branchAngle = ((i % P.branches) / P.branches) * Math.PI * 2;
        const spinAngle = (r / P.radius) * P.turns * Math.PI * 2;

        const scatter = () =>
            Math.pow(Math.random(), P.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1) * P.randomness * r;

        positions[i3]     = Math.cos(branchAngle + spinAngle) * r + scatter();
        positions[i3 + 1] = scatter() * P.thickness;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + scatter();

        const mixed = cInside.clone().lerp(cOutside, r / P.radius);
        colors[i3]     = mixed.r;
        colors[i3 + 1] = mixed.g;
        colors[i3 + 2] = mixed.b;
    }

    const galaxyGeo = new THREE.BufferGeometry();
    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const galaxyMat = new THREE.PointsMaterial({
        size: P.size,
        map: sprite,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
    galaxy.rotation.x = 0.18; // slight tilt for a 3D disk feel
    scene.add(galaxy);

    /* ---------- Faint distant starfield for depth ---------- */
    const starCount = 700;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        starPos[i] = (Math.random() - 0.5) * 4200;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
        color: 0xaab4ff,
        size: 4,
        map: sprite,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* ---------- Mouse parallax (desktop only) ---------- */
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;
        }, { passive: true });
    }

    function resize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', resize);

    const clock = new THREE.Clock();
    function render() {
        const t = clock.getElapsedTime();
        galaxy.rotation.y = t * 0.06;   // galaxy slowly spins
        stars.rotation.y = t * 0.01;

        // gentle camera parallax toward the cursor
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;
        camera.position.x = targetX * 160;
        camera.position.y = 300 - targetY * 120;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    function loop() {
        render();
        requestAnimationFrame(loop);
    }

    if (reduceMotion) {
        render(); // single static frame, no animation
    } else {
        loop();
    }
})();
