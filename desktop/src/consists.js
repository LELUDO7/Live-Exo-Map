const api = await import("./api.js");

const head1 = document.getElementById("consists-section-line-1-head");
const head3 = document.getElementById("consists-section-line-3-head");
const head4 = document.getElementById("consists-section-line-4-head");
const head5 = document.getElementById("consists-section-line-5-head");
const head6 = document.getElementById("consists-section-line-6-head");

const table1 = document.getElementById("consists-line-1-table");
const table3 = document.getElementById("consists-line-3-table");
const table4 = document.getElementById("consists-line-4-table");
const table5 = document.getElementById("consists-line-5-table");
const table6 = document.getElementById("consists-line-6-table");

const dateInput = document.getElementById("consists-date");

export async function initConsists() {
  table1.appendChild(createConsistsTables(await api.getLineConsists(1)));
  table3.appendChild(createConsistsTables(await api.getLineConsists(3)));
  table4.appendChild(createConsistsTables(await api.getLineConsists(4)));
  table5.appendChild(createConsistsTables(await api.getLineConsists(5)));
  table6.appendChild(createConsistsTables(await api.getLineConsists(6)));

  head1.addEventListener("click", () => {
    const isOpen = table1.style.display === "block";

    table1.style.display = isOpen ? "none" : "block";
    head1.classList.toggle("open", !isOpen);
  });

  head3.addEventListener("click", () => {
    const isOpen = table3.style.display === "block";

    table3.style.display = isOpen ? "none" : "block";
    head3.classList.toggle("open", !isOpen);
  });

  head4.addEventListener("click", () => {
    const isOpen = table4.style.display === "block";

    table4.style.display = isOpen ? "none" : "block";
    head4.classList.toggle("open", !isOpen);
  });

  head5.addEventListener("click", () => {
    const isOpen = table5.style.display === "block";

    table5.style.display = isOpen ? "none" : "block";
    head5.classList.toggle("open", !isOpen);
  });

  head6.addEventListener("click", () => {
    const isOpen = table6.style.display === "block";

    table6.style.display = isOpen ? "none" : "block";
    head6.classList.toggle("open", !isOpen);
  });

  initDateInput();
}

function initDateInput() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  dateInput.value = today.toLocaleDateString("en-CA");  
  dateInput.max = `${yyyy}-${mm}-${dd}`;
  dateInput.min = `2026-01-01`

  dateInput.addEventListener("change", (e) => {
    console.log("Date choisie :", e.target.value);
  });
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
