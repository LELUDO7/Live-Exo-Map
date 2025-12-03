export async function init() {
  document.getElementById("root").innerHTML = `
    <div class="mobile-view">
  <header class="mobile-header">
    <div class="container nav-inner">
      <div class="brand">MonTrax</div>
      <div class="line-select">
      <select id="train-line-select"></select>
      </div>
      <div class="lang-switch" aria-label="Language switcher">
        <button class="lang-btn" data-lang="fr" aria-pressed="true">
          FR
       </button>
       <button class="lang-btn" data-lang="en" aria-pressed="false">
          EN
       </button>
       <button class="setting-btn"><img src="./assets/settings.svg" alt="" width="18" height="18" /></button>
      </div>
    </div>
  </header>

  <main class="page">

    <div id="station-detail-overlay" class="station-detail-overlay">
          <div id="station-detail-menu" class="station-detail-menu exoColorLow">
          <div id="station-detail-menu-body"></div>
          <button data-i18n="close" id="closeStationMenu">
              Fermer
            </button>
          </div>
    </div>

  

    <div class="stations-wrapper">
      <div class="exoColor vertical-rail"></div>
      <ul class="stations-list"></ul>  
    </div>
    <footer>
      <p>© 2025 — MonTrax</p>
    </footer>

  </main>
</div>
  `;
  const lang = await import("./src/language.js");
  const rend = await import("./src/rendering.js");
  const api = await import("./src/api.js");
  const menu = await import("./src/menu.js")

  lang.initLanguage();
  rend.updateSation();
  rend.initLinesDropdown();
  api.refreshStatuses();
  menu.initStationDetailMenu();
  setInterval(api.refreshStatuses, CONFIG.INTERVAL_MS);
}
