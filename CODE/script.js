
    /* ── Theme toggle ── */
    function toggleTheme() {
      const html   = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      document.getElementById('knob').textContent = isDark ? '🌙' : '☀️';
      document.getElementById('tlbl').textContent = isDark ? 'DARK' : 'LIGHT';
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    }

    /* Restore saved theme on load */
    (function () {
      const saved = localStorage.getItem('theme');
      if (!saved) return;
      document.documentElement.setAttribute('data-theme', saved);
      document.getElementById('knob').textContent = saved === 'dark' ? '☀️' : '🌙';
      document.getElementById('tlbl').textContent = saved === 'dark' ? 'LIGHT' : 'DARK';
    })();


    /* ── Custom cursor ── */
    const cur  = document.getElementById('cur');
    const ring = document.getElementById('curRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top  = my + 'px';
    });

    (function animateRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button, .titem').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width   = '54px';
        ring.style.height  = '54px';
        ring.style.opacity = '0.85';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width   = '34px';
        ring.style.height  = '34px';
        ring.style.opacity = '0.5';
      });
    });


    /* ── Scroll progress bar ── */
    const sf = document.getElementById('sf');
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      sf.style.height = Math.min(pct, 100) + '%';
    });


    /* ── Active nav link (glide effect) ── */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach(section => {
      new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`nav a[data-section="${entry.target.id}"]`);
            if (active) active.classList.add('active');
          }
        });
      }, { threshold: 0.4 }).observe(section);
    });


    /* ── Scroll reveal ── */
    document.querySelectorAll('.reveal').forEach(el => {
      new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.1 }).observe(el);
    });

    /* Home section visible immediately */
    document.querySelectorAll('#home .reveal').forEach(el => el.classList.add('visible'));
