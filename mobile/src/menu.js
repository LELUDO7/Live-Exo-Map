const STATIONSDATA = await import("./stationsData.js");

export function initStationDetailMenu() {
    
    document.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-open-station-menu]");
      if (!btn) return;

      const stationId = btn.dataset.stationId;
      openStationDetailMenu(stationId);
    });

    document.getElementById("closeStationMenu").addEventListener("click", closeStationDetailMenu);

}


export function openStationDetailMenu(stationId) {
    const overlay = document.getElementById("station-detail-overlay");
    const stationData = STATIONSDATA.getLiveStationData();

    overlay.style.display = "flex";
    overlay.querySelector("h1").textContent = `Station : ${stationId}`;
   
    if (stationData) {
      stationData.forEach((station) => {
        if (station.id == stationId) {
          overlay.querySelector("h1").textContent = ` ${station.name}`;
        }
      });
    }
}

export function closeStationDetailMenu() {
    document.getElementById("station-detail-overlay").style.display = "none";
}
