const map = L.map("realBoard").setView([45.5, -73.6], 10);
const GLOBAL_COLOR = "#0a689e";

const markersLayer = L.layerGroup().addTo(map);
const panel = document.getElementById("realMap-train-panel");

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
  document.getElementById(
    "realMap-train-panel-title"
  ).textContent = `Train ${train.trip_short_name}`;

  document.getElementById(
    "realMap-train-panel-direction"
  ).textContent = `${train.trip_headsign}`;

  document.getElementById(
    "realMap-train-panel-occupancy"
  ).textContent = `${train.occupancyStatus}`;

  removePanleLineClass();

  panel.classList.remove("hidden");
  panel.classList.add("open");

  panel.classList.add(`line-${train.line}`);
}

document.querySelector(".panel-close").addEventListener("click", () => {
  panel.classList.remove("open");
  setTimeout(() => panel.classList.add("hidden"), 300);
});

function removePanleLineClass() {
  panel.classList.remove("line-1");
  panel.classList.remove("line-3");
  panel.classList.remove("line-4");
  panel.classList.remove("line-5");
  panel.classList.remove("line-6");
}
