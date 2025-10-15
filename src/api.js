async function refreshStatuses() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/api/exo/trains/stations`, {
      method: "GET",
      headers: {
        cache: "no-store",
        train_info: "true",
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

    // Update status box inside menu
    const menuBody = dot.querySelector(".dot-menu-body");
    const statusBox = dot.querySelector(".status-box");
    const wagonDetailTable = document.createElement("table");

    menuBody.innerHTML = ``;

    if (station.train) {
      menuBody.innerHTML = `<h3>Détail du train : </h3>`;
      wagonDetailTable.innerHTML = `
      <h4>Occupation : ${station.occupancyStatus} </h4>
      <h4>Composition : </h4> <tr>
      <th>Ordre</th>
      <th>Id</th> </tr>`;

      for (const wagon of station.train) {
        const wagonDetail = document.createElement("tr");
        wagonDetail.innerHTML = `<td> ${wagon.carriageSequence}</td> <td>  ${wagon.id} </td>`;
        wagonDetailTable.appendChild(wagonDetail);
      }
      menuBody.appendChild(wagonDetailTable);
    }

    if (statusBox) {
      statusBox.classList.remove(...Object.values(STATUS_CLASS));
      statusBox.classList.add(
        STATUS_CLASS[station.status] || STATUS_CLASS.offline
      );
    }
  }
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
