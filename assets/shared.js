/* ═══════════════════════════════════════════════════════
   socka.sk – shared animations & effects
   ═══════════════════════════════════════════════════════ */

/* ── MINI CONTACT BLOCK injection (subpages only) ── */
(function injectMiniContact() {
  const footer = document.querySelector('footer');
  if (!footer || !document.querySelector('.page-hero')) return;
  if (document.querySelector('.mini-contact')) return;

  const section = document.createElement('section');
  section.className = 'mini-contact';
  section.innerHTML = `
    <div class="container">
      <div class="mc-inner">
        <div class="mc-left">
          <div class="section-tag">Kontakt</div>
          <h2>Napíš mi.<br><span class="grad">Odpoviem do pár hodín.</span></h2>
          <p>Prvá konzultácia je vždy zadarmo. Porozprávame sa o tvojom biznise bez záväzkov.</p>
          <a href="mailto:ahoj@socka.sk" class="btn-primary">Napísať e-mail →</a>
        </div>
        <div class="mc-right">
          <a class="mc-item" href="mailto:ahoj@socka.sk">
            <div class="mc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
            <div><strong>E-mail</strong><span>ahoj@socka.sk</span></div>
          </a>
          <a class="mc-item" href="tel:+421908289774">
            <div class="mc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
            <div><strong>Telefón</strong><span>+421 908 289 774</span></div>
          </a>
          <div class="mc-item">
            <div class="mc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <div><strong>Sídlo</strong><span>Košice, Slovensko</span></div>
          </div>
        </div>
      </div>
    </div>`;
  footer.parentNode.insertBefore(section, footer);
})();

/* ── LANG SWITCHER injection (subpages only) ── */
(function injectLangSwitcher() {
  if (!document.querySelector('.page-hero')) return;
  if (document.querySelector('.lang-switcher')) return;
  const controls = document.querySelector('.nav-controls');
  const themeBtn = document.getElementById('themeBtn');
  if (!controls || !themeBtn) return;

  const saved = localStorage.getItem('socka-lang') || 'sk';
  const switcher = document.createElement('div');
  switcher.className = 'lang-switcher';
  switcher.innerHTML =
    '<button class="lang-btn' + (saved === 'sk' ? ' active' : '') + '" data-lang="sk">SK</button>' +
    '<button class="lang-btn' + (saved === 'en' ? ' active' : '') + '" data-lang="en">EN</button>';

  switcher.addEventListener('click', e => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    const lang = btn.dataset.lang;
    localStorage.setItem('socka-lang', lang);
    switcher.querySelectorAll('.lang-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === lang));
  });

  controls.insertBefore(switcher, themeBtn);
})();

/* ── BEAM injection into page-hero ── */
(function injectBackground() {
  document.querySelectorAll('.page-hero').forEach(hero => {
    if (hero.querySelector('.hero-beam')) return;
    const beam = document.createElement('div');
    beam.className = 'hero-beam';
    beam.setAttribute('aria-hidden', 'true');
    hero.insertBefore(beam, hero.firstChild);
  });
})();

/* ── ANIMATED BLOBS in hero backgrounds ── */
(function injectBlobs() {
  document.querySelectorAll('.hero, .page-hero').forEach(hero => {
    const wrap = document.createElement('div');
    wrap.className = 'hero-blobs';
    wrap.innerHTML =
      '<div class="hero-blob b1"></div>' +
      '<div class="hero-blob b2"></div>' +
      '<div class="hero-blob b3"></div>';
    hero.insertBefore(wrap, hero.firstChild);
  });
})();

/* ── SCROLL FADE-UP with stagger in grids ── */
(function scrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });

  // Stagger cards inside grids
  document.querySelectorAll(
    '.features-grid, .services-grid, .hero-stats, .why-grid, .results-grid, .pricing-preview'
  ).forEach(grid => {
    [...grid.children].forEach((child, i) => {
      if (!child.classList.contains('fade-up')) {
        child.classList.add('fade-up');
        child.style.transitionDelay = (i * 0.07) + 's';
      }
      observer.observe(child);
    });
  });

  // Individual elements
  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => observer.observe(el));

  // Sections headings
  document.querySelectorAll('section h2, section > .container > p, .faq-item, .step, .review-card').forEach(el => {
    if (!el.classList.contains('fade-up')) {
      el.classList.add('fade-up');
      observer.observe(el);
    }
  });
})();

