
const board = document.getElementById("board");
const dotsById = new Map();

const STATUS_CLASS = {
  stopped: "s-stopped",
  incoming: "s-incoming",
  offline: "s-offline"
};

createDots();
refreshStatuses();
setInterval(refreshStatuses, CONFIG.INTERVAL_MS);
initLanguage();
