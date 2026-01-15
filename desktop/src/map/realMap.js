const lang = await import("../language.js");
const map = L.map("realBoard").setView([45.5, -73.6], 10);
const GLOBAL_COLOR = "#0a689e";

const markersLayer = L.layerGroup().addTo(map);
const panel = document.getElementById("realMap-train-panel");

let panelActiveTrain;
let trainsData;

let geojsonLayer;

map.on("zoomend", showStationName);

export function init() {
  L.maptiler
    .maptilerLayer({
      apiKey: KEY.mapTilerKey,
      style:
        "https://api.maptiler.com/maps/019bbeeb-491f-7e21-9282-a107963020d7/style.json",
    })
    .addTo(map);

  fetch("/data/exo_shapes.geojson")
    .then((r) => r.json())
    .then((data) => {
      geojsonLayer = L.geoJSON(data, {
        // Line
        style: (feature) => {
          if (feature.geometry.type.includes("Line")) {
            return {
              color: GLOBAL_COLOR,
              weight: 2,
              opacity: 0.9,
            };
          }
        },

        // Station
        pointToLayer: (feature, latlng) => {
          const marker = L.circleMarker(latlng, {
            radius: 1,
            color: GLOBAL_COLOR,
            fillColor: GLOBAL_COLOR,
            fillOpacity: 1,
          });

          marker.bindTooltip(feature.properties.stop_name, {
            permanent: true,
            direction: "right",
            offset: [8, 0],
            className: "station-label",
          });

          return marker;
        },

        onEachFeature: (feature, layer) => {
          if (feature.geometry.type === "Point") {
            layer.bindPopup(`<strong>${feature.properties.stop_name}</strong>`);
          }
        },
      }).addTo(map);

      geojsonLayer.eachLayer((layer) => {
        if (layer.feature.geometry.type === "Point" && layer.getTooltip()) {
          layer.closeTooltip();
        }
      });
    });
}

function showStationName() {
  if (!geojsonLayer) return;

  const show = map.getZoom() >= 13;

  geojsonLayer.eachLayer((layer) => {
    if (layer.feature.geometry.type === "Point" && layer.getTooltip()) {
      show ? layer.openTooltip() : layer.closeTooltip();
    }
  });
}

export function displayTrains(trains) {
  trainsData = trains;
  updateTrainPanel();

  markersLayer.clearLayers();

  trains.forEach((train) => {
    const pinIcon = L.divIcon({
      className: "",
      html: `
    <div class="train-pin line-${train.line}">
      <img src="/assets/train.svg" class="train-pin-icon" />
    </div>
  `,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });

    L.marker([train.position.latitude, train.position.longitude], {
      icon: pinIcon,
    })
      .addTo(markersLayer)
      .bindTooltip(`<strong>Train ${train.trip_short_name}</strong><br>`, {
        direction: "top",
        className: "train-tooltip",
        sticky: true,
      })
      .on("click", () => {
        openTrainPanel(train);
      });
  });
}

function openTrainPanel(train) {
  panelActiveTrain = train;

  updateTrainPanel();

  panel.classList.remove("hidden");
  panel.classList.add("open");

  lang.initLanguage();
}

document
  .querySelector(".realMap-train-panel-close")
  .addEventListener("click", () => {
    panel.classList.remove("open");
    setTimeout(() => panel.classList.add("hidden"), 300);
  });

function removePanelLineClass() {
  panel.classList.remove("line-1");
  panel.classList.remove("line-3");
  panel.classList.remove("line-4");
  panel.classList.remove("line-5");
  panel.classList.remove("line-6");
}

function updateTrainPanel() {
  if (panelActiveTrain) {
    trainsData.forEach((train) => {
      if (train.trip_short_name == panelActiveTrain.trip_short_name) {
        panelActiveTrain = train;
      }
    });

    removePanelLineClass();

    panel.classList.add(`line-${panelActiveTrain.line}`);

    document.getElementById(
      "realMap-train-panel-title"
    ).textContent = `Train ${panelActiveTrain.trip_short_name}`;

    document.getElementById(
      "realMap-train-panel-direction"
    ).textContent = `${panelActiveTrain.trip_headsign}`;

    document
      .getElementById("realMap-train-panel-occupancy")
      .setAttribute(
        "data-i18n",
        OCCUPATION_LEVEL_CLASS[panelActiveTrain.occupancyStatus]
      );

    document.getElementById("realMap-train-panel-line").textContent = `${
      LINE_NAME[panelActiveTrain.line]
    }`;

    if (panelActiveTrain.train_details) {
      document.getElementById("realMap-train-panel-advance-info").className =
        "";
      document.getElementById("realMap-train-panel-speed").textContent = `${(
        panelActiveTrain.train_details.speed * 3.6
      ).toFixed(2)} km/h`;

      document.getElementById(
        "realMap-train-panel-latitude"
      ).textContent = `${panelActiveTrain.position.latitude.toFixed(2)} degrés`;

      document.getElementById(
        "realMap-train-panel-longitude"
      ).textContent = `${panelActiveTrain.position.longitude.toFixed(
        2
      )} degrés`;
    } else {
      document.getElementById("realMap-train-panel-advance-info").className =
        "hidden";
    }
  }
}

const OCCUPATION_LEVEL_CLASS = {
  0: "menu.occupation.empty",
  1: "menu.occupation.manyseat",
  2: "menu.occupation.fewseat",
  3: "menu.occupation.standing",
  4: "menu.occupation.crushstanding",
  5: "menu.occupation.full",
  6: "menu.occupation.nopassanger",
};

const LINE_NAME = {
  1: "11 (Vaudreuil)",
  3: "13 (Mont-Saint-Hilaire)",
  4: "12 (Saint-Jérôme)",
  5: "14 (Candiac)",
  6: "15 (Mascouche)",
};
