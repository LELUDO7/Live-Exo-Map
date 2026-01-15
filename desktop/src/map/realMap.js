const map = L.map("realBoard").setView([45.5, -73.6], 10);
const GLOBAL_COLOR = "#0a689e";

let geojsonLayer;

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

      // 🔴 ICI est le BON ENDROIT : fermer les labels au chargement
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

map.on("zoomend", showStationName);
