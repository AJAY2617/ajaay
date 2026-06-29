/* ============================================================
   Ajay A — Portfolio interactions & animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile menu ---------- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ---------- Header scroll, progress bar, back-to-top ---------- */
    const header = document.getElementById('header');
    const progress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    const onScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        header.classList.toggle('scrolled', scrollTop > 60);
        backToTop.classList.toggle('show', scrollTop > 500);
        progress.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Scroll-spy (active nav link) ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(s => spy.observe(s));

    /* ---------- Reveal on scroll (staggered) ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), delay);
                delay += 90;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));

    /* ---------- Animated counters ---------- */
    const counters = document.querySelectorAll('.counter');
    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const decimals = parseInt(el.dataset.decimals || '0', 10);
            const duration = 1600;
            const start = performance.now();

            const tick = (now) => {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
                el.textContent = (target * eased).toFixed(decimals);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = target.toFixed(decimals);
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => countObserver.observe(c));

    /* ---------- Typing effect ---------- */
    const typedText = document.getElementById('typedText');
    if (typedText) {
        const roles = [
            'AWS Cloud Engineer',
            'Full-Stack Developer',
            'AI Application Builder',
            'Python Developer'
        ];
        let roleIndex = 0, charIndex = 0, deleting = false;

        const type = () => {
            const current = roles[roleIndex];
            typedText.textContent = deleting
                ? current.substring(0, charIndex--)
                : current.substring(0, charIndex++);

            let speed = deleting ? 45 : 95;

            if (!deleting && charIndex === current.length + 1) {
                deleting = true;
                speed = 1600; // pause at full word
            } else if (deleting && charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 350;
            }
            setTimeout(type, speed);
        };
        type();
    }

    /* ---------- Project card spotlight (follows cursor) ---------- */
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

    /* ---------- Cursor glow (desktop only) ---------- */
    const cursorGlow = document.getElementById('cursorGlow');
    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
        document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });
    }

    /* ---------- Contact form ---------- */
    // Messages are delivered to the inbox tied to this Web3Forms access key.
    // 1) Go to https://web3forms.com  2) enter aajay7294@gmail.com  3) paste the key below.
    const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE';
    const OWNER_EMAIL = 'aajay7294@gmail.com';

    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Fallback: until the Web3Forms key is set, open the visitor's mail app to OWNER_EMAIL.
            if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'YOUR_ACCESS_KEY_HERE') {
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
                window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
                status.style.color = '';
                status.textContent = 'Opening your email app… thank you for reaching out!';
                return;
            }

            status.style.color = '';
            status.textContent = 'Sending…';

            try {
                const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        access_key: WEB3FORMS_KEY,
                        subject: subject || `New message from ${name}`,
                        from_name: 'Portfolio Contact Form',
                        name, email, message
                    })
                });
                const data = await res.json();
                if (data.success) {
                    status.textContent = 'Thanks! Your message has been sent ✔';
                    form.reset();
                } else {
                    status.style.color = '#ff7e7e';
                    status.textContent = `Couldn't send — please email ${OWNER_EMAIL} directly.`;
                }
            } catch (err) {
                status.style.color = '#ff7e7e';
                status.textContent = `Network error — please email ${OWNER_EMAIL} directly.`;
            }
        });
    }
});
