/* ===========================
   Theme tokens
   =========================== */
:root {
    --bg: #07070d;
    --bg-2: #0d0d18;
    --surface: rgba(255, 255, 255, 0.04);
    --surface-2: rgba(255, 255, 255, 0.06);
    --border: rgba(255, 255, 255, 0.09);
    --border-hover: rgba(139, 92, 246, 0.5);

    --text: #e8e8f0;
    --muted: #9a9ab0;

    --violet: #8b5cf6;
    --indigo: #6366f1;
    --cyan: #22d3ee;
    --pink: #ec4899;

    --grad: linear-gradient(135deg, #8b5cf6 0%, #6366f1 45%, #22d3ee 100%);
    --grad-text: linear-gradient(120deg, #a78bfa 0%, #22d3ee 100%);

    --shadow: 0 24px 60px -20px rgba(99, 102, 241, 0.45);
    --radius: 18px;
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 90px;
}

body {
    font-family: 'Inter', system-ui, sans-serif;
    background-color: var(--bg);
    color: var(--text);
    line-height: 1.7;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, .logo {
    font-family: 'Space Grotesk', sans-serif;
    line-height: 1.15;
    letter-spacing: -0.01em;
}

.container {
    width: 92%;
    max-width: 1180px;
    margin: 0 auto;
}

section {
    padding: 110px 0;
    position: relative;
}

.gradient-text {
    background: var(--grad-text);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* ===========================
   Animated background
   =========================== */
.bg-gradient {
    position: fixed;
    inset: 0;
    z-index: -2;
    overflow: hidden;
    background: radial-gradient(circle at 20% 10%, #120c26 0%, var(--bg) 55%);
}

#bg-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    opacity: 0.75;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.45;
    animation: floatBlob 18s ease-in-out infinite;
}

.blob-1 { width: 480px; height: 480px; background: #6d28d9; top: -120px; left: -80px; }
.blob-2 { width: 420px; height: 420px; background: #0e7490; bottom: -120px; right: -60px; animation-delay: -6s; }
.blob-3 { width: 360px; height: 360px; background: #be185d; top: 45%; left: 50%; animation-delay: -11s; opacity: 0.3; }

@keyframes floatBlob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(60px, -40px) scale(1.1); }
    66% { transform: translate(-40px, 50px) scale(0.95); }
}

.grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
}

/* Scroll progress + cursor */
.scroll-progress {
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    width: 0;
    background: var(--grad);
    z-index: 2000;
    transition: width 0.1s linear;
}

.cursor-glow {
    position: fixed;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.14), transparent 65%);
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: -1;
    transition: opacity 0.3s ease;
    opacity: 0;
}

/* ===========================
   Buttons
   =========================== */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 13px 26px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    border: 1px solid transparent;
    transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), background 0.3s var(--ease);
    font-family: inherit;
}

.btn-primary {
    background: var(--grad);
    color: #fff;
    box-shadow: 0 10px 30px -8px rgba(124, 58, 237, 0.6);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px -8px rgba(124, 58, 237, 0.8);
}

.btn-ghost {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
    backdrop-filter: blur(8px);
}

.btn-ghost:hover {
    transform: translateY(-3px);
    border-color: var(--border-hover);
    background: var(--surface-2);
}

.btn-block { width: 100%; justify-content: center; }

/* ===========================
   Section titles
   =========================== */
.section-eyebrow {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--violet);
    margin-bottom: 10px;
}

.section-title {
    text-align: center;
    font-size: clamp(2rem, 4vw, 2.8rem);
    margin-bottom: 60px;
    font-weight: 700;
}

/* ===========================
   Header / nav
   =========================== */
header {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    z-index: 1000;
    transition: all 0.4s var(--ease);
    padding: 8px 0;
}

header.scrolled {
    background: rgba(10, 10, 18, 0.72);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
}

.logo {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text);
}
.logo span { color: var(--violet); }

.nav-links {
    display: flex;
    gap: 8px;
}

