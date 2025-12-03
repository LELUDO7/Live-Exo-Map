const STATIONSDATA = await import("./stationsData.js");
const REND = await import("./rendering.js")

export async function refreshStatuses() {
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
    STATIONSDATA.updateLiveStationData(data);
    REND.updateSation();
  } catch (err) {
    console.warn("Erreur de mise à jour des points:", err);
  }
}