/* ── STATS COUNTER animation ── */
(function statsCounter() {
  function parseNum(text) {
    // matches e.g. "+312%", "4.8x", "90+", "7"
    return text.match(/[\d.]+/)?.[0];
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      observer.unobserve(e.target);
      const el = e.target;
      const original = el.textContent;
      const numStr = parseNum(original);
      if (!numStr) return;
      const target = parseFloat(numStr);
      const isDecimal = numStr.includes('.');
      const prefix = original.slice(0, original.indexOf(numStr[0]));
      const suffix = original.slice(original.indexOf(numStr) + numStr.length);
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = eased * target;
        el.textContent = prefix + (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.hero-stat-num').forEach(el => observer.observe(el));
})();

/* ── MOUSE PARALLAX on hero blobs (subtle) ── */
(function mouseParallax() {
  const hero = document.querySelector('.hero, .page-hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  document.addEventListener('mousemove', e => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      document.querySelectorAll('.hero-blob').forEach((blob, i) => {
        const factor = (i + 1) * 10;
        blob.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`;
      });
      ticking = false;
    });
  });
})();

/* ── CURSOR GLOW (desktop only) ── */
(function cursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  let mx = -200, my = -200;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function loop() {
    glow.style.transform = `translate(${mx}px,${my}px)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* ── MOUSE-TRACKING SPOTLIGHT (hero, desktop only) ── */
(function heroMouseSpotlight() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const glow = document.createElement('div');
  glow.className = 'hero-mouse-glow';
  glow.setAttribute('aria-hidden', 'true');
  hero.appendChild(glow);

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    glow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(16,185,129,0.08), transparent 40%)`;
    glow.style.opacity = '1';
  });
  hero.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
})();

/* ── BUTTON SHIMMER on hover ── */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.classList.add('btn-shimmer');
});

/* ── SCROLL TO TOP ── */
(function scrollToTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top-btn';
  btn.setAttribute('aria-label', 'Späť hore');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
})();

/* ── COOKIE CONSENT ── */
function showCookieBanner(prefBtn) {
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <p>Používame cookies na meranie návštevnosti (Google Analytics). Osobné údaje nezdieľame bez tvojho súhlasu. <a href="/ochrana-osobnych-udajov/">Viac info</a></p>
    <div class="cookie-banner-btns">
      <button class="cookie-accept" id="cookieAccept">Prijať všetky</button>
      <button class="cookie-decline" id="cookieDecline">Len nevyhnutné</button>
    </div>`;
  document.body.appendChild(banner);
  requestAnimationFrame(() => banner.classList.add('visible'));
  if (prefBtn) prefBtn.classList.remove('visible');

  function dismiss(choice) {
    localStorage.setItem('socka-cookie-consent', choice);
    if (choice === 'accepted') enableAnalytics();
    banner.classList.remove('visible');
    setTimeout(() => { banner.remove(); if (prefBtn) prefBtn.classList.add('visible'); }, 400);
  }

  document.getElementById('cookieAccept').addEventListener('click', () => dismiss('accepted'));
  document.getElementById('cookieDecline').addEventListener('click', () => dismiss('declined'));
}

(function cookieConsent() {
  // persistent preferences button
  const prefBtn = document.createElement('button');
  prefBtn.className = 'cookie-pref-btn';
  prefBtn.setAttribute('aria-label', 'Nastavenia cookies');
  prefBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="14" r="1.5" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1" fill="currentColor" stroke="none"/></svg>';
  document.body.appendChild(prefBtn);
  prefBtn.addEventListener('click', () => showCookieBanner(prefBtn));

  if (localStorage.getItem('socka-cookie-consent')) {
    if (localStorage.getItem('socka-cookie-consent') === 'accepted') enableAnalytics();
    prefBtn.classList.add('visible');
    return;
  }

  showCookieBanner(prefBtn);
})();

function enableAnalytics() {
  if (typeof gtag === 'function') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
}