.nav-links a {
    color: var(--muted);
    font-weight: 500;
    font-size: 0.95rem;
    padding: 8px 16px;
    border-radius: 50px;
    transition: all 0.3s var(--ease);
    position: relative;
}

.nav-links a:hover { color: var(--text); }

.nav-links a.active {
    color: #fff;
    background: var(--surface-2);
}

.nav-right { display: flex; align-items: center; gap: 18px; }
.nav-resume { padding: 9px 18px; font-size: 0.88rem; }

.hamburger { display: none; cursor: pointer; z-index: 1100; }
.hamburger span {
    display: block;
    width: 26px; height: 2.5px;
    background: var(--text);
    margin: 6px 0;
    border-radius: 3px;
    transition: all 0.3s var(--ease);
}

/* ===========================
   Hero
   =========================== */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 120px;
    padding-bottom: 60px;
}

.hero-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 50px;
    align-items: center;
}

.hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 7px 16px;
    border-radius: 50px;
    font-size: 0.85rem;
    color: var(--muted);
    margin-bottom: 24px;
}

.status-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
    70% { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
    100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
}

.hero-content h1 {
    font-size: clamp(2.6rem, 6vw, 4.2rem);
    font-weight: 700;
    margin-bottom: 16px;
}

.hero-role {
    font-size: clamp(1.3rem, 3vw, 1.9rem);
    font-weight: 500;
    color: var(--muted);
    margin-bottom: 26px;
    min-height: 1.5em;
}
.typed-text { color: var(--cyan); font-weight: 600; }
.cursor-blink { color: var(--violet); animation: blink 1s step-end infinite; font-weight: 300; }
@keyframes blink { 50% { opacity: 0; } }

.hero-desc {
    font-size: 1.08rem;
    color: var(--muted);
    max-width: 580px;
    margin-bottom: 34px;
}
.hero-desc strong { color: var(--text); font-weight: 600; }

.cta-buttons { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 34px; }

.hero-socials { display: flex; gap: 16px; }
.hero-socials a {
    width: 46px; height: 46px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--muted);
    font-size: 1.15rem;
    transition: all 0.3s var(--ease);
}
.hero-socials a:hover {
    color: #fff;
    transform: translateY(-4px);
    border-color: var(--border-hover);
    background: var(--surface-2);
}

/* Hero visual */
.hero-visual { display: flex; justify-content: center; }
.avatar-ring {
    position: relative;
    width: 340px;
    height: 340px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: conic-gradient(from 0deg, var(--violet), var(--cyan), var(--pink), var(--violet));
    animation: spin 12s linear infinite;
    padding: 5px;
}
@keyframes spin { to { transform: rotate(360deg); } }

.avatar-wrap {
    width: 100%; height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: var(--bg-2);
    animation: spin 12s linear infinite reverse;
}
.avatar-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
}

.float-chip {
    position: absolute;
    background: rgba(13, 13, 24, 0.85);
    backdrop-filter: blur(8px);
    border: 1px solid var(--border);
    padding: 8px 14px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 7px;
    animation: floatChip 4s ease-in-out infinite;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.float-chip i { color: var(--cyan); }
.chip-1 { top: 6%; left: -28px; }
.chip-2 { top: 30%; right: -42px; animation-delay: -1s; }
.chip-3 { bottom: 18%; left: -42px; animation-delay: -2s; }
.chip-4 { bottom: 0; right: -10px; animation-delay: -3s; }

@keyframes floatChip {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
}

.scroll-down {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--muted);
    font-size: 1.2rem;
    animation: bounce 2s infinite;
}
@keyframes bounce {
    0%, 100% { transform: translate(-50%, 0); }
    50% { transform: translate(-50%, 10px); }
}

/* ===========================
   Stats
   =========================== */
