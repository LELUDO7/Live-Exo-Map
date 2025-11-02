export async function init() {
  document.getElementById("root").innerHTML = `
     <header class="navbar">
      <div class="container nav-inner">
        <div class="brand" data-i18n="title.map">MonTrax Map</div>
        <nav class="nav-links">
          <a href="#map" data-i18n="nav.map">Carte</a>
          <a href="#about" data-i18n="nav.about">À propos</a>
        </nav>
        <div class="lang-switch" aria-label="Language switcher">
          <button class="lang-btn" data-lang="fr" aria-pressed="true">
            FR
          </button>
          <button class="lang-btn" data-lang="en" aria-pressed="false">
            EN
          </button>
          <button class="setting-btn">
            <img src="./assets/settings.svg" alt="" width="18" height="18" />
          </button>
        </div>
      </div>
    </header>

    <main class="page">
      <section id="map" class="map-section">
        <div id="board" class="board"></div>
      </section>

      <div id="settings-overlay" class="settings-overlay">
        <div class="settings-menu">
          <h2 data-i18n="settings.title">settings</h2>
          <hr />
          <div class="Switch-toggle-container">
            <p data-i18n="settings.advanceDetail">Détail avancer</p>
            <label class="Switch">
              <input
                type="checkbox"
                id="RailFanSwitch"
              />
              <span class="Switch-slider"></span>
            </label>
          </div>
          <div class="Switch-toggle-container">
            <p data-i18n="settings.segment">Segment</p>
            <label class="Switch">
              <input
                type="checkbox"
                id="SegmentSwitch"
              />
              <span class="Switch-slider"></span>
            </label>
          </div>
          <button data-i18n="close" id="closeSet">
            Fermer
          </button>
        </div>
      </div>

      <section id="about" class="about-section">
        <div class="container">
          <h2 data-i18n="about.title">À propos</h2>
          <p data-i18n="about.text">
            Projet expérimental qui affiche l’état des gares des trains de
            banlieue de la région de Montréal. Les points changent de couleur
            selon le statut rapporté par l’API (En gare [vert], En approche
            [Jaune]).
          </p>
          <a class="btn" onclick="window.open('https://montrax.org', '_blank')">
            En savoir plus
          </a>
        </div>
      </section>
      <footer>
        <p>© 2025 — MonTrax</p>
      </footer>
    </main>
  `;

  const lang = await import("./src/language.js");
  const rend = await import("./src/rendering.js");
  const set = await import("./src/settings.js");
  const api = await import("./src/api.js");

  lang.initLanguage();
  set.initSettings();
  rend.renderMap();
  api.refreshStatuses();
  api.refreshStatusesR();
  setInterval(api.refreshStatuses, CONFIG.INTERVAL_MS);
  setInterval(api.refreshStatusesR, CONFIG.INTERVAL_MS);
}
