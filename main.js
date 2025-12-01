const THEME_KEY = 'preferred-theme';

const getStoredTheme = () => localStorage.getItem(THEME_KEY);
const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.setAttribute('aria-pressed', theme === 'dark');
    toggle.querySelector('.theme-label').textContent = theme === 'dark' ? 'Mode clair' : 'Mode sombre';
  }
}

function initThemeToggle() {
  const saved = getStoredTheme();
  const defaultTheme = saved || getSystemTheme();
  applyTheme(defaultTheme);

  const toggle = document.querySelector('.theme-toggle');
  toggle?.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

function closeMenu(nav, burger) {
  nav.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}

function initNavigation() {
  const nav = document.querySelector('.main-nav');
  const burger = document.querySelector('.burger');
  const links = document.querySelectorAll('[data-scroll-to]');

  burger?.addEventListener('click', () => {
    const isExpanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!isExpanded));
    nav?.classList.toggle('open');
  });

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href')?.replace('#', '');
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (nav && burger && burger.offsetParent !== null) {
        closeMenu(nav, burger);
      }
    });
  });
}

function initProjectToggles() {
  const buttons = document.querySelectorAll('.read-more');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const description = targetId ? document.getElementById(targetId) : null;
      const card = btn.closest('.project-card');
      if (!description || !card) return;

      const expanded = card.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', String(expanded));
      btn.textContent = expanded ? 'Réduire' : 'En savoir plus';
    });
  });
}

function initScrollAnimations() {
  const animated = document.querySelectorAll('[data-animate]');
  if (!('IntersectionObserver' in window)) {
    animated.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animated.forEach((el) => observer.observe(el));
}

function initContactForm() {
  const form = document.querySelector('.contact-form');
  const feedback = document.querySelector('.form-feedback');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (feedback) {
      feedback.textContent = 'Merci ! Ce formulaire est une simulation : aucun message réel n\'a été envoyé.';
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initProjectToggles();
  initScrollAnimations();
  initContactForm();
});