.stats-section { padding: 40px 0; }
.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 22px;
}
.stat-card {
    text-align: center;
    padding: 30px 18px;
    border-radius: var(--radius);
    background: var(--surface);
    border: 1px solid var(--border);
    transition: all 0.3s var(--ease);
}
.stat-card:hover { transform: translateY(-6px); border-color: var(--border-hover); }
.stat-card h3 {
    font-size: 2.6rem;
    background: var(--grad-text);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
.stat-card p { color: var(--muted); font-size: 0.92rem; margin-top: 4px; }

/* ===========================
   About
   =========================== */
.about-content {
    max-width: 860px;
    margin: 0 auto;
    text-align: center;
}
.about-content .about-info-grid { text-align: left; }
.about-img-frame {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
}
.about-img-frame::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(124,58,237,0.25));
}
.about-img-frame img { width: 100%; display: block; }

.about-text h3 { font-size: 1.6rem; margin-bottom: 18px; }
.about-text p { color: var(--muted); margin-bottom: 18px; }

.about-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 28px 0;
}
.info-item {
    display: flex;
    align-items: center;
    gap: 13px;
}
.info-item i {
    color: var(--violet);
    font-size: 1.1rem;
    width: 38px; height: 38px;
    display: grid; place-items: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    flex-shrink: 0;
}
.info-item span { display: block; font-size: 0.78rem; color: var(--muted); }
.info-item strong { font-size: 0.92rem; }

/* ===========================
   Skills
   =========================== */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
    gap: 24px;
}
.skill-card {
    padding: 30px;
    border-radius: var(--radius);
    background: var(--surface);
    border: 1px solid var(--border);
    transition: all 0.4s var(--ease);
    position: relative;
    overflow: hidden;
}
.skill-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 3px;
    background: var(--grad);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s var(--ease);
}
.skill-card:hover { transform: translateY(-8px); border-color: var(--border-hover); background: var(--surface-2); }
.skill-card:hover::before { transform: scaleX(1); }

.skill-icon {
    width: 54px; height: 54px;
    border-radius: 14px;
    display: grid; place-items: center;
    background: var(--grad);
    font-size: 1.4rem;
    color: #fff;
    margin-bottom: 18px;
}
.skill-card h3 { font-size: 1.25rem; margin-bottom: 16px; }

.tags { display: flex; flex-wrap: wrap; gap: 9px; }
.tags span {
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 6px 13px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.25s var(--ease);
}
.tags span:hover { border-color: var(--violet); color: #fff; transform: translateY(-2px); }

/* ===========================
   Experience timeline
   =========================== */
.timeline {
    position: relative;
    max-width: 820px;
    margin: 0 auto;
    padding-left: 36px;
}
.timeline::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: linear-gradient(180deg, var(--violet), var(--cyan), transparent);
}
.timeline-item { position: relative; margin-bottom: 36px; }
.timeline-item:last-child { margin-bottom: 0; }
.timeline-dot {
    position: absolute;
    left: -36px;
    top: 8px;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: var(--violet);
    border: 3px solid var(--bg);
    box-shadow: 0 0 0 4px rgba(139,92,246,0.25);
}
.timeline-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 26px 28px;
    transition: all 0.3s var(--ease);
}
.timeline-card:hover { transform: translateX(6px); border-color: var(--border-hover); }
.timeline-date {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--cyan);
    background: rgba(34, 211, 238, 0.1);
    padding: 4px 12px;
    border-radius: 50px;
    margin-bottom: 12px;
}
.timeline-card h3 { font-size: 1.3rem; margin-bottom: 4px; }
.timeline-card h4 { font-size: 1rem; font-weight: 500; color: var(--violet); margin-bottom: 12px; }
.timeline-card > p { color: var(--muted); margin-bottom: 12px; }
.muted { color: var(--muted); font-weight: 400; }
.timeline-list { padding-left: 4px; }
.timeline-list li {
    color: var(--muted);
    font-size: 0.95rem;
    padding-left: 24px;
    position: relative;
    margin-bottom: 9px;
}
.timeline-list li::before {
    content: '\f058';
    font-family: 'Font Awesome 6 Free';
    font-weight: 900;
    position: absolute;
    left: 0;
    color: var(--violet);
    font-size: 0.85rem;
    top: 3px;
}
.timeline-list strong { color: var(--text); }

