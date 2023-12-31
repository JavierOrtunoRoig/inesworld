import cities from "./data/cities.json"
import { destinations } from "./data/destinations";

// Declaración de las letantes de la librería "amcharts"
declare let am5, am5themes_Animated, am5map, am5geodata_worldHigh: any;

am5.ready(function () {
  // Crear el elemento raíz (root) del gráfico en el div con id "chartdiv"
  let root = am5.Root.new("chartdiv");
  let geoMapConfig = {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoOrthographic(),
  };
  let switchcontainerConfig = {
    layout: root.horizontalLayout,
    x: 20,
    y: 40,
  };
  let globeLabelSwitchConfig = {
    text: "Globe",
    centerY: am5.p50,
  };
  let mapLabelSwitchConfig = {
    text: "Map",
    centerY: am5.p50,
  };
  let switchConfig = {
    themeTags: ["switch"],
    centerY: am5.p50,
    icon: am5.Circle.new(root, {
      themeTags: ["icon"],
    }),
  };

  // Configurar temas (themes) para el gráfico
  root.setThemes([am5themes_Animated.new(root)]);

  let chart = createMapChart(root, geoMapConfig);
  let cont = createSwitchContainer();
  let switchButton = addSwitchButton(chart);
  handleSwitchButton(chart, switchButton);
  let polygonSeries = createPolygonSeries(chart);
  createGraticuleSeries
  let lineSeries = createLineSeries(chart);
  let animatedLineSeries = createAnimatedLineSeries(chart);
  let citySeries = createCitySeries(chart);

  // Añadir ciudades al mapa con colores según su propiedad "visited"
  addCitiesToMap(citySeries);
  const animatedBulletSeries = createAnimatedBulletSeries(chart);

  // Datos de las ciudades
  citySeries.data.setAll(cities);

  // Obtener el objeto de datos para Londres
  let londonDataItem = citySeries.getDataItemById("madrid");

  // Realizar todas las animaciones
  am5.array.each(destinations, (did) => addAnimations(did));

  // Evento al validar los datos de los polígonos, hace un zoom a una ubicación específica
  polygonSeries.events.on("datavalidated", function () {
    chart.zoomToGeoPoint(
      {
        longitude: -0.1262,
        latitude: 51.5002,
      },
      3,
    );
  });

  // Hacer que las animaciones ocurran al cargar la página
  chart.appear(1000, 100);



  /**
   * Crear el gráfico de mapa 
   */
  function createMapChart(root, geoMapConfig) {
    return root.container.children.push(
      am5map.MapChart.new(root, geoMapConfig)
    );
  }

  /**
   * Crear contenedor para etiquetas y controles (switch)
   */
  function createSwitchContainer() {
    return chart.children.push(
      am5.Container.new(root, switchcontainerConfig)
    );
  }

  /**
   * Añadir botón de switch (cambio entre Globe y Map)
   */
  function addSwitchButton(chart) {
    cont.children.push(
      am5.Label.new(root, globeLabelSwitchConfig)
    );

    let switchButton = cont.children.push(
      am5.Button.new(root, switchConfig)
    );

    cont.children.push(
      am5.Label.new(root, mapLabelSwitchConfig)
    );

    return switchButton;
  }

  /**
   * Manejar evento de cambio en el botón de switch (cambio entre Globe y Map)
   */
  function handleSwitchButton(chart, switchButton) {
    switchButton.on("active", function () {
      if (switchButton.get("active")) {
        chart.set("projection", am5map.geoMercator());
        chart.set("panX", "translateX");
        chart.set("panY", "translateY");
      } else {
        chart.set("projection", am5map.geoOrthographic());
        chart.set("panX", "rotateX");
        chart.set("panY", "rotateY");
      }
    });
  }

  /**
   * Crear serie principal de polígonos para los países (Dibuja las fronteras de los países)
   */
  function createPolygonSeries(chart) {
    return chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldHigh,
    }));
  }

  /**
   * Crear serie de graticule (líneas de latitud y longitud)
   */
  function createGraticuleSeries(chart) {
    const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get("alternativeBackground"),
      strokeOpacity: 0.08,
    });
  }

  /**
   * Crear serie de líneas para las trayectorias
   */
  function createLineSeries(chart) {
    const lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get("alternativeBackground"),
      strokeOpacity: 0,
    });
    return lineSeries;
  }
  
  /**
   * Crear serie de líneas animadas que conectarán puntos
   */
  function createAnimatedLineSeries(chart) {
    const animatedLineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    animatedLineSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get("alternativeBackground"),
      strokeOpacity: 0.6,
    });
    return animatedLineSeries;
  }

  /**
   * Crear serie de puntos para las ciudades
   */
  function createCitySeries(chart) {
    return chart.series.push(am5map.MapPointSeries.new(root, {}));
  }

  /**
   * Función para añadir ciudades al mapa con colores según su propiedad "visited"
   */
  function addCitiesToMap(citySeries) {
    citySeries.bullets.push(function (_bullet, _target, data) {
      let city = data.dataContext;
      let visitedColor = am5.color(0x40cc00); // Verde para visitadas
      let notVisitedColor = am5.color(0xc7b162); // Otro color para no visitadas
      let circleConfig = {
        radius: 5,
        tooltipText: "{title}",
        tooltipY: 0,
        fill: city.visited ? visitedColor : notVisitedColor,
        stroke: root.interfaceColors.get("background"),
        strokeWidth: 2,
      };
      let bulletConfig = {
        sprite: am5.Circle.new(root, circleConfig),
      };

      // Crear círculo en la posición de la ciudad
      am5.Circle.new(root, circleConfig);

      return am5.Bullet.new(root, bulletConfig);
    });
  }

  /**
   * Serie invisible que animará a lo largo de líneas invisibles
   */
  function createAnimatedBulletSeries(chart) {
    const animatedBulletSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    animatedBulletSeries.bullets.push(function () {
      const circle = am5.Circle.new(root, {
        radius: 0,
      });
  
      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });
    return animatedBulletSeries;
  }

  function addAnimations(did) {
    let destinationDataItem = citySeries.getDataItemById(did);
    let lineDataItem = lineSeries.pushDataItem({});
    lineDataItem.set("pointsToConnect", [
      londonDataItem,
      destinationDataItem,
    ]);

    let startDataItem = animatedBulletSeries.pushDataItem({});
    startDataItem.setAll({
      lineDataItem: lineDataItem,
      positionOnLine: 0,
    });

    let endDataItem = animatedBulletSeries.pushDataItem({});
    endDataItem.setAll({
      lineDataItem: lineDataItem,
      positionOnLine: 1,
    });

    let animatedLineDataItem = animatedLineSeries.pushDataItem({});
    animatedLineDataItem.set("pointsToConnect", [startDataItem, endDataItem]);

    let lon0 = londonDataItem.get("longitude");
    let lat0 = londonDataItem.get("latitude");

    let lon1 = destinationDataItem.get("longitude");
    let lat1 = destinationDataItem.get("latitude");

    let distance = Math.hypot(lon1 - lon0, lat1 - lat0);
    let duration = distance * 100;

    animateStart(startDataItem, endDataItem, duration);
    addPlane(lineDataItem);
    
  }

  // Función para animar el inicio de la línea
  function animateStart(startDataItem, endDataItem, duration) {
    let startAnimation = startDataItem.animate({
      key: "positionOnLine",
      from: 0,
      to: 1,
      duration: duration,
    });

    startAnimation.events.on("stopped", function () {
      animateEnd(startDataItem, endDataItem, duration);
    });
  }

  // Función para animar el final de la línea
  function animateEnd(startDataItem, endDataItem, duration) {
    startDataItem.set("positionOnLine", 0);
    let endAnimation = endDataItem.animate({
      key: "positionOnLine",
      from: 0,
      to: 1,
      duration: duration,
    });

    endAnimation.events.on("stopped", function () {
      animateStart(startDataItem, endDataItem, duration);
    });
  }

  function addPlane(lineDataItem) {
    let planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    let plane = am5.Graphics.new(root, {
      svgPath:
        "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
      scale: 0.04,
      centerY: am5.p50,
      centerX: am5.p50,
      fill: am5.color(0x000000)
    });

    planeSeries.bullets.push(function () {
      let container = am5.Container.new(root, {});
      container.children.push(plane);
      return am5.Bullet.new(root, { sprite: container });
    });


    let planeDataItem = planeSeries.pushDataItem({
      lineDataItem: lineDataItem,
      positionOnLine: 0,
      autoRotate: true
    });
    planeDataItem.dataContext = {};

    planeDataItem.animate({
      key: "positionOnLine",
      to: 1,
      duration: 10000,
      loops: Infinity,
      easing: am5.ease.yoyo(am5.ease.linear)
    });

    planeDataItem.on("positionOnLine", (value) => {
      if (planeDataItem.dataContext.prevPosition < value) {
        plane.set("rotation", 0);
      }

      if (planeDataItem.dataContext.prevPosition > value) {
        plane.set("rotation", -180);
      }
      planeDataItem.dataContext.prevPosition = value;
    });
  }
});
