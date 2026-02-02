//settings.js
const api = await import("./api.js");

export function initSettings() {
  let saved_fan_set = (() => {
    try {
      return localStorage.getItem("rail-fan-mode");
    } catch {
      return null;
    }
  })();

  let saved_segment_set = (() => {
    try {
      return localStorage.getItem("rail-segment-mode");
    } catch {
      return null;
    }
  })();

  let saved_map_type = (() => {
    try {
      return localStorage.getItem("map-type");
    } catch {
      return null;
    }
  })();

  saved_fan_set = saved_fan_set === "true";
  saved_segment_set = saved_segment_set === "true";
  saved_map_type = saved_map_type === "true";

  const check_fan = document.getElementById("RailFanSwitch");
  check_fan.checked = saved_fan_set;

  const check_segment = document.getElementById("SegmentSwitch");
  check_segment.checked = saved_segment_set;

  const check_map_type = document.getElementById("MapTypeSwitch");
  check_map_type.checked = saved_map_type;

  setSettings(saved_fan_set || 0, saved_segment_set || 0, saved_map_type || 0);

  document.querySelectorAll(".setting-btn").forEach((btn) => {
    btn.addEventListener("click", () => openSettingsMenu());
  });

  document.getElementById("closeSet").addEventListener("click", closeSettingsMenu);
  document.getElementById("RailFanSwitch").addEventListener("change",changeSetting );
  document.getElementById("SegmentSwitch").addEventListener("change", changeSetting);
  document.getElementById("MapTypeSwitch").addEventListener("change", changeSetting);
}

export function openSettingsMenu() {
  document.getElementById("settings-overlay").style.display = "flex";
}

export function closeSettingsMenu() {
  document.getElementById("settings-overlay").style.display = "none";
}

export function changeSetting() {
  const check_fan = document.getElementById("RailFanSwitch");
  const check_segment = document.getElementById("SegmentSwitch");
  const check_map_type = document.getElementById("MapTypeSwitch");

  setSettings(check_fan.checked, check_segment.checked, check_map_type.checked);
}

export function setSettings(railFanMode, railSegmentmode, mapType) {
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

  if (railSegmentmode) {
    document.querySelectorAll(".rail-fan-element-segment").forEach((el) => {
      el.style.display = "flex";
    });
  } else {
    document.querySelectorAll(".rail-fan-element-segment").forEach((el) => {
      el.style.display = "none";
    });
  }

  if (mapType) {
    document.getElementById("board").style.display = "flex";
    document.getElementById("realBoard").style.display = "none";
  } else {
     document.getElementById("board").style.display = "none";
     document.getElementById("realBoard").style.display = "flex";
  }

  
  try {
    localStorage.setItem("rail-fan-mode", railFanMode);
    localStorage.setItem("map-type", mapType);
  } catch {}

   try {
     localStorage.setItem("rail-segment-mode", railSegmentmode);
   } catch {}

   api.getMovingsTrains();
}

export function getRailFanMode(){
  let saved_fan_set = (() => {
    try {
      return localStorage.getItem("rail-fan-mode");
    } catch {
      return null;
    }
  })();

  saved_fan_set = saved_fan_set === "true";

  return saved_fan_set;

}