/* ===========================
   Projects
   =========================== */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 26px;
}
.project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
    transition: all 0.4s var(--ease);
    position: relative;
    overflow: hidden;
}
.project-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(400px circle at var(--mx, 50%) var(--my, 0%), rgba(139,92,246,0.12), transparent 45%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
}
.project-card:hover { transform: translateY(-8px); border-color: var(--border-hover); box-shadow: var(--shadow); }
.project-card:hover::after { opacity: 1; }

.project-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
}
.project-glyph {
    font-size: 1.8rem;
    background: var(--grad-text);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
.project-badge {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--cyan);
    background: rgba(34,211,238,0.1);
    border: 1px solid rgba(34,211,238,0.2);
    padding: 5px 11px;
    border-radius: 50px;
}
.project-card h3 { font-size: 1.35rem; margin-bottom: 12px; }
.project-card > p { color: var(--muted); font-size: 0.95rem; margin-bottom: 18px; }

.project-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.project-tech span {
    font-size: 0.78rem;
    color: var(--muted);
    background: var(--surface-2);
    border: 1px solid var(--border);
    padding: 4px 10px;
    border-radius: 6px;
}
.project-links { display: flex; gap: 16px; }
.proj-link {
    color: var(--text);
    font-weight: 600;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    transition: color 0.25s ease;
}
.proj-link:hover { color: var(--violet); }

/* ===========================
   Achievements
   =========================== */
.achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 22px;
}
.achievement-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
    transition: all 0.3s var(--ease);
}
.achievement-card:hover { transform: translateY(-6px); border-color: var(--border-hover); }
.achievement-card i {
    font-size: 1.6rem;
    color: var(--violet);
    margin-bottom: 14px;
    display: block;
}
.achievement-card p { color: var(--muted); font-size: 0.96rem; }
.achievement-card strong { color: var(--text); }

/* ===========================
   Education
   =========================== */
.education-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
}
.edu-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 30px;
    text-align: center;
    transition: all 0.3s var(--ease);
}
.edu-card:hover { transform: translateY(-6px); border-color: var(--border-hover); }
.edu-card > i {
    font-size: 2rem;
    background: var(--grad);
    width: 60px; height: 60px;
    border-radius: 16px;
    display: grid; place-items: center;
    color: #fff;
    margin: 0 auto 18px;
}
.edu-year {
    font-size: 0.8rem;
    color: var(--cyan);
    font-weight: 600;
}
.edu-card h3 { font-size: 1.15rem; margin: 8px 0; }
.edu-card p { color: var(--muted); font-size: 0.92rem; margin-bottom: 12px; }
.edu-score {
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text);
    background: var(--surface-2);
    border: 1px solid var(--border);
    padding: 5px 14px;
    border-radius: 50px;
}

/* ===========================
   Contact
   =========================== */
.contact-content {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 48px;
}
.contact-info h3 { font-size: 1.6rem; margin-bottom: 14px; }
.contact-info > p { color: var(--muted); margin-bottom: 30px; }
.contact-item {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
}
.contact-item i {
    font-size: 1.1rem;
    color: var(--violet);
    width: 48px; height: 48px;
    display: grid; place-items: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    flex-shrink: 0;
}
.contact-item span { display: block; font-size: 0.78rem; color: var(--muted); }
.contact-item a, .contact-item div p { color: var(--text); font-weight: 500; transition: color 0.25s; }
.contact-item a:hover { color: var(--violet); }

