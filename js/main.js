/* ============================================================
   VB MULTISERVEIS — main.js
   1. Navbar: sombra + menú móvil
   2. Hero: efecto zoom sutil al cargar
   3. Animaciones de scroll (IntersectionObserver)
   4. Portfolio: filtro por categoría
   5. Lightbox: abrir / cerrar / prev / next
   6. Formulario: validación simple + mensaje de éxito
   7. Nav activo según página actual
   8. Jump nav: sección activa (servicios.html)
   ============================================================ */

/* ── 1. NAVBAR ─────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Cerrar menú al hacer click en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── 2. NAVBAR: sólido en páginas interiores (sin hero) ──────── */
if (!document.querySelector('.hero')) {
  // Página interior: navbar siempre compacto y blanco
  navbar.classList.add('nav-solid');
} else {
  // Home page: navbar transparente, se activa .scrolled al bajar
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── 3. HERO: zoom sutil tras cargar ───────────────────────── */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('load', () => {
    heroBg.classList.add('loaded');
  });
}

/* ── 3. ANIMACIONES DE SCROLL ──────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .fade-in').forEach(el => {
  revealObserver.observe(el);
});

/* ── 4. PORTFOLIO: filtro por categoría ────────────────────── */
const tabBtns = document.querySelectorAll('.tab-btn');
const pItems  = document.querySelectorAll('.p-item');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    pItems.forEach(item => {
      const cat = item.dataset.category;
      if (tab === 'all' || cat === tab) {
        item.classList.remove('hidden');
        requestAnimationFrame(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        });
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(.96)';
        setTimeout(() => item.classList.add('hidden'), 300);
      }
    });
  });
});

pItems.forEach(item => {
  item.style.transition = 'opacity .3s ease, transform .3s ease';
  item.style.opacity = '1';
  item.style.transform = 'scale(1)';
});

/* ── 5. LIGHTBOX ───────────────────────────────────────────── */
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbClose  = document.getElementById('lbClose');
const lbPrev   = document.getElementById('lbPrev');
const lbNext   = document.getElementById('lbNext');

let currentIndex = 0;
let visibleItems = [];

function getVisibleItems() {
  return [...pItems].filter(item => !item.classList.contains('hidden'));
}

function openLightbox(index) {
  visibleItems = getVisibleItems();
  currentIndex = index;
  const img = visibleItems[currentIndex].querySelector('img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showPrev() {
  visibleItems = getVisibleItems();
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  const img = visibleItems[currentIndex].querySelector('img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
}

function showNext() {
  visibleItems = getVisibleItems();
  currentIndex = (currentIndex + 1) % visibleItems.length;
  const img = visibleItems[currentIndex].querySelector('img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
}

pItems.forEach(item => {
  item.addEventListener('click', () => {
    visibleItems = getVisibleItems();
    const visibleIdx = visibleItems.indexOf(item);
    openLightbox(visibleIdx !== -1 ? visibleIdx : 0);
  });
});

if (lightbox && lbClose) {
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-img-wrap')) {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   showPrev();
  if (e.key === 'ArrowRight')  showNext();
});

/* ── 6. FORMULARIO ─────────────────────────────────────────── */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre   = form.querySelector('#nombre').value.trim();
    const telefono = form.querySelector('#telefono').value.trim();

    if (!nombre || !telefono) {
      if (!nombre)   form.querySelector('#nombre').style.borderColor   = '#e55';
      if (!telefono) form.querySelector('#telefono').style.borderColor = '#e55';
      return;
    }

    formSuccess.classList.add('show');

    setTimeout(() => {
      formSuccess.classList.remove('show');
      form.reset();
    }, 5000);
  });

  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
    });
  });
}

/* ── 7. NAV ACTIVO según página ────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.querySelectorAll('a:not(.btn-nav)').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('nav-active');
  }
});

/* ── 8. TYPEWRITER — hero index ─────────────────────────────── */
const twEl = document.getElementById('tw-word');
if (twEl) {
  let twWords   = ['Construcción', 'Reformas', 'Jardinería', 'Limpieza', 'Mantenimiento'];
  const SPEED_T = 95;   // ms por carácter al escribir
  const SPEED_D = 48;   // ms por carácter al borrar
  const PAUSE_F = 2200; // pausa tras palabra completa
  const PAUSE_N = 380;  // pausa antes de la siguiente

  let wi = 0, ci = 0, deleting = false, twTimeout = null;

  function tick() {
    const word = twWords[wi];
    if (!deleting) {
      twEl.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; twTimeout = setTimeout(tick, PAUSE_F); return; }
      twTimeout = setTimeout(tick, SPEED_T);
    } else {
      twEl.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % twWords.length; twTimeout = setTimeout(tick, PAUSE_N); return; }
      twTimeout = setTimeout(tick, SPEED_D);
    }
  }

  // Arranca tras la animación reveal del h1 (reveal-d1 ≈ 0.9 s de delay)
  twTimeout = setTimeout(tick, 1200);

  /* Expuesto para i18n.js — reinicia el typewriter con nuevas palabras */
  window.restartTypewriter = function(words) {
    if (twTimeout) clearTimeout(twTimeout);
    twWords = words;
    wi = 0; ci = 0; deleting = false;
    twEl.textContent = '';
    twTimeout = setTimeout(tick, 400);
  };
}

/* ── 9. JUMP NAV — sección activa (servicios.html) ─────────── */
const jumpLinks = document.querySelectorAll('.jump-link');
if (jumpLinks.length > 0) {
  const sections = ['construccion', 'jardineria', 'limpieza']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function updateJumpNav() {
    /* Línea de activación: 40% desde arriba del viewport
       → la sección cuyo top acaba de cruzar esa línea es la activa */
    const triggerLine = window.innerHeight * 0.40;
    let activeId = null;

    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= triggerLine) {
        activeId = section.id;
      }
    });

    jumpLinks.forEach(link => {
      link.classList.toggle('jl-active', link.getAttribute('href') === '#' + activeId);
    });
  }

  window.addEventListener('scroll', updateJumpNav, { passive: true });
  updateJumpNav(); /* estado inicial */
}
