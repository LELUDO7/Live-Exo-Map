// --- 1) Config des points ---
const POINTS_CONFIG = [
  { id: "MTL3", top: 62.8, left: 68.4, name: "Gare Lucien-L'Allier"},
  { id: "MTL2", top: 65, left: 60.5, name:"Gare Vendôme"},
  { id: "MTL1", top: 65, left: 50, name:"Gare Montréal-Ouest"},
  { id: "MTL8", top: 51.9, left: 61.6, name:"Gare Parc"},
  { id: "MTL37", top: 49.7, left: 58.5, name:"Gare Chabanel"},
  { id: "MTL7", top: 48, left: 56, name:"Gare Bois-de-Boulogne"},
  { id: "LVL24", top: 44.4, left: 53.55, name:"Gare De la Concorde"},
  { id: "LVL22", top: 41.1, left: 53.55, name:"Gare Vimont"},
  { id: "LVL4", top: 37.5, left: 53.55, name:"Gare Sainte-Rose"},
  { id: "ROS2", top: 35.1, left: 51.2, name:"Gare Rosemère"},
  { id: "STR4", top: 33.85, left: 49.4, name:"Gare Sainte-Thérèse"},
  { id: "BL1", top: 32.65, left: 47.7, name:"Gare Blainville"},
  { id: "MIR1", top: 31.3, left: 45.8, name:"Gare Mirabel"},
  { id: "SJM1", top: 29.4, left: 43.1, name:"Gare Saint-Jérôme"}

];

// --- 2) Mapping status -> classe CSS ---
const STATUS_CLASS = {
  stopped: "s-stopped",
  incoming: "s-incoming",
  offline: "s-offline"
};

const board = document.getElementById("board");
const dotsById = new Map();

// --- 3) Création des points ---
function createDots() {
  POINTS_CONFIG.forEach(pt => {
    const el = document.createElement("div");
    el.className = `dot ${STATUS_CLASS.offline}`;
    el.style.top = pt.top + "%";
    el.style.left = pt.left + "%";
    el.dataset.id = pt.id;
    el.dataset.name = pt.name;
    el.title = `Point ${pt.id}`;
    board.appendChild(el);
    dotsById.set(pt.id, el);
  });
}

// --- 4) Fetch périodique du serveur ---
const ENDPOINT = "http://localhost:3000/api/trains"; // <-- adapte à ton backend
const INTERVAL_MS = 2000;

async function refreshStatuses() {
  try {
    const res = await fetch(ENDPOINT, { cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    updateDots(data);
  } catch (err) {
    console.warn("Erreur de mise à jour des points:", err);
    setAllOffline();
  }
}

function updateDots(items) {
  setAllOffline();
  for (const { id, status } of items) {
    const dot = dotsById.get(id);
    if (!dot) continue;
    dot.classList.remove(...Object.values(STATUS_CLASS));
    dot.classList.add(STATUS_CLASS[status] || STATUS_CLASS.offline);
  }
}

function setAllOffline() {
  for (const dot of dotsById.values()) {
    dot.classList.remove(...Object.values(STATUS_CLASS));
    dot.classList.add(STATUS_CLASS.offline);
  }
}

// --- 5) Init ---
createDots();
refreshStatuses();
setInterval(refreshStatuses, INTERVAL_MS);