.social-links { display: flex; gap: 14px; margin-top: 28px; }
.social-links a {
    width: 46px; height: 46px;
    display: grid; place-items: center;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--muted);
    font-size: 1.1rem;
    transition: all 0.3s var(--ease);
}
.social-links a:hover { color: #fff; transform: translateY(-4px); border-color: var(--border-hover); }

.contact-form {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 34px;
}
.form-group { position: relative; margin-bottom: 26px; }
.form-group input,
.form-group textarea {
    width: 100%;
    padding: 16px 16px 8px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--bg-2);
    color: var(--text);
    font-size: 0.95rem;
    font-family: inherit;
    resize: vertical;
    transition: border-color 0.3s ease;
}
.form-group label {
    position: absolute;
    left: 16px;
    top: 15px;
    color: var(--muted);
    font-size: 0.95rem;
    pointer-events: none;
    transition: all 0.2s var(--ease);
}
.form-group input:focus,
.form-group textarea:focus { outline: none; border-color: var(--violet); }
.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label,
.form-group textarea:focus + label,
.form-group textarea:not(:placeholder-shown) + label {
    top: 6px;
    font-size: 0.7rem;
    color: var(--violet);
}
.form-status { margin-top: 14px; font-size: 0.9rem; text-align: center; color: var(--cyan); min-height: 1.2em; }

/* ===========================
   Footer
   =========================== */
footer {
    border-top: 1px solid var(--border);
    padding: 34px 0;
    background: var(--bg-2);
}
.footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    flex-wrap: wrap;
}
.footer-inner p { color: var(--muted); font-size: 0.9rem; }

/* Back to top */
.back-to-top {
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 48px; height: 48px;
    border-radius: 50%;
    background: var(--grad);
    color: #fff;
    display: grid; place-items: center;
    font-size: 1rem;
    box-shadow: 0 10px 30px -6px rgba(124,58,237,0.6);
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.4s var(--ease);
    z-index: 900;
}
.back-to-top.show { opacity: 1; visibility: visible; transform: translateY(0); }
.back-to-top:hover { transform: translateY(-4px); }

/* ===========================
   Reveal animations
   =========================== */
/* Hidden initial state only applies when JS is active (progressive enhancement) */
.js .reveal {
    opacity: 1; /* TEMP-PREVIEW */
    transform: translateY(28px);
    transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
    will-change: opacity, transform;
}
.js .reveal.visible { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
    .js .reveal { opacity: 1; transform: none; transition: none; }
    .blob, .avatar-ring, .avatar-wrap, .float-chip, .scroll-down, .status-dot { animation: none; }
}

/* ===========================
   Responsive
   =========================== */
@media (max-width: 992px) {
    .hero-grid { grid-template-columns: 1fr; text-align: center; }
    .hero-content { order: 2; }
    .hero-visual { order: 1; }
    .hero-tag, .cta-buttons, .hero-socials { justify-content: center; }
    .hero-desc { margin-left: auto; margin-right: auto; }
    .about-content { grid-template-columns: 1fr; gap: 36px; }
    .about-img-frame { max-width: 360px; margin: 0 auto; }
    .contact-content { grid-template-columns: 1fr; gap: 36px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
    section { padding: 80px 0; }
    .nav-resume { display: none; }
    .hamburger { display: block; }
    .nav-links {
        position: fixed;
        inset: 0 0 0 30%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        background: rgba(10, 10, 18, 0.96);
        backdrop-filter: blur(18px);
        transform: translateX(100%);
        transition: transform 0.4s var(--ease);
        border-left: 1px solid var(--border);
    }
    .nav-links.active { transform: translateX(0); }
    .nav-links a { font-size: 1.1rem; }
    .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(6px, 6px); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(6px, -6px); }
    .avatar-ring { width: 260px; height: 260px; }
    .float-chip { font-size: 0.75rem; padding: 6px 11px; }
}

@media (max-width: 480px) {
    .stats-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
    .stat-card h3 { font-size: 2rem; }
    .cta-buttons { flex-direction: column; }
    .cta-buttons .btn { width: 100%; justify-content: center; }
    .footer-inner { flex-direction: column; text-align: center; }
    .skill-card, .project-card, .contact-form { padding: 22px; }
}
