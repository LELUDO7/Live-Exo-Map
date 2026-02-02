//rendering.js
const lang = await import("../language.js");
const set = await import("../settings.js");
const board = document.getElementById("board");
const dotsById = new Map();

export function renderMap() {
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
  return menu;
}

export function updateDots(items) {
  for (const station of items) {
    const dot = dotsById.get(station.id);
    if (!dot) continue;
    dot.classList.remove(...Object.values(STATUS_CLASS));
    dot.classList.add(STATUS_CLASS[station.status] || STATUS_CLASS.offline);

    const menuHeader = dot.querySelector(".dot-menu-header");
    const menuBody = dot.querySelector(".dot-menu-body");
    const menu = dot.querySelector(".dot-menu");

    menu.classList.add(DOT_MENU_COLOR_CLASS[station.id.at(-1)]);

    menuHeader.innerHTML = ``;
    menuBody.innerHTML = ``;

    updateDotMenuHeader(station, menuHeader);

    if (station.trains_list) {
      updateDotMenuBody(station, menuBody);
    }
  }

  set.initSettings();
  lang.initLanguage();
}

export function updateDotsR(items) {
  for (const { id, status } of items) {
    const dot = dotsById.get(id);
    if (!dot) continue;
    dot.classList.remove(...Object.values(STATUS_CLASS));
    dot.classList.add(STATUS_CLASS[status] || STATUS_CLASS.notpresent);
  }
}

export function setAllError() {
  for (const dot of dotsById.values()) {
    dot.classList.remove(...Object.values(STATUS_CLASS));
    dot.classList.add(STATUS_CLASS.error);
  }
}

function updateDotMenuBody(station, body) {
  station.trains_list.forEach((train) => {
    const trainInfo = document.createElement("div");
    const table = document.createElement("table");

    table.style.whiteSpace = "nowrap";
    table.style.marginTop = "5px";
    table.classList.add("rail-fan-element-table");

    trainInfo.innerHTML = `
    <div style="display:flex; align-items:center; white-space:nowrap;">
      <h3> Train ${train.trip_short_name}&nbsp;</h3>
      <h3 data-i18n="menu.train.stop" class="status-text-stop ${
        STATUS_CLASS_DISPLAY_STOPPED[train.status]
      }"></h3>
      <h3 data-i18n="menu.train.inco" class="status-text-inco ${
        STATUS_CLASS_DISPLAY_INCOMING[train.status]
      }"></h3>
    </div>
    <h4 data-i18n="menu.direction" class=" "></h4>
    <p class=" ">${train.trip_headsign}</p>
    <h4 data-i18n="menu.occupation"></h4> 
    <p data-i18n="${OCCUPATION_LEVEL_CLASS[train.occupancyStatus]}"></p>
    <div class="rail-fan-element-block" style="display:flex; align-items:center; white-space:nowrap; margin-top:10px; ">
      <h3 data-i18n="menu.detail" ></h3>
      <h3>&nbsp;Train ${train.trip_short_name}</h3>
    </div>
    <h4 data-i18n="menu.composition" class="rail-fan-element-block"></h4> 
      `;

    table.innerHTML = `
      <tr>
      <th data-i18n="menu.order" ></th>
      <th>Id</th> 
      <th data-i18n="menu.model" ></th> 
      </tr>`;

    for (const wagon of train.train) {
      const wagonDetail = document.createElement("tr");
      wagonDetail.innerHTML = `<td> ${wagon.carriageSequence}</td> <td>  ${
        wagon.id
      } </td> <td> ${WAGON_MODEL_NAME[wagon.model_id]} </td>`;
      table.appendChild(wagonDetail);
    }

    trainInfo.appendChild(table);

    body.appendChild(trainInfo);
  });
}

function updateDotMenuHeader(station, header) {
  header.innerHTML = `
      <h1>${station.name}</h1>
      <div class="status-box ${
        STATUS_CLASS[station.status] || STATUS_CLASS.offline
      }"></div><br>
  `;
}

const STATUS_CLASS = {
  stopped: "s-stopped",
  incoming: "s-incoming",
  offline: "s-offline",
  notpresent: "not_present",
  present: "present",
  error: "error",
};

const STATUS_CLASS_DISPLAY_INCOMING = {
  stopped: "notDisplay",
  incoming: "display",
  offline: "notDisplay",
};

const STATUS_CLASS_DISPLAY_STOPPED = {
  stopped: "display",
  incoming: "notDisplay",
  offline: "notDisplay",
};

const OCCUPATION_LEVEL_CLASS = {
  0: "menu.occupation.empty",
  1: "menu.occupation.manyseat",
  2: "menu.occupation.fewseat",
  3: "menu.occupation.standing",
  4: "menu.occupation.crushstanding",
  5: "menu.occupation.full",
  6: "menu.occupation.nopassanger",
};

const DOT_MENU_COLOR_CLASS = {
  1: "dot-menu-line-1",
  3: "dot-menu-line-3",
  4: "dot-menu-line-4",
  5: "dot-menu-line-5",
  6: "dot-menu-line-6",
};
