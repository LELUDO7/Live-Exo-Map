//settings.js
function initSettings() {
  let saved = (() => {
    try {
      return localStorage.getItem("rail-fan-mode");
    } catch {
      return null;
    }
  })();

  saved = (saved === "true")

  const check = document.getElementById("RailFanSwitch");
  check.checked = saved;

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

  setSettings(check.checked);
}

function setSettings(railFanMode) {
  if (railFanMode) {
    document.querySelectorAll(".rail-fan-element-table").forEach((el) => {
      el.style.display = "table";
    });
    document.querySelectorAll(".rail-fan-element-block").forEach((el) => {
      el.style.display = "block";
    });
  } else {
    document.querySelectorAll(".rail-fan-element-table").forEach((el) => {
      el.style.display = "none";
    });
     document.querySelectorAll(".rail-fan-element-block").forEach((el) => {
       el.style.display = "none";
     });
  }

  
  try {
    localStorage.setItem("rail-fan-mode", railFanMode);
  } catch {}
}
