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
    if (station.train) {
      updateDotMenuBody(station, menuBody);
    }
  }

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
  const table = document.createElement("table");

  body.innerHTML = `
      <h4 data-i18n="menu.train.stop" class="status-text-stop ${
        STATUS_CLASS_DISPLAY_STOPPED[station.status] ||
        STATUS_CLASS_DISPLAY_STOPPED.offline
      }"></h4>
      <h4 data-i18n="menu.train.inco" class="status-text-inco ${
        STATUS_CLASS_DISPLAY_INCOMING[station.status]
      }"></h4>
      <div style="display: flex;"><h4 data-i18n="menu.occupation"></h4> <p>${
        station.occupancyStatus
      }</p></div>
      <h3 data-i18n="menu.detail"></h3>
      <h4 data-i18n="menu.composition"></h4> 
      `;

  table.innerHTML = `
      <tr>
      <th data-i18n="menu.order" ></th>
      <th>Id</th> </tr>
  `;

  for (const wagon of station.train) {
    const wagonDetail = document.createElement("tr");
    wagonDetail.innerHTML = `<td> ${wagon.carriageSequence}</td> <td>  ${wagon.id} </td>`;
    table.appendChild(wagonDetail);
  }

  body.appendChild(table);
}

function updateDotMenuHeader(station, header) {
  header.innerHTML = `
      <h1>${station.name}</h1>
      <div class="status-box ${
        STATUS_CLASS[station.status] || STATUS_CLASS.offline
      }"></div><br>
  `;
}
