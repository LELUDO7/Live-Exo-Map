const isMobile = window.innerWidth <= 900;

async function loadUI() {
  if (isMobile) {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<link rel="stylesheet" href="./mobile/main.css">
       <link rel="stylesheet" href="./mobile/style/menu.css">
       <link rel="stylesheet" href="./mobile/style/navbar.css">
       <link rel="stylesheet" href="./mobile/style/settings.css">`
    );
    const mod = await import("./mobile/app.js");
    mod.init(); 
  } else {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
       <link rel="stylesheet" href="./desktop/main.css">
       <link rel="stylesheet" href="./desktop/style/menu.css">
       <link rel="stylesheet" href="./desktop/style/navbar.css">
       <link rel="stylesheet" href="./desktop/style/settings.css">
       <link rel="stylesheet" href="./desktop/style/consists.css">
       <link rel="stylesheet" href="./desktop/style/realMap/realMap.css">
       <link rel="stylesheet" href="./desktop/style/realMap/pin.css">
       <link rel="stylesheet" href="./desktop/style/realMap/panel.css">`
    );
    const app = await import("./desktop/app.js");
   
    app.init(); 
  }
}

loadUI();
