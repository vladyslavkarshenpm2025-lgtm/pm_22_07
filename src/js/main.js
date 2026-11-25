document.addEventListener('DOMContentLoaded', () => {
  console.log('Gulp працює!!');

  // ==========================================
  // ЗАВДАННЯ 1: Підстановка повного імені
  // ==========================================
  const USER_FULL_NAME = 'Jhon Abirar';

  function setPersonName(fullName, elementId = 'personName') {
    const targetEl =
      document.getElementById(elementId) || document.querySelector('.main-name');

    if (!targetEl) {
      console.warn(`Елемент #${elementId} або .main-name не знайдено.`);
      return;
    }

    // Використовуємо виключно textContent (без вставки HTML)
    targetEl.textContent = fullName;
  }

  setPersonName(USER_FULL_NAME, 'personName');

// ==========================================
  // ЗАВДАННЯ 2: Стрілки та перемикання контенту
  // ==========================================
  function createArrowIcon() {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '14');
    svg.setAttribute('height', '14');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.5');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');

    const polyline = document.createElementNS(svgNS, 'polyline');
    polyline.setAttribute('points', '6 9 12 15 18 9');
    svg.appendChild(polyline);

    return svg;
  }

  function initCollapsibleBlocks(selector = '.main-content > section, [data-collapsible]') {
    const blocks = document.querySelectorAll(selector);

    blocks.forEach((block) => {
      const heading = block.querySelector('.section-title, h2, h3');
      if (!heading) return;

      const contentElements = Array.from(block.children).filter(
        (child) => child !== heading
      );
      if (contentElements.length === 0) return;

      if (heading.querySelector('.toggle-arrow-btn')) return;

      const arrowBtn = document.createElement('button');
      arrowBtn.type = 'button';
      arrowBtn.className = 'toggle-arrow-btn';
      arrowBtn.setAttribute('aria-label', 'Toggle section content');
      arrowBtn.setAttribute('aria-expanded', 'true');
      arrowBtn.appendChild(createArrowIcon());

      arrowBtn.addEventListener('click', () => {
        const isRotated = arrowBtn.classList.toggle('is-rotated');
        arrowBtn.setAttribute('aria-expanded', String(!isRotated));

        contentElements.forEach((el) => {
          el.classList.toggle('is-collapsed');
        });
      });

      heading.appendChild(arrowBtn);
    });
  }

  initCollapsibleBlocks();

  // ==========================================
  // ЗАВДАННЯ 3: Масив даних та генерація розмітки
  // ==========================================
  const workExperience = [
    {
      role: 'Frontend Developer',
      company: 'Tech Solutions Studio',
      period: '2024 — Present',
      description: 'Building responsive interfaces and working with HTML5, SCSS, and JavaScript.'
    },
    {
      role: 'Junior Web Developer',
      company: 'Digital Agency',
      period: '2022 — 2024',
      description: 'Layout implementation, Gulp build automation, and page performance optimization.'
    },
    {
      role: 'Intern UI Developer',
      company: 'Web Lab',
      period: '2021 — 2022',
      description: 'Maintaining UI components and writing basic DOM interaction scripts.'
    }
  ];

  function renderExperienceList(items, containerSelector = '#experience-list') {
    let container = document.querySelector(containerSelector);

    if (!container) {
      const mainEl = document.querySelector('main.main-content') || document.body;
      const section = document.createElement('section');
      section.className = 'mt-4';
      section.innerHTML = '<h2 class="section-title">ADDITIONAL EXPERIENCE</h2>';

      container = document.createElement('div');
      container.id = containerSelector.replace(/^#/, '');
      section.appendChild(container);
      mainEl.appendChild(section);
    }

    // Обов'язково очищаємо вміст контейнера перед вставкою
    container.innerHTML = '';

    const listEl = document.createElement('ul');
    listEl.className = 'dynamic-list mt-3';

    items.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'dynamic-item';

      const titleEl = document.createElement('div');
      titleEl.className = 'dynamic-item__title';
      titleEl.textContent = `${item.role} — ${item.company}`;

      const metaEl = document.createElement('div');
      metaEl.className = 'dynamic-item__meta';
      metaEl.textContent = item.period;

      const descEl = document.createElement('p');
      descEl.className = 'dynamic-item__desc';
      descEl.textContent = item.description;

      li.append(titleEl, metaEl, descEl);
      listEl.appendChild(li);
    });

    container.appendChild(listEl);
  }

  renderExperienceList(workExperience, '#experience-list');
});