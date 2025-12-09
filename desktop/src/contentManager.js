export function initContentManager() {

  document.getElementById("mapBtn").addEventListener("click", displayMap);
  document.getElementById("aboutBtn").addEventListener("click", displayAbout);
  document.getElementById("consistsBtn").addEventListener("click", displayConsists);

  document.getElementById("consists").style.display = "none";
}

function displayMap(){
  document.getElementById("map").style.display = "grid";
  document.getElementById("about").style.display = "block";
  document.getElementById("consists").style.display = "none";
}

function displayAbout(){
  document.getElementById("map").style.display = "grid";
  document.getElementById("about").style.display = "block";
  document.getElementById("consists").style.display = "none";
}

function displayConsists(){
  document.getElementById("map").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("consists").style.display = "block";
}