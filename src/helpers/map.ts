import atlas from "@/data/atlas.geo.json";
import geometries from "@/data/geometriesExtraction.json";
import type { GEOJson } from "@/types";

// merge atlas with geometries by name
export const mergeData = (geoJson: GEOJson) => {

  atlas.features.forEach((feature) => {
    const geometry = geometries[feature.properties.name];
    if (geometry) {
      geoJson.features.push({
        ...feature,
        geometry: geometry,
      } as any);
    }
  });

  return geoJson
}

/**
 * Add a GeoJSON layer to the map. This layer will be used to display the countries. The provider is OpenStreetMap.
 */
export const addTiles = (L, map) => {
  return L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 2,
    maxZoom: 19,
    noWrap: true,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

// prevent dragging the map out of bounds
export const preventDragOutScope = (L, map) => {
  var southWest = L.latLng(-89.98155760646617, -180),
    northEast = L.latLng(89.99346179538875, 180);
  var bounds = L.latLngBounds(southWest, northEast);
  map.setMaxBounds(bounds);
  map.on("drag", function () {
    map.panInsideBounds(bounds, { animate: false });
  });
}

/**
 * Zooms the map to the bounds of the specified feature.
 * @param e - The event object.
 * @param map - The map object.
 */
export function zoomToFeature(e, map) {
  map.fitBounds(e.target.getBounds());
}

/**
 * Prevents dragging of the map beyond specified bounds.
 * @param {L} L - The Leaflet library object.
 * @param {Map} map - The Leaflet map object.
 */
export const preventMapDrag = (L, map) => {
  const southWest = L.latLng(-89.98155760646617, -180);
  const northEast = L.latLng(89.99346179538875, 180);
  const bounds = L.latLngBounds(southWest, northEast);
  map.setMaxBounds(bounds);
  map.on("drag", () => {
    map.panInsideBounds(bounds, { animate: false });
  });
};

/**
 * Returns a color based on the visited property.
 * @param {number} visited - The visited property value.
 * @returns {string} - The color in rgba format.
 */
export const getColorFromVisitedProperty = (visited) => {
  if (visited === 0) return "rgba(255, 0, 0, 0.3)";
  else if (visited === 1) return "rgba(0, 0, 255, 0.3)";
  else return "rgba(0, 255, 0, 0.3)";
}

/**
 * Returns the default GeoJSON style for a given feature.
 * @param {any} feature - The GeoJSON feature.
 * @returns {object} - The default GeoJSON style object.
 */
export const getDefaultGeoJsonStyle = (feature) => ({
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.7,
  fillColor: getColorFromVisitedProperty(feature.properties.visited),
})

/**
 * Style object for highlighting a feature on a map.
 */
const highlightFeatureStyle = {
  weight: 5,
  color: "#666",
  dashArray: "",
  fillOpacity: 0.7,
}

export const highlightFeature = (e, info) => {
  const layer = e.target;
  layer.setStyle(highlightFeatureStyle);
  layer.bringToFront();
  info.update(layer.feature.properties);
}

const ICON_SIZE = 48;
const ICON_ANCHOR = ICON_SIZE / 2; // I don't know this way

export const getIconExtendOptions = {
  options: {
    iconSize: [ICON_SIZE, ICON_SIZE],
    iconAnchor: [ICON_ANCHOR, ICON_SIZE],
    popupAnchor: [0, -ICON_SIZE],
  },
}