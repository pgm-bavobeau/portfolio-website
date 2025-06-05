fetch("projects.json")
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("project-list");
    container.innerHTML = projects.map(p => `
      <a href="project.html?id=${p.id}" class="card">
        <img src="${p.thumb}" alt="${p.title}" />
        <h2>${p.title}</h2>
        <div class="badges">
          ${p.badges.map(b => `<span class="badge">${b}</span>`).join('')}
        </div>
      </a>
    `).join('');
  });