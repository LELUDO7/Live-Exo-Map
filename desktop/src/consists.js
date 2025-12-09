const api = await import("./api.js");

export async function initConsists() {

  const table1 = document.getElementById("consists-line-1-table");
  const table3 = document.getElementById("consists-line-3-table");
  const table4 = document.getElementById("consists-line-4-table");
  const table5 = document.getElementById("consists-line-5-table");
  const table6 = document.getElementById("consists-line-6-table");

  table1.appendChild(createConsistsTables(await api.getLineConsists(1)));
  table3.appendChild(createConsistsTables(await api.getLineConsists(3)));
  table4.appendChild(createConsistsTables(await api.getLineConsists(4)));
  table5.appendChild(createConsistsTables(await api.getLineConsists(5)));
  table6.appendChild(createConsistsTables(await api.getLineConsists(6)));
}

function createConsistsTables(line) {
  const table = document.createElement("table");

  table.innerHTML = `
      <tr>
      <th>Train</th>
      <th>Destination</th> 
      <th>Composition</th> 
      </tr>`;

  line.forEach((consist) => {
    const consistTable = document.createElement("tr");

    const wagonTableTd = document.createElement("td");
    const wagonTable = document.createElement("table");

    const wagonTablePosition = document.createElement("tr");
    const wagonTableID = document.createElement("tr");
    const wagonTableModel = document.createElement("tr");

    consistTable.innerHTML = `<td>${consist.trip_short_name}</td><td>${consist.trip_headsign}</td>`;

    wagonTablePosition.innerHTML = `<th data-i18n="consists.table.order"></th>`;
    wagonTableID.innerHTML = "<th>Id</th>";
    wagonTableModel.innerHTML = `<th ata-i18n="consists.table.model">Model</th>`;

    for (const wagon of consist.composition) {
      const wagonTablePositionContent = document.createElement("td");
      const wagonTableIDContent = document.createElement("td");
      const wagonTableModelContent = document.createElement("td");

      wagonTablePositionContent.innerHTML = `${wagon.carriageSequence}`;
      wagonTablePosition.appendChild(wagonTablePositionContent);

      wagonTableIDContent.innerHTML = `${wagon.id}`;
      wagonTableID.appendChild(wagonTableIDContent);

      wagonTableModelContent.innerHTML = `${WAGON_MODEL_NAME[wagon.model_id]} `;
      wagonTableModel.appendChild(wagonTableModelContent);
    }

    wagonTable.appendChild(wagonTablePosition);
    wagonTable.appendChild(wagonTableID);
    wagonTable.appendChild(wagonTableModel);

    wagonTableTd.appendChild(wagonTable);
    consistTable.appendChild(wagonTableTd);

    table.appendChild(consistTable);
  });

  return table;
}
