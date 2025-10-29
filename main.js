
const board = document.getElementById("board");
const dotsById = new Map();

const STATUS_CLASS = {
  stopped: "s-stopped",
  incoming: "s-incoming",
  offline: "s-offline",
  notpresent: "not_present",
  present: "present",
  error : "error"
};

const STATUS_CLASS_DISPLAY_INCOMING = {
  stopped: "notDisplay",
  incoming: "display",
  offline: "notDisplay",
};

const STATUS_CLASS_DISPLAY_STOPPED = {
  stopped: "display",
  incoming: "notDisplay",
  offline: "notDisplay",
};

const OCCUPATION_LEVEL_CLASS = {
  0: "menu.occupation.empty",
  1: "menu.occupation.manyseat",
  2: "menu.occupation.fewseat",
  3: "menu.occupation.standing",
  4: "menu.occupation.crushstanding",
  5: "menu.occupation.full",
  6: "menu.occupation.nopassanger",
};

const DOT_MENU_COLOR_CLASS = {
  1: "dot-menu-line-1",
  3: "dot-menu-line-3",
  4: "dot-menu-line-4",
  5: "dot-menu-line-5",
  6: "dot-menu-line-6",
};

const WAGON_MODEL_NAME = {
  1320: "EMD F59PHI",
  1340: "EMD F59PH",
  1350: "Bombardier ALP-45DP",
  1400: "Siemens Charger EC-42",
  700: "Bombardier Comet II",
  2000: "Bombardier BiLevel VII",
  3000: "Bombardier MultiLevel",
  2050: "CRRC",
};



renderMap();
refreshStatuses();
refreshStatusesR()
setInterval(refreshStatuses, CONFIG.INTERVAL_MS);
setInterval(refreshStatusesR, CONFIG.INTERVAL_MS);
initLanguage();
initSettings();
