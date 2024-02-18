import cities from "./data/cities.js"
import {
  addAnimations,
  addCitiesToMap,
  addSwitchButton,
  createAnimatedBulletSeries,
  createAnimatedLineSeries,
  createCitySeries,
  createGraticuleSeries,
  createLineSeries,
  createMapChart,
  createPolygonSeries,
  createSwitchContainer,
  handleSwitchButton,
  root
} from "./map.js";

// Declaración de las letantes de la librería "amcharts"

export const main = (o, d) => {

  am5.ready(function () {

    // Configurar temas (themes) para el gráfico
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = createMapChart(root);
    const cont = createSwitchContainer(root, chart);
    const switchButton = addSwitchButton(root, cont);
    handleSwitchButton(chart, switchButton);
    const polygonSeries = createPolygonSeries(root, chart);
    createGraticuleSeries(root, chart);
    const lineSeries = createLineSeries(root, chart);
    const animatedLineSeries = createAnimatedLineSeries(root, chart);
    const citySeries = createCitySeries(root, chart);

    // Datos de las ciudades
    const visitedCities = cities.filter((city) => city.id === "london" || city.id === "madrid");
    console.log({ visitedCities });
    citySeries.data.setAll(visitedCities);

    // Añadir ciudades al mapa con colores según su propiedad "visited"
    addCitiesToMap(root, citySeries);
    const animatedBulletSeries = createAnimatedBulletSeries(root, chart);

    // Obtener el objeto de datos para Londres
    const londonDataItem = citySeries.getDataItemById("madrid");

    // Realizar todas las animaciones
    // Necesita una array con el id de los destinos. Debe coincidir con las ciudades del archivo cities.json
    am5.array.each(['london'], (did) => addAnimations(did, citySeries, lineSeries, animatedLineSeries, animatedBulletSeries, londonDataItem, root, chart));

    // Evento al validar los datos de los polígonos, hace un zoom a una ubicación específica
    polygonSeries.events.on("datavalidated", function () {
      chart.zoomToGeoPoint(
        {
          longitude: -3.7033,
          latitude: 80.4167,
        },
        3,
      );
    });

    // Hacer que las animaciones ocurran al cargar la página
    chart.appear(1000, 100);
  });
}