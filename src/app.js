/*
 * Resume content lives here so future edits stay simple and centralized.
 * Project/social links are intentionally placeholders because no URLs were supplied.
 */
const resumeData = {
  fullName: 'Boddana Pavan Kalyan',
  shortName: 'Pavan Kalyan',
  education: [
    {
      title: 'Bachelor of Technology (B.Tech)',
      school: 'Satya Institute of Technology and Management, Vizianagaram',
      course: 'Computer Science & Engineering (Artificial Intelligence & Data Science)',
      period: '2023–2027',
      score: '63.30%',
    },
    {
      title: 'Intermediate (Class XII)',
      school: 'Vidwan Junior College, Bobbili',
      course: 'Intermediate education',
      period: 'Class XII',
      score: '83%',
    },
    {
      title: 'Secondary School Certificate (SSC / Class X)',
      school: 'Potti Sri Ramulu Municipal High School, Bobbili',
      course: 'Secondary School Certificate',
      period: 'Class X',
      score: '99%',
    },
  ],
  projects: [
    {
      number: '01',
      type: 'Responsive web application',
      title: 'Pizza Booking Application',
      description: 'Developed a responsive pizza ordering application with dynamic order customization. Implemented JavaScript DOM manipulation and setTimeout() for real-time order updates and order status notifications.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      number: '02',
      type: 'Interface design',
      title: 'Music Hub',
      description: 'Built a responsive music website with language-based song browsing. Designed a clean and user-friendly interface for seamless navigation.',
      technologies: ['HTML', 'CSS'],
    },
    {
      number: '03',
      type: 'E-commerce interface',
      title: 'E-Commerce Clone',
      description: 'Developed a responsive Amazon-inspired e-commerce website. Implemented responsive layouts, navigation bar, banners, and product sections.',
      technologies: ['HTML', 'CSS'],
    },
  ],
  skills: [
    { title: 'Programming', items: ['Python', 'JavaScript'] },
    { title: 'Frontend', items: ['HTML5', 'CSS3'] },
    { title: 'AI & Generative AI', items: ['Generative AI', 'Large Language Models (LLMs)', 'Retrieval-Augmented Generation (RAG)', 'LLM API integration', 'API authentication and request/response handling'] },
    { title: 'Tools', items: ['Git', 'GitHub'] },
    { title: 'Soft Skills', items: ['Communication', 'Teamwork'] },
    { title: 'Languages', items: ['English', 'Telugu', 'Hindi'] },
  ],
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function renderEducation() {
  const list = $('#education-list');
  list.innerHTML = resumeData.education.map((item, index) => `
    <article class="education-item" data-reveal data-delay="${index * 100}">
      <span class="education-item__index">0${index + 1}</span>
      <div>
        <h3 class="education-item__title">${item.title}</h3>
        <p class="education-item__school">${item.school}</p>
        <p class="education-item__course">${item.course}</p>
      </div>
      <div class="education-item__meta"><span>${item.period}</span><span class="education-item__score">${item.score}</span></div>
    </article>
  `).join('');
}

function renderProjects() {
  const list = $('#project-list');
  list.innerHTML = resumeData.projects.map((project) => `
    <article class="project-card" data-reveal>
      <div class="project-card__visual" aria-hidden="true"><span class="project-card__number">${project.number}</span><div class="project-card__visual-art"></div></div>
      <div class="project-card__body">
        <span class="project-card__type">${project.type}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-card__tags">${project.technologies.map((technology) => `<span>${technology}</span>`).join('')}</div>
        <div class="project-card__actions">
          <button type="button" class="button button--primary placeholder-link" data-placeholder="${project.title} project">View Project <span aria-hidden="true">↗</span></button>
          <button type="button" class="button button--secondary placeholder-link" data-placeholder="${project.title} source code">Source Code</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderSkills() {
  const list = $('#skills-list');
  list.innerHTML = resumeData.skills.map((group, index) => `
    <article class="skill-group"><div class="skill-group__title"><strong>${group.title}</strong><span>0${index + 1}</span></div><div class="skill-group__items">${group.items.map((item) => `<span>${item}</span>`).join('')}</div></article>
  `).join('');
}

function setupNavigation() {
  const header = $('.site-header');
  const toggle = $('.nav__toggle');
  const menu = $('.nav__menu');
  const links = $$('.nav__link');
  const sections = $$('main section[id]');

  const closeMenu = () => {
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  links.forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    const current = sections.find((section) => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= 150 && bounds.bottom > 150;
    });
    if (current) {
      links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${current.id}`));
    }
  }, { passive: true });
}

function setupReveal() {
  const items = $$('[data-reveal]');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -35px' });
  items.forEach((item) => observer.observe(item));
}

function setupFeedback() {
  const toast = $('#toast');
  let toastTimer;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3600);
  };

  $$('.placeholder-link').forEach((button) => button.addEventListener('click', () => {
    showToast(`${button.dataset.placeholder} is an editable placeholder — add the real URL before publishing.`);
  }));

  $('#contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    $('#form-note').textContent = 'Thanks — this UI is ready, but no message was sent because email delivery is not configured.';
    showToast('Form captured locally. No message was sent.');
  });
}

renderEducation();
renderProjects();
renderSkills();
setupNavigation();
setupReveal();
setupFeedback();
