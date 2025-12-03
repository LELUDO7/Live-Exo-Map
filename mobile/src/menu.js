const STATIONSDATA = await import("./stationsData.js");
const LANG = await import("./language.js");

export function initStationDetailMenu() {
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-open-station-menu]");
    if (!btn) return;

    const stationId = btn.dataset.stationId;
    openStationDetailMenu(stationId);
  });

  document
    .getElementById("closeStationMenu")
    .addEventListener("click", closeStationDetailMenu);
}

export function openStationDetailMenu(stationId) {
  const overlay = document.getElementById("station-detail-overlay");
  const menuBody = document.getElementById("station-detail-menu-body");
  const stationData = STATIONSDATA.getLiveStationData();

  overlay.style.display = "flex";

  if (stationData) {
    stationData.forEach((station) => {
      if (station.id == stationId) {
        menuBody.innerHTML = `
            <h1>${station.name}</h1>`;

        if (station.trains_list.length != 0) {
          station.trains_list.forEach((train) => {
            const trainInfo = document.createElement("div");
            trainInfo.innerHTML = `
            <hr class="station-detail-menu-line">
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
            `;
            menuBody.appendChild(trainInfo);
          });
        }
      }
    });
  }
  LANG.initLanguage();
}

export function closeStationDetailMenu() {
  document.getElementById("station-detail-overlay").style.display = "none";
}

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
