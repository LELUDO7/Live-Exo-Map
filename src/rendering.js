//rendering.js 

function renderMap() {
  POINTS_CONFIG.forEach((pt) => {
    const el = createDots(pt,false);
    const menu = createMenu(pt);

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
     element.className = `dot_r rail-fan-element ${STATUS_CLASS.notpresent}`;
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
     <div>
      <div class="dot-menu-header">
        <h1>${point.name}</h1>
        <div class="status-box ${STATUS_CLASS.offline}"></div><br>
      </div>
      <hr class="dot-menu-line">
      <div>
        <h4 data-i18n="menu.train.stop" class="status-text-stop"></h4>
        <h4 data-i18n="menu.train.inco" class="status-text-inco"></h4>
      </div>
     </div>
     <div class="dot-menu-body rail-fan-element">
     </div>
     `;

  return menu;
}
