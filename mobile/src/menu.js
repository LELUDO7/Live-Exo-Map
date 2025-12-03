const STATIONSDATA = await import("./stationsData.js");
const LANG = await import("./language.js");
const SET = await import("./settings.js");

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
            const table = document.createElement("table");

            table.classList.add("rail-fan-element-table");

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
              wagonDetail.innerHTML = `<td> ${
                wagon.carriageSequence
              }</td> <td>  ${wagon.id} </td> <td> ${
                WAGON_MODEL_NAME[wagon.model_id]
              } </td>`;
              table.appendChild(wagonDetail);
            }

            trainInfo.appendChild(table);
            menuBody.appendChild(trainInfo);
          });
        }
      }
    });
  }
  SET.initSettings();
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

const WAGON_MODEL_NAME = {
  1320: "EMD F59PHI",
  1340: "EMD F59PH",
  1350: "Bombardier ALP-45DP",
  1400: "Siemens Charger EC-42",
  700: "Bombardier Comet II",
  2000: "Bombardier BiLevel VII",
  3000: "Bombardier MultiLevel",
  2050: "CRRC",
};
