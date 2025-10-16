function renderMap() {
  POINTS_CONFIG.forEach((pt) => {
    const el = createDots(pt);
    const menu = createMenu(pt, false);

    el.appendChild(menu);

    board.appendChild(el);
    dotsById.set(pt.id, el);
  });

  POINTS_CONFIG_R.forEach((pt) => {
    const el = createDots(pt, true);
    
    board.appendChild(el);
    dotsById.set(pt.id, el);
  });
}

function createDots(point, r) {
  const element = document.createElement("div");
  
  if (r) {
     element.className = `dot_r ${STATUS_CLASS.notpresent}`;
  } else {
    element.className = `dot ${STATUS_CLASS.offline}`;
  }
  element.style.top = point.top + "%";
  element.style.left = point.left + "%";
  element.dataset.id = point.id;
  element.dataset.name = point.name;
  element.title = `Point ${point.id}`;
  

  return element;
}

function createMenu(point) {
  const menu = document.createElement("div");

  menu.className = "dot-menu";

  menu.innerHTML = `
     <div class="dot-menu-header">
      <h1>${point.name}</h1>
      <div class="status-box ${STATUS_CLASS.offline}"></div>
     </div>
     <div class="dot-menu-body">
     </div>
     `;

  return menu;
}
