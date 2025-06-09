fetch("projects.json")
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("projects");
    const firstSixReversed = projects.reverse().slice(0, 6);
    container.innerHTML = firstSixReversed.map(p => `
      <li class="card" data-aos="fade-up">
      <a href="project.html?id=${p.id}" class="card__link">
        <img src="${p.thumb}" alt="${p.title}">
        <h4 class="card__title">${p.title}</h4>
        <div class="card__synopsis">${p.description}</div>
        <div class="card__tags">
        ${p.badges.map(b => `<div class="card__tag">${b}</div>`).join('')}
        </div>
      </a>
      </li>
    `).join('');
  });