
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

renderMap();
refreshStatuses();
refreshStatusesR()
setInterval(refreshStatuses, CONFIG.INTERVAL_MS);
setInterval(refreshStatusesR, CONFIG.INTERVAL_MS);
initLanguage();
initSettings();
