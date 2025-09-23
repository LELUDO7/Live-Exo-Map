async function refreshStatuses() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/api/exo/trains/stations`, { cache: "no-store" });
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
    const res = await fetch(`${CONFIG.API_URL}/api/exo/trains/rails`, { cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    updateDotsR(data);
  } catch (err) {
    console.warn("Erreur de mise à jour des points:", err);
    setAllError();
  }
}

function updateDots(items) {
  
  for (const { id, status } of items) {
    const dot = dotsById.get(id);
    if (!dot) continue;
    dot.classList.remove(...Object.values(STATUS_CLASS));
    dot.classList.add(STATUS_CLASS[status] || STATUS_CLASS.offline);
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