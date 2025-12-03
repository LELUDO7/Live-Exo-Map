//settings.js
export function initSettings() {
  let saved_fan_set = (() => {
    try {
      return localStorage.getItem("rail-fan-mode");
    } catch {
      return null;
    }
  })();

  saved_fan_set = saved_fan_set === "true";

  const check_fan = document.getElementById("RailFanSwitch");
  check_fan.checked = saved_fan_set;

  setSettings(saved_fan_set || 0);
  document.querySelectorAll(".setting-btn").forEach((btn) => {
    btn.addEventListener("click", () => openSettingsMenu());
  });

  document
    .getElementById("closeSet")
    .addEventListener("click", closeSettingsMenu);
  document
    .getElementById("RailFanSwitch")
    .addEventListener("change", changeSetting);
}

export function openSettingsMenu() {
  document.getElementById("settings-overlay").style.display = "flex";
}

export function closeSettingsMenu() {
  document.getElementById("settings-overlay").style.display = "none";
}

export function changeSetting() {
  const check_fan = document.getElementById("RailFanSwitch");

  setSettings(check_fan.checked);
}

export function setSettings(railFanMode) {
  if (railFanMode) {
    document.querySelectorAll(".rail-fan-element-table").forEach((el) => {
      el.style.display = "table";
    });
    document.querySelectorAll(".rail-fan-element-block").forEach((el) => {
      el.style.display = "flex";
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
