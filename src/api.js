// api.js

async function refreshStatuses() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/api/exo/trains/stations`, {
      method: "GET",
      headers: {
        cache: "no-store",
        "X-Train-Info": "true",
      },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    updateDots(data);
  } catch (err) {
    console.warn("Erreur de mise à jour des points:", err);
    setAllError();
  }
}

async function refreshStatusesR() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/api/exo/trains/rails`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    updateDotsR(data);
  } catch (err) {
    console.warn("Erreur de mise à jour des points:", err);
    setAllError();
  }
}

function updateDots(items) {
  for (const station of items) {
    const dot = dotsById.get(station.id);
    if (!dot) continue;
    dot.classList.remove(...Object.values(STATUS_CLASS));
    dot.classList.add(STATUS_CLASS[station.status] || STATUS_CLASS.offline);

    const menuHeader = dot.querySelector(".dot-menu-header");
    const menuBody = dot.querySelector(".dot-menu-body");

    menuHeader.innerHTML = ``;
    menuBody.innerHTML = ``;

    updateDotMenuHeader(station, menuHeader);

    if (station.trains_list) {
      updateDotMenuBody(station, menuBody);
    }
  }

  initSettings();
  initLanguage();
}

function updateDotsR(items) {
  for (const { id, status } of items) {
    const dot = dotsById.get(id);
    if (!dot) continue;
    dot.classList.remove(...Object.values(STATUS_CLASS));
    dot.classList.add(STATUS_CLASS[status] || STATUS_CLASS.notpresent);
  }
}

function setAllError() {
  for (const dot of dotsById.values()) {
    dot.classList.remove(...Object.values(STATUS_CLASS));
    dot.classList.add(STATUS_CLASS.error);
  }
}

function updateDotMenuBody(station, body) {
  station.trains_list.forEach((train) => {
    const trainInfo = document.createElement("div");
    const table = document.createElement("table");
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
    <div class="rail-fan-element-block" style="display:flex; align-items:center; white-space:nowrap;">
      <h3 data-i18n="menu.detail" ></h3>
      <h3>&nbsp;Train ${train.trip_short_name}</h3>
    </div>
    <h4 data-i18n="menu.composition" class="rail-fan-element-block"></h4> 
      `;

    table.innerHTML = `
      <tr>
      <th data-i18n="menu.order" ></th>
      <th>Id</th> </tr>`;

    for (const wagon of train.train) {
      const wagonDetail = document.createElement("tr");
      wagonDetail.innerHTML = `<td> ${wagon.carriageSequence}</td> <td>  ${wagon.id} </td>`;
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
