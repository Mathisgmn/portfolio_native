const THEME_KEY = 'preferred-theme';
const PROJECTS_ENDPOINT = 'data/projects.json';
let projectsData = [];

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

function toggleDescription(button) {
  const targetId = button.dataset.target;
  const description = targetId ? document.getElementById(targetId) : null;
  const card = button.closest('.project-card');
  if (!description || !card) return;

  const expanded = card.classList.toggle('expanded');
  button.setAttribute('aria-expanded', String(expanded));
  button.textContent = expanded ? 'Réduire' : 'En savoir plus';
}

function createProjectCard(project) {
  const article = document.createElement('article');
  article.className = 'project-card card theme-card flex flex-col gap-2';

  const header = document.createElement('div');
  header.className = 'project-header flex items-center justify-between gap-2';

  const info = document.createElement('div');
  const title = document.createElement('p');
  title.className = 'card-title';
  title.textContent = project.title;
  const subtitle = document.createElement('p');
  subtitle.className = 'card-subtitle text-muted';
  subtitle.textContent = project.subtitle;
  info.append(title, subtitle);

  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = project.type;

  header.append(info, tag);

  const thumbnail = document.createElement('div');
  thumbnail.className = 'project-thumb';
  const img = document.createElement('img');
  img.src = project.image;
  img.alt = project.title;
  thumbnail.appendChild(img);

  const excerpt = document.createElement('p');
  excerpt.className = 'project-excerpt text-muted';
  excerpt.textContent = project.excerpt;

  const description = document.createElement('div');
  description.className = 'project-description';
  description.id = `${project.id}-desc`;
  const descriptionText = document.createElement('p');
  descriptionText.textContent = project.description;
  description.appendChild(descriptionText);

  const button = document.createElement('button');
  button.className = 'read-more';
  button.type = 'button';
  button.dataset.target = description.id;
  button.setAttribute('aria-expanded', 'false');
  button.textContent = 'En savoir plus';
  button.addEventListener('click', () => toggleDescription(button));

  article.append(header, thumbnail, excerpt, description, button);
  return article;
}

function renderProjects(list) {
  const container = document.querySelector('.projects-grid');
  const empty = document.querySelector('.projects-empty');
  if (!container || !empty) return;

  container.innerHTML = '';
  if (!list.length) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  list.forEach((project) => {
    const card = createProjectCard(project);
    container.appendChild(card);
  });
}

function updateTypeOptions(types) {
  const select = document.getElementById('project-filter');
  if (!select) return;
  const uniqueTypes = Array.from(new Set(types));
  uniqueTypes.forEach((type) => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    select.appendChild(option);
  });
}

function filterProjects() {
  const searchInput = document.getElementById('project-search');
  const typeSelect = document.getElementById('project-filter');
  const term = searchInput?.value.trim().toLowerCase() || '';
  const selectedType = typeSelect?.value || 'all';

  const filtered = projectsData.filter((project) => {
    const matchesType = selectedType === 'all' || project.type === selectedType;
    const haystack = `${project.title} ${project.excerpt} ${project.description} ${project.type}`.toLowerCase();
    const matchesText = haystack.includes(term);
    return matchesType && matchesText;
  });

  renderProjects(filtered);
}

async function loadProjects() {
  try {
    const response = await fetch(PROJECTS_ENDPOINT);
    if (!response.ok) {
      throw new Error('Impossible de charger les projets');
    }
    const data = await response.json();
    projectsData = Array.isArray(data) ? data : data.projects || [];
    if (!projectsData.length) {
      renderProjects([]);
      return;
    }
    updateTypeOptions(projectsData.map((project) => project.type));
    filterProjects();
  } catch (error) {
    const empty = document.querySelector('.projects-empty');
    if (empty) {
      empty.hidden = false;
      empty.textContent = 'Erreur lors du chargement des projets.';
    }
  }
}

function initProjectsFilters() {
  const searchInput = document.getElementById('project-search');
  const typeSelect = document.getElementById('project-filter');
  searchInput?.addEventListener('input', filterProjects);
  typeSelect?.addEventListener('change', filterProjects);
}

function initProjectsSection() {
  initProjectsFilters();
  loadProjects();
}

function initContactForm() {
  const form = document.querySelector('.contact-form');
  const feedback = document.querySelector('.form-feedback');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (feedback) {
      feedback.textContent = "Merci ! Ce formulaire est une simulation : aucun message réel n'a été envoyé.";
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initProjectsSection();
  initScrollAnimations();
  initContactForm();
});
