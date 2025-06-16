function getProjectId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || window.location.hash.slice(1);
}

const id = getProjectId();
if (!id) {
  document.body.innerHTML = "<p>Geen project gespecificeerd.</p>";
  throw new Error("Missing project ID");
}

console.log(`Loading project with ID: ${id}`);

fetch(`data/${id}.json`)
  .then(res => {
    if (!res.ok) throw new Error("Not found");
    return res.json();
  })
  .then(project => {
    document.getElementById("page-title").innerText = document.title + " - " + project.title;
    document.getElementById("project-title").innerText = project.title;
    document.getElementById("description").innerText = project.description;

    if (project.badges) {
      document.getElementById("badges").innerHTML = project.badges
        .map(b => `<span class="card__tag">${b}</span>`).join(" ");
    }

    const links = [];
    if (project.links.live) links.push(`<li><a href="${project.links.live}" target="_blank"><img src="../img/external-link.png" alt="live"></a></li>`);
    if (project.links.github) links.push(`<li><a href="${project.links.github}" target="_blank"><img src="../img/github.png" alt="github"></a></li>`);

    // Handle additional links
    if (project.links.other) {
      project.links.other.forEach(link => {
        links.push(`<li><a href="${link.url}" target="_blank"><img src="${link.icon || '../img/external-link.png'}" alt="${link.subtitle || 'link'}">${link.subtitle ? `<span>${link.subtitle}</span>` : ''}</a></li>`);
      });
    }

    document.getElementById("links").innerHTML = links.join(" | ");

    if (project.thumbnail) {
      document.getElementById("thumbnail").src = project.thumbnail;
      document.getElementById("thumbnail").alt = project.title;
    } else {
      document.getElementById("thumbnail-container").remove();
    }

    if (project.process) {
      document.getElementById("process").innerHTML = `
      <div class="layout__container">
        <div class="title__container">
          <h2>${project.process.title}</h2>
          <p>${project.process.text}</p>
        </div>
        <div class="two__items">
          <div class="column__left">
          ${project.process.steps.map(step => `
            <div class="process-step">
            <h3>${step.title}</h3>
            <p>${step.text}</p>
            ${step.image ? `<img src="${step.image}" alt="${step.title}">` : ""}
            </div>
            `).join("")}
            </div>  
          <div class="column__right" data-aos="fade-left">
            <h4>Technologieën</h4>
            <ul>
              ${project.technologies
          .map(t => `<li>${t}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>`;
    }

    if (project.gallery) {
      document.getElementById("gallery").innerHTML = `
      <div class="layout__container">
        <div class="title__container">
          <h2>Galerij</h2>
        </div>
        <div class="gallery__container">
          ${project.gallery
          .map(src => `<img src="${src}" alt="" />`).join("")}
        </div>
      </div>
      `;
    }

  })
  .catch(err => {
    document.body.innerHTML = "<p>Project niet gevonden.</p>";
    console.error(err);
  });
