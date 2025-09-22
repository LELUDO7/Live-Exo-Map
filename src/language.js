/* =========================
   Simple FR/EN i18n toggler
   ========================= */
const I18N = {
  fr: {
    "github.link1": "Lien vers le GitHub de l'API",
    "github.link2": "Lien vers le GitHub de cette page web",
    "nav.map": "Carte",
    "nav.about": "À propos",
    "about.title": "À propos",
    "about.text":
      "Projet expérimental qui affiche l’état des gares des trains de banlieue de la région de Montréal. Les points changent de couleur selon le statut rapporté par l’API (En gare [vert], En approche [Jaune])."
  },
  en: {
    "github.link1": "Link to the API GitHub",
    "github.link2": "Link to the live Map website GitHub (This website)",
    "nav.map": "Map",
    "nav.about": "About",
    "about.title": "About",
    "about.text":
      "Experimental project showing the status of commuter rail stations around Montréal. Dots change color based on the API status (At station [green], incoming [yellow])."
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

