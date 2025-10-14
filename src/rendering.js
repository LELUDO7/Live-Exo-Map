function createDots() {
  POINTS_CONFIG.forEach((pt) => {
    const el = document.createElement("div");
    el.className = `dot ${STATUS_CLASS.offline}`;
    el.style.top = pt.top + "%";
    el.style.left = pt.left + "%";
    el.dataset.id = pt.id;
    el.dataset.name = pt.name;
    el.title = `Point ${pt.id}`;
    board.appendChild(el);
    dotsById.set(pt.id, el);

    const menu = document.createElement("div");
    menu.className = "dot-menu";

    menu.innerHTML = `
     <div class="dot-menu-header">
      <h1>${pt.name}</h1>
      <div class="status-box ${STATUS_CLASS.offline}"></div>
     </div>
     `;

    el.appendChild(menu);

    board.appendChild(el);
    dotsById.set(pt.id, el);
  });

  POINTS_CONFIG_R.forEach((pt) => {
    const el = document.createElement("div");
    el.className = `dot_r ${STATUS_CLASS.notpresent}`;
    el.style.top = pt.top + "%";
    el.style.left = pt.left + "%";
    el.dataset.id = pt.id;
    el.dataset.name = pt.name;
    el.title = `Point ${pt.id}`;
    board.appendChild(el);
    dotsById.set(pt.id, el);
  });
}

function createDotsR() {}
