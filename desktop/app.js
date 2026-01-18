export async function init() {
  document.getElementById("root").innerHTML = `
     <header class="navbar">
      <div class="container nav-inner">
        <div class="brand" data-i18n="title.map">MonTrax Map</div>
        <nav class="nav-links">
          <a id="mapBtn" href="#map" data-i18n="nav.map">Carte</a>
          <a id="consistsBtn" data-i18n="nav.consists">Consists</a>
          <a id="aboutBtn" href="#about" data-i18n="nav.about">À propos</a>
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
          <div id="realBoard" class="realBoard">
            <div id="realMap" class="realMap"></div>
            <div id="realMap-train-panel" class="realMap-train-panel hidden">
              <div class="realMap-train-panel-head">
                <h1 id="realMap-train-panel-title"></h1>
                <button class="realMap-train-panel-close-btn">✕</button>
              </div>
              
              <hr class="realMap-train-Panle-line">
              <h2>Informations</h2>
              <h3>Direction :</h3>
              <h4 class="realMap-train-panel-h-margim" id="realMap-train-panel-direction" ></h> 
              <h3 data-i18n="" >Ligne :</h3>
              <h4 class="realMap-train-panel-h-margim" id="realMap-train-panel-line" ></h4> 
              <h3>Occupation :</h3>
              <h4 class="realMap-train-panel-h-margim" data-i18n="" id="realMap-train-panel-occupancy" ></h4> 

              <div id="realMap-train-panel-advance-info">
                <h2>Informations avancées</h2>
                <h3>Vitesse :</h3>
                <h4 class="realMap-train-panel-h-margim" data-i18n="" id="realMap-train-panel-speed" ></h4> 
                <h3>Position :</h3>
                <h4 class="realMap-train-panel-h-margim" data-i18n="" id="realMap-train-panel-latitude" ></h4> 
                <h4 class="realMap-train-panel-h-margim" data-i18n="" id="realMap-train-panel-longitude" ></h4> 
                <h3 data-i18n="" >Composition :</h3>
                <div id="realMap-train-panel-consists"></div>
              </div>
            
            </div>

          </div> 
      </section>


      <section class="consists-section" id="consists">
        <div class="container">
          <h1 data-i18n="consists" >Consists</h1>
          <hr class="consists-line">
          <div class="consists-line-1 consists-table">
            <h2 data-i18n="consists.line1" >Ligne 11 Vaudreuil/Hudson</h2>
            <a data-i18n="consists.schedule.link" class="a-schedule-link" href="https://exo.quebec/Media/Default/z/lignes/train/TRAINS/VH/exo11-20241122_21001231.pdf">Horraire de la ligne</a>
            <hr class="consists-line">
            <div id="consists-line-1-table" ></div>
          </div>
          <hr class="consists-line">
          <div class="consists-line-4 consists-table">
            <h2 data-i18n="consists.line4" >Ligne 12 Saint-Jérôme</h2>
            <a data-i18n="consists.schedule.link" class="a-schedule-link" href="https://exo.quebec/Media/Default/z/lignes/train/TRAINS/SJ/exo12-20250616_21001231.pdf">Horraire de la ligne</a>
            <hr class="consists-line">
             <div id="consists-line-4-table" ></div>
          </div>
         <hr class="consists-line">
          <div class="consists-line-3 consists-table">
            <h2 data-i18n="consists.line3" >Ligne 13 Mont-Saint-Hilaire</h2> 
            <a data-i18n="consists.schedule.link" class="a-schedule-link" href="https://exo.quebec/Media/Default/z/lignes/train/TRAINS/SH/exo13-20231024_21001231.pdf">Horraire de la ligne</a>
            <hr class="consists-line">
             <div id="consists-line-3-table" ></div>
          </div>
          <hr class="consists-line">
          <div class="consists-line-5 consists-table">
            <h2 data-i18n="consists.line5" >Ligne 14 Candiac</h2>
            <a data-i18n="consists.schedule.link" class="a-schedule-link" href="https://exo.quebec/Media/Default/z/lignes/train/TRAINS/CA/exo14-20241122_21001231.pdf">Horraire de la ligne</a>
            <hr class="consists-line">
             <div id="consists-line-5-table" ></div>
          </div>
          <hr class="consists-line">
          <div class="consists-line-6 consists-table">
            <h2 data-i18n="consists.line6" >Ligne 15 Mascouche</h2>
            <a data-i18n="consists.schedule.link" class="a-schedule-link" href="https://exo.quebec/Media/Default/z/lignes/train/TRAINS/MA/exo15-20230731_21001231.pdf">Horraire de la ligne</a>
            <hr class="consists-line">
             <div id="consists-line-6-table" ></div>
          </div>
        </div>
      </section>

      <div id="settings-overlay" class="settings-overlay">
        <div class="settings-menu">
          <h2 data-i18n="settings.title">settings</h2>
          <hr />
          <div class="Switch-toggle-container">
            <p data-i18n="settings.MapType">Map classique</p>
            <label class="Switch">
              <input
                type="checkbox"
                id="MapTypeSwitch"
              />
              <span class="Switch-slider"></span>
            </label>
          </div>
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
          <a class="btn" data-i18n="about.more.link" onclick="window.open('https://montrax.org', '_blank')">
            En savoir plus
          </a>
        </div>
      </section>
      <footer>
        <p>© 2026 — MonTrax</p>
      </footer>
    </main>
  `;

  const lang = await import("./src/language.js");
  const rend = await import("./src/map/rendering.js");
  const set = await import("./src/settings.js");
  const api = await import("./src/api.js");
  const cm = await import("./src/contentManager.js");
  const cons = await import("./src/consists.js");
  const realMap = await import("./src/map/realMap.js");

  lang.initLanguage();
  set.initSettings();
  rend.renderMap();
  api.refreshStatuses();
  api.refreshStatusesR();
  api.getMovingsTrains();
  cm.initContentManager();
  cons.initConsists();
  realMap.init();
  setInterval(api.refreshStatuses, CONFIG.INTERVAL_MS);
  setInterval(api.refreshStatusesR, CONFIG.INTERVAL_MS);
  setInterval(api.getMovingsTrains, CONFIG.INTERVAL_MS);
}
