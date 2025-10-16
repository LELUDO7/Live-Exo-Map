function initSettings() {
  const saved = (() => {
    try {
      return localStorage.getItem("rail-fan-mode");
    } catch {
      return null;
    }
  })();
  setSettings(saved || 0);
  document.querySelectorAll(".setting-btn").forEach((btn) => {
    btn.addEventListener("click", () => openSettingsMenu());
  });
}

function openSettingsMenu() {
  document.getElementById("settings-overlay").style.display = "flex";
}
  

function closeSettingsMenu() {
  document.getElementById("settings-overlay").style.display = "none";
}

function changeRailFanMode() {
  const check = document.getElementById("RailFanSwitch");
  const text = document.getElementById("RailFanSwitch-state");
  const state = check.checked ? "ON" : "OFF";
  text.textContent = state;

  document.documentElement.setAttribute("rail-fan-mode", state);
}

function setSettings(railFanMode) {
    
}


  