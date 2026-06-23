/* ================================================================
   MENGO CONSULTING — JS ENGINE
   Modules : nav · parallax · reveal · fan · sceau · counter · form
   ================================================================ */
'use strict';

/* ── 1. SCROLL PROGRESS ──────────────────────────────────────── */
const progressEl = document.querySelector('.scroll-progress');
function updateProgress() {
  if (!progressEl) return;
  const ratio = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  progressEl.style.transform = `scaleX(${Math.min(ratio, 1)})`;
}

/* ── 2. NAV BEHAVIOUR ────────────────────────────────────────── */
const nav = document.querySelector('.nav');
function updateNav() {
  if (!nav) return;
  const solid = nav.classList.contains('nav--solid'); // inner pages always solid
  if (solid) return;
  nav.classList.toggle('scrolled', window.scrollY > 50);

  // Text colour in logo follows scroll state
  const logoName = nav.querySelector('.nav__logo-name');
  const logoSub  = nav.querySelector('.nav__logo-sub');
  const links    = nav.querySelectorAll('.nav__link');
  const isLight  = window.scrollY > 50;
  if (logoName) logoName.style.color = isLight ? 'var(--bleu-royal)' : '';
  if (logoSub)  logoSub.style.color  = isLight ? 'var(--texte-sec)'  : '';
  links.forEach(l => l.style.color = isLight ? '' : 'rgba(255,255,255,0.75)');
}

