const STATIONSDATA = await import("./stationsData.js");
const ul = document.querySelector(".stations-list");

export function updateSation() {
  const select = document.getElementById("train-line-select");
  loadStationsForLine(select.value);
}

export function initLinesDropdown() {
  const select = document.getElementById("train-line-select");
  select.innerHTML = "";

  TRAIN_LINES.forEach((line) => {
    const opt = document.createElement("option");
    opt.value = line.id;
    opt.textContent = line.name;
    select.appendChild(opt);
  });

  select.addEventListener("change", (e) => {
    loadStationsForLine(e.target.value);
  });

  loadStationsForLine(1);
}

function loadStationsForLine(lineId) {
  const ul = document.querySelector(".stations-list");

  ul.innerHTML = "";

  updateLineColor(lineId);

  POINTS_CONFIG.forEach((dot) => {
    if (dot.id.at(-1) == lineId) {
      addStation(dot);
    }
  });

  let liveStationData = STATIONSDATA.getLiveStationData();
  if (liveStationData) {
    liveStationData.forEach((station) => {
      const dot = document.getElementById(station.id);
      if (dot) {
        dot.classList.remove(...Object.values(STATUS_CLASS));
        dot.classList.add(STATUS_CLASS[station.status] || STATUS_CLASS.error);
      }
    });
  }
}

function addStation(dot) {
  const li = document.createElement("li");
  li.className = "station-item";
  li.innerHTML = `
    <div id="${dot.id}" class="station-dot line${dot.id.at(-1)} ${
    dot.status
  }"></div>
    <span class="station-name">${dot.name}</span>
    <button data-open-station-menu
        data-station-id="${
          dot.id
        }" class="station-info-btn"><img class="station-info-btn-icon" src="./assets/info-circle.svg" alt="" width="18" height="18" /></button>
  `;

  ul.appendChild(li);
}

function updateLineColor(lineId) {
  const exoColor = document.querySelectorAll(".exoColor");
  const exoColorLow = document.querySelectorAll(".exoColorLow");

  exoColor.forEach((line) => {
    line.classList.remove("line1", "line3", "line4", "line5", "line6");
    line.classList.add(`line${lineId}`);
  });

  exoColorLow.forEach((line) => {
    line.classList.remove("line1", "line3", "line4", "line5", "line6");
    line.classList.add(`line${lineId}`);
  });
}


const STATUS_CLASS = {
  stopped: "stopped",
  incoming: "incoming",
  offline: "offline",
  error: "error",
};
