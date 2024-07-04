import atlas from "@/data/atlas.geo.json";
import geometries from "@/data/geometriesExtraction.json";
import type { GEOJson } from "@/types";
import { markersToShow } from "@/constants";

declare var L: any;

const languages = {
  en: {
    hover: "Hover over a country",
    countryInfo: "Country information",
    name: "Name",
    continent: "Continent",
    subregion: "Subregion",
    homePopupText: "I'm currently living here",
		travellingPopupText: "I'm traveling here",
  },
  es: {
    hover: "Pasa el ratón sobre un país",
    countryInfo: "Información del país",
    name: "Nombre",
    continent: "Continente",
    subregion: "Subregión",
    homePopupText: "Actualmente vivo aquí",
		travellingPopupText: "Estoy viajando aquí",
  },
}

const translate = (key: keyof typeof languages["en"]) => languages[document.documentElement.lang][key]

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

export const resetHighlight = (e, info, geojson) => {
  const div = document.querySelector("div.info.legend") as HTMLDivElement;
  const filterActive = Number(div.dataset.filterActive);
    geojson.resetStyle(e.target);
    if (filterActive !== -1) {
      // iterate in the geojson layers. If the layer is not the same as the one hovered, set opacity to 0.1
      geojson.eachLayer((layer) => {

        if (layer.feature.properties.visited !== filterActive) {
          layer.setStyle({
            fillOpacity: 0.1,
          });
        } else {
          layer.setStyle({
            fillOpacity: 0.7,
          });
        }
      });
    }

    info.update();
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

export const addHouseMarker = (L, map, houseIcon) => L.marker(markersToShow.livingIn, { icon: houseIcon })
  .addTo(map)
  .bindPopup(translate("homePopupText"));

export const addTravellingMarker = (L, map, houseMarker, planeIcon) => {
  if (markersToShow.travellingTo.length !== 0) {
    const planeMarker = L.marker(markersToShow.travellingTo, {
      icon: planeIcon,
    })
      .addTo(map)
      .bindPopup(translate("travellingPopupText"));

    var latlngs = Array();

    //Get latlng from first marker
    latlngs.push(houseMarker.getLatLng());

    //Get latlng from first marker
    latlngs.push(planeMarker.getLatLng());

    //You can just keep adding markers

    //From documentation http://leafletjs.com/reference.html#polyline
    // create a red polyline from an arrays of LatLng points
    // var polyline = L.polyline(latlngs, { color: "red" }).addTo(map);

    // zoom the map to the polyline
    // map.fitBounds(polyline.getBounds());

    //https:github.com/bbecquet/Leaflet.PolylineDecorator
    var pathPattern = L.polylineDecorator(
      [houseMarker.getLatLng(), planeMarker.getLatLng()],
      {
        patterns: [
          {
            offset: 0,
            repeat: 10,
            symbol: L.Symbol.dash({
              pixelSize: 5,
              pathOptions: {
                color: "#000",
                weight: 3,
                opacity: 0.5,
              },
            }),
          },
          {
            offset: "16%",
            repeat: "33%",
            symbol: L.Symbol.marker({
              rotate: true,
              markerOptions: {
                icon: L.icon({
                  iconUrl: "/plane.png",
                  iconAnchor: [16, 16],
                  iconSize: [32, 32],
                }),
              },
            }),
          },
        ],
      },
    ).addTo(map);
  }
}

export function onAdd(map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
}

export function update(props) {
  if (!props) {
    const contents = translate("hover");
    this._div.innerHTML = contents;
  } else {
    // get the language of the user using js
    var userLang = document.documentElement.lang;

    const enName = props?.name || "N/A";
    const esName = props?.name_es || "N/A";
    const name = userLang === "en" ? enName : esName;

    const enContinent = props?.continent || "N/A";
    const esContinent = props?.continent_es || "N/A";
    const continent = userLang === "en" ? enContinent : esContinent;

    const enSubregion = props?.subregion || "N/A";
    const esSubregion = props?.subregion_es || "N/A";
    const subregion = userLang === "en" ? enSubregion : esSubregion;

    this._div.innerHTML = `
      <h4>${translate('countryInfo')}</h4>
      <p class="text country-name">${translate('name')}: ${name}</p>
      <p class="text text">${translate('continent')}: ${continent}</p>
      <p class="text">${translate('subregion')}: ${subregion}</p>
    `;
  }
}