/* Highlight active nav link by current page */
function markActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(l => {
    const href = l.getAttribute('href') || '';
    l.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}

/* ── 3. MOBILE NAV ───────────────────────────────────────────── */
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const menu   = document.querySelector('.nav__mobile');
  const close  = document.querySelector('.nav__mobile-close');
  if (!toggle || !menu) return;

  const openMenu = () => {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    menu.classList.remove('open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);
  menu.querySelectorAll('.nav__mobile-link, .btn').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

/* ── 4. SCROLL REVEAL (IntersectionObserver) ─────────────────── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
}

/* ── 5. SCEAU SVG DRAW ───────────────────────────────────────── */
function initSceaux() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('drawn');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.sceau-anim').forEach(el => obs.observe(el));
}

/* ── 6. BOOK CAROUSEL (Hero) ─────────────────────────────────── */
function initBookCarousel() {
  const carousel = document.querySelector('.book-carousel');
  if (!carousel) return;

  const SLIDES = [
    {
      ref: 'CMC · 01', tag: 'Droit Foncier',
      title: 'Titre Foncier',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      items: ['Régularisation foncière', 'Obtention de titre', 'Acquisition sécurisée']
    },
    {
      ref: 'CMC · 02', tag: 'Droit des affaires',
      title: "Création d'Entreprise",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
      items: ['Constitution de sociétés', 'Statuts & formalités', 'Mise en conformité']
    },
    {
      ref: 'CMC · 03', tag: 'Assistance juridique',
      title: 'Contrats & Conseil',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
      items: ['Rédaction de contrats', 'Conseil réglementaire', 'Contentieux civil']
    },
    {
      ref: 'CMC · 04', tag: 'Formalités admin.',
      title: 'État Civil & Séjour',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
      items: ["Actes d'état civil", 'Certificats de nationalité', 'Titres de séjour']
    },
    {
      ref: 'CMC · 05', tag: 'Contentieux',
      title: 'Recouvrement de Créances',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
      items: ['Mise en demeure', 'Procédures de recouvrement', 'Médiation & accord']
    },
    {
      ref: 'CMC · 06', tag: 'Formation professionnelle',
      title: 'Secrétariat Juridique',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055"/></svg>',
      items: ['Actes de procédure civile', 'Rédaction juridique', 'Informatique & droit']
    },
    {
      ref: 'CMC · 07', tag: 'Formation professionnelle',
      title: 'Secrétariat de Direction',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
      items: ['Organisation administrative', 'Gestion du personnel', 'Communication institutionnelle']
    },
    {
      ref: 'CMC · 08', tag: 'Formation professionnelle',
      title: 'Bureautique Professionnelle',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>',
      items: ['Suite Microsoft Office', 'Gestion numérique', 'Informatique appliquée']
    }
  ];

  const FLIP_MS  = 650;
  const AUTO_MS  = 4000;
  let current    = 0;
  let flipping   = false;
  let autoTimer;

  const leaf      = document.getElementById('bookLeaf');
  const leafFront = document.getElementById('bookLeafFront');
  const leafBack  = document.getElementById('bookLeafBack');
  const stage     = document.getElementById('bookStage');
  const dotsWrap  = document.getElementById('bcDots');
  const btnPrev   = document.getElementById('bookPrev');
  const btnNext   = document.getElementById('bookNext');

  if (!leaf || !stage || !dotsWrap) return;

  // Build dot buttons
  SLIDES.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'bc-dot' + (i === 0 ? ' bc-dot--active' : '');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', 'Service ' + (i + 1));
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(btn);
  });

  function renderPage(data, idx) {
    const n     = String(idx + 1).padStart(2, '0');
    const total = String(SLIDES.length).padStart(2, '0');
    return `<div class="book__page-inner">
      <div class="book__page-tag">${data.tag}</div>
      <div class="book__page-icon">${data.icon}</div>
      <h3 class="book__page-title">${data.title}</h3>
      <ul class="book__page-items">
        ${data.items.map(t => `<li class="book__page-item">${t}</li>`).join('')}
      </ul>
      <div class="book__page-footer">
        <span class="book__page-ref">${data.ref}</span>
        <span class="book__page-num">${n} / ${total}</span>
      </div>
    </div>`;
  }

  function renderLeafBack() {
    return Array.from({ length: 10 }, () => '<div class="book__leaf-inner-line"></div>').join('');
  }

  function updateDots(idx) {
    dotsWrap.querySelectorAll('.bc-dot').forEach((d, i) => {
      const active = i === idx;
      d.classList.toggle('bc-dot--active', active);
      d.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function goTo(next) {
    if (flipping || next === current) return;
    flipping = true;
    clearTimeout(autoTimer);

    updateDots(next);

    // Leaf front = current page (it will flip away, revealing stage)
    leafFront.innerHTML = renderPage(SLIDES[current], current);
    leafBack.innerHTML  = renderLeafBack();
    // Stage = next page (revealed once leaf flips away)
    stage.innerHTML     = renderPage(SLIDES[next], next);

    // Trigger flip on next frame so transition fires
    requestAnimationFrame(() => {
      leaf.classList.add('is-flipping');
    });

    setTimeout(() => {
      // Remove flip without animating (instant reset)
      leaf.style.transition = 'none';
      leaf.classList.remove('is-flipping');
      requestAnimationFrame(() => {
        leaf.style.transition = '';
        current = next;
        // Leaf front now mirrors stage (the newly current slide)
        leafFront.innerHTML = renderPage(SLIDES[current], current);
        flipping = false;
        scheduleAuto();
      });
    }, FLIP_MS + 60);
  }

  function scheduleAuto() {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => goTo((current + 1) % SLIDES.length), AUTO_MS);
  }

  // Controls
  if (btnPrev) btnPrev.addEventListener('click', () => goTo((current - 1 + SLIDES.length) % SLIDES.length));
  if (btnNext) btnNext.addEventListener('click', () => goTo((current + 1) % SLIDES.length));

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearTimeout(autoTimer));
  carousel.addEventListener('mouseleave', scheduleAuto);

  // Init: prime both leaf-front and stage with slide 0
  leafFront.innerHTML = renderPage(SLIDES[0], 0);
  leafBack.innerHTML  = renderLeafBack();
  stage.innerHTML     = renderPage(SLIDES[0], 0);

  scheduleAuto();
}

/* ── 7. PARALLAX ─────────────────────────────────────────────── */
function initParallax() {
  const targets = [
    { el: document.querySelector('.hero__orb--1'), speed: -0.18 },
    { el: document.querySelector('.hero__orb--2'), speed: -0.10 },
    { el: document.querySelector('.hero__orb--3'), speed: -0.06 },
    { el: document.querySelector('.hero__sceau-bg'), speed: -0.08 },
  ].filter(t => t.el);

  // Page hero watermark text
  const pageHero = document.querySelector('.page-hero');
  const phBefore = pageHero; // CSS pseudo-element, drive via custom prop

  if (!targets.length && !pageHero) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        targets.forEach(({ el, speed }) => {
          el.style.transform = `translateY(${y * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ── 8. COUNTERS ─────────────────────────────────────────────── */
function animateCounter(el) {
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1600;
  const start    = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4); // ease-out quart
    el.textContent = Math.floor(eased * target) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

/* ── 9. SERVICE CARD SCEAU HOVER ─────────────────────────────── */
function initCardSceaux() {
  document.querySelectorAll('.service-card').forEach(card => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.style.cssText = `
      position:absolute; top:-10px; right:-10px;
      width:72px; height:72px; pointer-events:none; z-index:0;
      opacity:0; transition:opacity .3s ease;
    `;
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx','50'); c.setAttribute('cy','50'); c.setAttribute('r','44');
    c.setAttribute('fill','none'); c.setAttribute('stroke','#3b82f6'); c.setAttribute('stroke-width','1.5');
    const circ = 276.5;
    c.style.cssText = `stroke-dasharray:${circ}; stroke-dashoffset:${circ}; transition:stroke-dashoffset .6s var(--ease-out, ease);`;
    svg.appendChild(c);
    card.appendChild(svg);

    card.addEventListener('mouseenter', () => {
      svg.style.opacity = '1';
      c.style.strokeDashoffset = '0';
    });
    card.addEventListener('mouseleave', () => {
      svg.style.opacity = '0';
      c.style.strokeDashoffset = String(circ);
    });
  });
}

/* ── 10. FORM LOGIC ──────────────────────────────────────────── */
function initForm() {
  const form = document.getElementById('form-contact');
  if (!form) return;

  // Show formation module field when service = formation
  const typeSelect = form.querySelector('[name="service-type"]');
  const formGroup  = form.querySelector('.form-group--formation');
  if (typeSelect && formGroup) {
    typeSelect.addEventListener('change', () => {
      const show = typeSelect.value === 'formation';
      formGroup.style.display = show ? 'block' : 'none';
      const sel = formGroup.querySelector('select');
      if (sel) sel.required = show;
    });
    formGroup.style.display = 'none';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Envoi…'; btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = orig; btn.disabled = false;
      form.reset();
      if (formGroup) formGroup.style.display = 'none';
      showToast('✓ Message reçu. L\'équipe vous contactera sous 24h.');
    }, 1200);
  });
}

function showToast(msg) {
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed; bottom:2rem; right:2rem; z-index:9999;
    background:var(--bleu-royal); color:#fff; border-radius:12px;
    padding:1rem 1.75rem; font-size:.875rem; font-weight:500;
    box-shadow:0 8px 32px rgba(0,51,170,.35); max-width:320px; line-height:1.5;
    opacity:0; transform:translateY(14px);
    transition:all .4s cubic-bezier(.22,1,.36,1);
  `;
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    el.style.opacity = '0'; el.style.transform = 'translateY(14px)';
    setTimeout(() => el.remove(), 400);
  }, 4500);
}

/* ── 11. SMOOTH ANCHORS ──────────────────────────────────────── */
function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = (nav ? nav.offsetHeight : 0) + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
}

/* ── THROTTLED SCROLL HANDLER ────────────────────────────────── */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateProgress();
      updateNav();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ── INIT ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateNav();
  updateProgress();
  markActiveLink();
  initMobileNav();
  initReveal();
  initSceaux();
  initBookCarousel();
  initParallax();
  initCounters();
  initCardSceaux();
  initForm();
  initAnchors();
});
