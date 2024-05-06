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
      });
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

export function zoomToFeature(e, map) {
  map.fitBounds(e.target.getBounds());
}