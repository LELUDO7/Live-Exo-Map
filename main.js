
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

createDots();
refreshStatuses();
refreshStatusesR()
setInterval(refreshStatuses, CONFIG.INTERVAL_MS);
setInterval(refreshStatusesR, CONFIG.INTERVAL_MS);
initLanguage();
