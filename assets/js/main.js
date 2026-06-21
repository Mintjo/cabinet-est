// ============================================================
// CABINET EST — main.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar mobile overlay ----
  const navToggle = document.getElementById('nav-toggle');
  const navOverlay = document.getElementById('nav-overlay');
  const navClose = document.getElementById('nav-close');

  function openNav() {
    navOverlay.classList.add('open');
    navOverlay.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    navOverlay.classList.remove('open');
    navOverlay.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (navToggle && navOverlay) {
    navToggle.addEventListener('click', openNav);
    navClose.addEventListener('click', closeNav);
    navOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeNav();
    });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Scroll reveal ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.service-card, .why-card, .engagement-item, .faq-item')
    .forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });

});
