// --- 1) Config des points ---
const POINTS_CONFIG = [
  
  //Ligne 4 Saint-Jerome
  { id: "MTL3-4",status:"offline", top: 62.53, left: 67.83, name: "Gare Lucien-L'Allier"},
  { id: "MTL2-4",status:"offline", top: 64.45, left: 60.5, name:"Gare Vendôme"},
  { id: "MTL1-4",status:"offline", top: 64.45, left: 50.2, name:"Gare Montréal-Ouest"},
  { id: "MTL8-4",status:"offline", top: 51.9, left: 61.6, name:"Gare Parc"},
  { id: "MTL37-4",status:"offline", top: 49.7, left: 58.5, name:"Gare Chabanel"},
  { id: "MTL7-4",status:"offline", top: 48, left: 56, name:"Gare Bois-de-Boulogne"},
  { id: "LVL24-4",status:"offline", top: 44.4, left: 53.55, name:"Gare De la Concorde"},
  { id: "LVL22-4",status:"offline", top: 41.1, left: 53.55, name:"Gare Vimont"},
  { id: "LVL4-4",status:"offline", top: 37.5, left: 53.55, name:"Gare Sainte-Rose"},
  { id: "ROS2-4",status:"offline", top: 35.1, left: 51.2, name:"Gare Rosemère"},
  { id: "STR4-4",status:"offline", top: 33.85, left: 49.4, name:"Gare Sainte-Thérèse"},
  { id: "BLA1-4",status:"offline", top: 32.65, left: 47.7, name:"Gare Blainville"},
  { id: "MIR1-4",status:"offline", top: 31.3, left: 45.8, name:"Gare Mirabel"},
  { id: "SJM1-4",status:"offline", top: 29.4, left: 43.1, name:"Gare Saint-Jérôme"},

  //Ligne 1 Vaudreuil Hudson
  { id: "MTL3-1",status:"offline", top: 62.9, left: 68.4, name: "Gare Lucien-L'Allier"},
  { id: "MTL2-1",status:"offline", top: 65, left: 60.5, name:"Gare Vendôme"},
  { id: "MTL1-1",status:"offline", top: 65, left: 50.2, name:"Gare Montréal-Ouest"},
  { id: "LCH1-1",status:"offline", top: 61.242, left: 38.71, name:"Gare Lachine"},
  { id: "DVL2-1",status:"offline", top: 61.242, left: 36.25, name:"Gare Dorval"},
  { id: "DVL1-1",status:"offline", top: 61.242, left: 33.7, name:"Gare Pine Beach"},
  { id: "PCL3-1",status:"offline", top: 61.242, left: 31.2, name:"Gare Valois"},
  { id: "PCL2-1",status:"offline", top: 61.242, left: 28.75, name:"Gare Pointe-Claire"},
  { id: "PCL1-1",status:"offline", top: 61.242, left: 26.1, name:"Gare Cedar Park"},
  { id: "BEA2-1",status:"offline", top: 61.242, left: 23.5, name:"Gare Beaconsfield"},
  { id: "BEA1-1",status:"offline", top: 61.242, left: 20.9, name:"Gare Beaurepaire"},
  { id: "BUR1-1",status:"offline", top: 61.242, left: 18.3, name:"Gare Baie-d'Urfé"},
  { id: "SAB1-1",status:"offline", top: 61.242, left: 15.7, name:"Gare Sainte-Anne-de-Bellevue"},
  { id: "LIP1-1",status:"offline", top: 61.242, left: 13.3, name:"Gare Île-Perrot"},
  { id: "TVA1-1",status:"offline", top: 61.242, left: 11.45, name:"Gare Pincourt"},
  { id: "VAU1-1",status:"offline", top: 60.8, left: 9.25, name:"Gare Dorion"},
  { id: "VAU8-1",status:"offline", top: 59.5, left: 7.4, name:"Gare Vaudreuil"},
  { id: "HUD1-1",status:"offline", top: 57.6, left: 4.7, name:"Gare Hudson"},
  //Ligne 5 Candiac
  { id: "MTL3-5",status:"offline", top: 63.32, left: 68.9, name: "Gare Lucien-L'Allier"},
  { id: "MTL2-5",status:"offline", top: 65.55, left: 60.5, name:"Gare Vendôme"},
  { id: "MTL1-5",status:"offline", top: 65.55, left: 50.2, name:"Gare Montréal-Ouest"},
  { id: "LCH4-5",status:"offline", top: 68.5, left: 47.9, name:"Gare Du Canal"},
  { id: "LSL1-5",status:"offline", top: 70.28, left: 47.9, name:"Gare LaSalle"},
  { id: "SCS2-5",status:"offline", top: 74.75, left: 52, name:"Gare Sainte-Catherin"},
  { id: "SCS1-5",status:"offline", top: 76, left: 53.8, name:"Saint-Constant"},
  { id: "DEL1-5",status:"offline", top: 77.25, left: 55.6, name:"Gare Delson"},
  { id: "DEL1-5",status:"offline", top: 78.50, left: 57.3, name:"Gare Delson"},

  //Ligne 3 Mont Saint-Hilaire 
  { id: "MTL5-3",status:"offline", top: 61.3, left: 70.4, name: "Gare Central"},
  { id: "STL1-3",status:"offline", top: 62.45, left: 83.45, name: "Saint-Lambert"},
  { id: "STH3-3",status:"offline", top: 61.14, left: 85.3, name: "Longueuil-Saint-Hubert"},
  { id: "STB2-3",status:"offline", top: 59.9, left: 87.02, name: "Saint-Bruno"},
  { id: "SBA2-3",status:"offline", top: 58.64, left: 88.85, name: "Saint-Basile-le-Grand"},
  { id: "MMS1-3",status:"offline", top: 57.38, left: 90.6, name: "McMasterville"},
  { id: "MSH1-3",status:"offline", top: 56.15, left: 92.3, name: "Mont-Saint-Hilaire"},

  //Ligne 6 Mascouche.  
  { id: "MTL5-6",status:"offline", top: 61.7, left: 69.8, name: "Gare Central"},
  { id: "MTL59-6",status:"offline", top: 49.7, left: 57.17, name: "Gare Ahuntsic"},
  { id: "MTL58-6",status:"offline", top: 47.4, left: 60.43, name: "Gare Sauvé"},
  { id: "MTL57-6",status:"offline", top: 41.87, left: 68.25, name: "Gare Saint-Michel-Montréal-Nord"},
  { id: "MTL56-6",status:"offline", top: 39.83, left: 71.13, name: "Gare Saint-Léonard-Montréal-Nord"},
  { id: "MTL55-6",status:"offline", top: 39.12, left: 75.86, name: "Gare Anjou"},
  { id: "MTL54-6",status:"offline", top: 35.5, left: 82.25, name: "Gare Rivière-des-Prairies"},
  { id: "MTL53-6",status:"offline", top: 34.72, left: 86.09, name: "Gare Pointe-aux-Trembles"},
  { id: "LEG1-6",status:"offline", top: 29.58, left: 90.81, name: "Gare Repentigny"},
  { id: "LCN1-6",status:"offline", top: 29.58, left: 85.84, name: "Gare Terrebonne"},
  { id: "MAS1-6",status:"offline", top: 29.58, left: 80.93, name: "Gare Mascouche"},
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
async function refreshStatuses() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/api/exo/trains/stations`, { cache: "no-store" });
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

// --- 5) Init map ---
createDots();
refreshStatuses();
setInterval(refreshStatuses, CONFIG.INTERVAL_MS);

/* =========================
   Simple FR/EN i18n toggler
   ========================= */
const I18N = {
  fr: {
    "nav.map": "Carte",
    "nav.about": "À propos",
    "about.title": "À propos",
    "about.text":
      "Projet expérimental qui affiche l’état des gares des trains de banlieue de la région de Montréal. Les points changent de couleur selon le statut rapporté par l’API (arrêté, en approche, hors ligne)."
  },
  en: {
    "nav.map": "Map",
    "nav.about": "About",
    "about.title": "About",
    "about.text":
      "Experimental project showing the status of commuter rail stations around Montréal. Dots change color based on the API status (stopped, incoming, offline)."
  }
};

function setLanguage(lang) {
  const dict = I18N[lang] || I18N.fr;
  document.documentElement.setAttribute("lang", lang);
  // Update labels
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  // Toggle pressed state on buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    const isPressed = btn.getAttribute("data-lang") === lang;
    btn.setAttribute("aria-pressed", String(isPressed));
  });
  try {
    localStorage.setItem("lang", lang);
  } catch {}
}

function initLanguage() {
  const saved = (() => {
    try { return localStorage.getItem("lang"); } catch { return null; }
  })();
  setLanguage(saved || "fr");
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
  });
}

// Initialize i18n after DOM is ready
initLanguage();