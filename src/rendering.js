//rendering.js

function renderMap() {
  POINTS_CONFIG.forEach((pt) => {
    const el = createDots(pt, false);
    const menu = createMenu();

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
    element.className = `dot_r rail-fan-element-segment ${STATUS_CLASS.notpresent}`;
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

function createMenu() {
  const menu = document.createElement("div");

  menu.className = "dot-menu";

  menu.innerHTML = `
      <div class="dot-menu-header">
      </div>
      <hr class="dot-menu-line">
      <div class="dot-menu-body ">
      </div>
     `;
  //rail-fan-element
  return menu;
}
