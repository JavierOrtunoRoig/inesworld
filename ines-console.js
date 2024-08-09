import fs from 'fs';

import trips from './src/constants/trips.json' assert { type: 'json' };

import { log, text } from '@clack/prompts';

import path from 'path';
import { exec } from 'child_process';
import { copyFile, readFile, writeFile } from './prompt/files.js';
import { main } from './prompt/steps/mainProcess.js';
import { getLanguages, getDictionaries } from './prompt/helpers.js';
import { searchTexts, chooseText, writeNewTexts, confirmChanges } from './prompt/steps/changeTexts.js';
import { addPhotosToPortfolio, choosePortfolio } from './prompt/steps/newPhotoPortfolio.js';

main();

export async function cambiarTexto() {

  log.info('Vamos a cambiar el texto de la web. Para esto primero necesito saber qué texto quieres cambiar. Voy a buscar entre todos los textos de la web');

  
  const { desiredLanguage, notDesiredLanguage } = await getLanguages();
  const { desiredDictionary, notDesiredDictionary } = await getDictionaries(desiredLanguage);

  const matchingTexts = await searchTexts(desiredLanguage, desiredDictionary);

  // show a select with the matching texts
  const selectedKey = await chooseText(matchingTexts);

  const {newTraduction, updateOtherLanguage, newTraductionInOtherLanguage} = await writeNewTexts(selectedKey, desiredDictionary, notDesiredDictionary, desiredLanguage, notDesiredLanguage);
  
  await confirmChanges(desiredDictionary, notDesiredDictionary, selectedKey, newTraduction, updateOtherLanguage, newTraductionInOtherLanguage);

  // save the changes overwriting the file
  const dictionaryPath = desiredLanguage === 'en' ? './src/en.json' : './src/es.json';

  writeFile(dictionaryPath, desiredDictionary);

  if (updateOtherLanguage === 'yes') {
    const otherLanguageDictionaryPath = notDesiredLanguage === 'en' ? './src/en.json' : './src/es.json';

    writeFile(otherLanguageDictionaryPath, notDesiredDictionary);
  }

  log.success('Cambios guardados con éxito');

  log.info('Intentando subir los cambios de la web...');

}

export async function addPortfolioPhotos() {

  // check filenames in the folder ./content/gallery with sync approach
  const portfolioPath = './src/content/gallery';
  const assetsPath = './src/assets/trips';
  const galleryFiles = fs.readdirSync(portfolioPath);

  // show the files in the folder
  const portfolio = await choosePortfolio(galleryFiles);
  
  const folderPortfolio = path.basename(portfolio, '.json');
  log.info(`Has seleccionado el portfolio ${folderPortfolio}`);

  // ask for the path of the photos
  const photosPath = await text({
    message: 'Introduce la ruta de las fotos que quieres añadir, separadas por comas',
    hint: 'Por ejemplo: c/path/to/photo1.jpg, c/path/to/photo2.jpg',
  });

  const photos = photosPath.split(',').map(photo => photo.trim());

  photos.forEach(photo => {
    copyFile(photo, `${assetsPath}/${folderPortfolio}/${path.basename(photo)}`);
  });

  const portfolioData = await addPhotosToPortfolio(photos, portfolioPath, portfolio, assetsPath, folderPortfolio);

  writeFile(`${portfolioPath}/${portfolio}`, portfolioData);

}

export async function addNewPortfolio() {
  
  const portfolioPath = './src/content/gallery';
  const assetsPath = './src/assets/trips';

  log.info('Vamos a añadir un nuevo portfolio a la web. Dime el nombre del nuevo portfolio');

  const newPortfolio = await text({
    message: 'Introduce el nombre del nuevo portfolio',
    hint: 'Por ejemplo: newPortfolio',
  });

  const newPortfolioPath = `${portfolioPath}/${newPortfolio}.json`;

  // ask for the path of the photos
  const photosPath = await text({
    message: 'Introduce la ruta de las fotos que quieres añadir, separadas por comas',
    hint: 'Por ejemplo: c/path/to/photo1.jpg, c/path/to/photo2.jpg',
  });

  // create folder for the new portfolio
  fs.mkdirSync(`${assetsPath}/${newPortfolio}`, {recursive: true});

  const photos = photosPath.split(',').map(photo => photo.trim());

  photos.forEach(photo => {
    copyFile(photo, `${assetsPath}/${newPortfolio}/${path.basename(photo)}`);
  });
  // D:\Users\Javier\Downloads\ines.jpg
  
  const portfolioData = {
    title: newPortfolio,
    photos: [],
  }

  photos.forEach(photo => {
    let finalPath = `${assetsPath}/${newPortfolio}/${path.basename(photo)}`;
    if (finalPath.at(0) === '.') {
      finalPath = finalPath.slice(1);
    }
    
    portfolioData.photos.push({
      place: '',
      description: '',
      path: finalPath,
    });
  });


  writeFile(`${newPortfolioPath}`, portfolioData);

  const title = newPortfolio.charAt(0).toUpperCase() + newPortfolio.slice(1);

  let newTrips = [...trips];
  newTrips.push({
    title,
    link: `/trip/${newPortfolio}`,
    "alt": ""
  });

  writeFile('./src/constants/trips.json', newTrips);

  const titleImage = title + "Image"; 
  const photo = path.basename(photosPath);
  const index = newTrips.length - 1;


  let page = readFile('./src/pages/portfolio.astro')
  let lines = page.split(/\r?\n/)

  let firstDelimiterIndex = lines.indexOf('---');
  if (firstDelimiterIndex !== -1) {
    lines.splice(firstDelimiterIndex + 1, 0, `import ${titleImage} from "@/assets/trips/${newPortfolio}/${photo}"`);
  }

  let returnStatementIndex = lines.findIndex(line => line.includes('\treturn SwitzerlandImage;'));
  if (returnStatementIndex !== -1) {
    lines.splice(returnStatementIndex, 0, `\tif (index === ${index}) return ${titleImage};`);
  }

  // Unir las líneas nuevamente en una cadena, respetando los saltos de línea
  const newData = lines.join('\n');

  fs.writeFileSync('./src/pages/portfolio.astro', newData, 'utf8');
}

export async function cancelProgram() {
  log.info('Saliendo del programa...');
  process.exit(0);
}

export async function subirCambios() {
  log.info('Intentando subir los cambios de la web...');

  try {
    exec('git add . && git commit -m "Ines has update the web" && git push', (error, stdout, stderr) => {
      if (error) {
        log.error('No se ha podido subir los cambios a la web');
        log.error('Por favor, contáctame para poder solucionar el problema');
        log.error(error.message);
        return;
      }
      
      log.success('Cambios subidos a la web con éxito');
    });
  } catch (error) {
    log.error('No se ha podido subir los cambios a la web');
    log.error('Por favor, contáctame para poder solucionar el problema');
    log.error(error.message);
  }
}