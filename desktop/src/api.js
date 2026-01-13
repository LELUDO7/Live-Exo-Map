// api.js
const rend = await import("./map/rendering.js");

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
    rend.updateDots(data);
  } catch (err) {
    console.warn("Erreur de mise à jour des points:", err);
    rend.setAllError();
  }
}

export async function refreshStatusesR() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/api/exo/trains/rails`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    rend.updateDotsR(data);
  } catch (err) {
    console.warn("Erreur de mise à jour des points:", err);
    rend.setAllError();
  }
}

export async function getLineConsists(line) {
  try {
    const res = await fetch(`${CONFIG.API_URL}/api/exo/trains/consists`, {
      method: "GET",
      headers: {
        cache: "no-store",
        "X-Consists-Line": line,
      },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Faild to get consists", err);
    rend.setAllError();
  }
}
