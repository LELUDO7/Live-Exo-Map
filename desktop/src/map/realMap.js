const map = L.map("realBoard").setView([45.5, -73.6], 10);

export function init(){

L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png"
).addTo(map);



fetch("exo_shapes.geojson")
  .then((r) => r.json())
  .then((data) => {
    L.geoJSON(data, {
      style: (feature) => ({
        color: "#990866",
        weight: 4,
        opacity: 0.9,
      }),
    }).addTo(map);
  });
}


