import geojson from './src/data/atlas.geo.json' assert { type: 'json' };
import fs from 'fs';

const continentsTraductions = {
  'North America': "América del norte",
  'Asia': "Asia",
  'South America': "Sudamerica",
  'Africa': "África",
  'Europe': "Europa",
  'Oceania': "Oceanía",
  'Antarctica': "Antártida",
  'Seven seas (open ocean)': "Siete mares (océano abierto)",
}

const subRegionsTraductions = {
  'Central America': "Centroamérica",
  'Caribbean': "Caribe",
  'Northern America': "América del Norte",
  'South-Eastern Asia': "Asia sudoriental",
  'Western Asia': "Asia occidental",
  'Southern Asia': "Asia meridional",
  'Eastern Asia': "Asia oriental",
  'Central Asia': "Asia central",
  'Seven seas (open ocean)': "Siete mares (océano abierto)",
  'South America': "Sudamérica",
  'Eastern Africa': "África oriental",
  'Northern Africa': "África del norte",
  'Middle Africa': "África central",
  'Southern Africa': "África del sur",
  'Western Africa': "África occidental",
  'Western Europe': "Europa occidental",
  'Eastern Europe': "Europa oriental",
  'Northern Europe': "Europa del norte",
  'Southern Europe': "Europa del sur",
  'Melanesia': "Melanesia",
  'Australia and New Zealand': "Australia y Nueva Zelanda",
  'Polynesia': "Polinesia",
  'Micronesia': "Micronesia",
  'Antarctica': "Antártida",
}

const getAllDifferentsContinents = () => {
  const continents = geojson.features.map(f => f.properties.continent);
  const continentsSet = new Set(continents);

  console.log({ continentsSet });
}

const getAllDifferentsSubRegions = () => {
  const subRegions = geojson.features.map(f => f.properties.subregion);
  const subRegionsSet = new Set(subRegions);
  
  console.log({ subRegionsSet });
}

const getContinentTraduction = (continent) => {
  return continentsTraductions[continent];
}

const addContinentsTraduction = () => {
  geojson.features.forEach(f => {
    f.properties["continent_es"] = getContinentTraduction(f.properties.continent);
  });

  fs.writeFileSync('./src/data/atlas.geo.json',  JSON.stringify(geojson, null, 2));
}

const addSubRegionsTraduction = () => {
  geojson.features.forEach(f => {
    f.properties["subregion_es"] = subRegionsTraductions[f.properties.subregion];
  });

  fs.writeFileSync('./src/data/atlas.geo.json',  JSON.stringify(geojson, null, 2));
}

// addContinentsTraduction();
addSubRegionsTraduction();