// ============================================================
// CABINET EST — main.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar mobile dropdown ----
  const navToggle = document.getElementById('nav-toggle');
  const navDropdown = document.getElementById('nav-dropdown');

  function openNav() {
    navDropdown.classList.add('open');
    navToggle.classList.add('open');
    navDropdown.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    navDropdown.classList.remove('open');
    navToggle.classList.remove('open');
    navDropdown.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  if (navToggle && navDropdown) {
    navToggle.addEventListener('click', e => {
      e.stopPropagation();
      navDropdown.classList.contains('open') ? closeNav() : openNav();
    });
    navDropdown.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
    document.addEventListener('click', e => {
      if (!navDropdown.contains(e.target) && !navToggle.contains(e.target)) closeNav();
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

  // ---- Accordéon prestations Style 4 ----
  function initAccordion(containerSelector) {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach(container => {
      const btns = container.querySelectorAll('.acc-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.acc-item');
          const body = item.querySelector('.acc-body');
          const isOpen = item.classList.contains('open');
          container.querySelectorAll('.acc-item.open').forEach(i => {
            i.classList.remove('open');
            const b = i.querySelector('.acc-body');
            if (b) b.style.maxHeight = '0';
            const bt = i.querySelector('.acc-btn');
            if (bt) bt.setAttribute('aria-expanded', 'false');
          });
          if (!isOpen) {
            item.classList.add('open');
            body.style.maxHeight = body.scrollHeight + 'px';
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });
    });
  }

  if (document.querySelector('.acc-btn')) {
    initAccordion('.sb-prestations');
    initAccordion('.service-detail-list');
  }

});
