const isMobile = window.innerWidth <= 900;

async function loadUI() {
  if (isMobile) {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<link rel="stylesheet" href="./mobile/main.css">
       <link rel="stylesheet" href="./mobile/style/menu.css">
       <link rel="stylesheet" href="./mobile/style/navbar.css">`
    );
    const mod = await import("./mobile/app.js");
    mod.init(); // lance le mobile
  } else {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<link rel="stylesheet" href="./desktop/main.css">
       <link rel="stylesheet" href="./desktop/style/menu.css">
       <link rel="stylesheet" href="./desktop/style/navbar.css">
       <link rel="stylesheet" href="./desktop/style/settings.css">`
    );
    const app = await import("./desktop/app.js");
   
    app.init(); 
  }
}

loadUI();
