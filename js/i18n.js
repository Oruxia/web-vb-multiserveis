/* js/i18n.js — Lógica de internacionalización ES / VA */

/* Resuelve una clave con notación de punto en un objeto anidado */
function resolve(obj, path) {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

function applyLang(lang) {
  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  /* Actualizar atributo lang del HTML (SEO + accesibilidad) */
  document.documentElement.lang = lang === 'va' ? 'ca' : 'es';

  /* Aplicar traducciones de texto simple */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = resolve(dict, el.dataset.i18n);
    if (val !== undefined) el.textContent = val;
  });

  /* Aplicar traducciones con innerHTML (textos con <br>) */
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = resolve(dict, el.dataset.i18nHtml);
    if (val !== undefined) el.innerHTML = val;
  });

  /* Actualizar estado visual del selector */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('lang-active', btn.dataset.lang === lang);
  });

  /* Reiniciar typewriter si existe en esta página */
  if (typeof window.restartTypewriter === 'function') {
    window.restartTypewriter(dict.tw.words);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'es';
  applyLang(lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.lang;
      localStorage.setItem('lang', selected);
      applyLang(selected);
    });
  });
});
