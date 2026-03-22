const isMobile = window.innerWidth <= 900;

async function loadUI() {
  if (isMobile) {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<link rel="stylesheet" href="./mobile/main.css?v=53">
       <link rel="stylesheet" href="./mobile/style/menu.css?v=53">
       <link rel="stylesheet" href="./mobile/style/navbar.css?v=53">
       <link rel="stylesheet" href="./mobile/style/settings.css?v=53">`
    );
    const mod = await import("./mobile/app.js?v=53");
    mod.init(); 
  } else {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css?v=53"/>
       <link rel="stylesheet" href="./desktop/main.css?v=53">
       <link rel="stylesheet" href="./desktop/style/menu.css?v=53">
       <link rel="stylesheet" href="./desktop/style/navbar.css?v=53">
       <link rel="stylesheet" href="./desktop/style/settings.css?v=53">
       <link rel="stylesheet" href="./desktop/style/consists.css?v=53">
       <link rel="stylesheet" href="./desktop/style/realMap/realMap.css?v=53">
       <link rel="stylesheet" href="./desktop/style/realMap/pin.css?v=53">
       <link rel="stylesheet" href="./desktop/style/realMap/panel.css?v=53">`
    );
    const app = await import("./desktop/app.js?v=53");
   
    app.init(); 
 
  }
}

loadUI();
