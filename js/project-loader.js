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

    if (project.thumbnail) {
      document.getElementById("thumbnail").src = project.thumbnail;
      document.getElementById("thumbnail").alt = project.title;
    } else {
      document.getElementById("thumbnail").remove();
    }

    if (project.badges) {
      document.getElementById("badges").innerHTML = project.badges
        .map(b => `<span class="card__tag">${b}</span>`).join(" ");
    }

    if (project.gallery) {
      document.getElementById("gallery").innerHTML = project.gallery
        .map(src => `<img src="${src}" alt="" />`).join("");
    }

    if (project.features) {
      document.getElementById("features").innerHTML = `
        <h2>Features</h2>
        <ul>${project.features.map(f => `<li>${f}</li>`).join("")}</ul>
      `;
    }

    if (project.process) {
      document.getElementById("process").innerHTML = `
        <h2>Proces</h2>
        ${project.process.map(p => `<h3>${p.title}</h3><p>${p.text}</p>`).join("")}
      `;
    }

    const links = [];
    if (project.links.live) links.push(`<li><a href="${project.links.live}" target="_blank"><img src="../img/external-link.png" alt="live"></a></li>`);
    if (project.links.github) links.push(`<li><a href="${project.links.github}" target="_blank"><img src="../img/github.png" alt="github"></a></li>`);
    document.getElementById("links").innerHTML = links.join(" | ");
  })
  .catch(err => {
    document.body.innerHTML = "<p>Project niet gevonden.</p>";
    console.error(err);
  });
