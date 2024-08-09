import { log, outro, select, text } from '@clack/prompts';

import path from 'path';
import { exec } from 'child_process';
import { readFile, writeFile } from './prompt/files.js';
import { main } from './prompt/steps/mainProcess.js';
import { getLanguages, getDictionaries, searchTexts } from './prompt/helpers.js';

main();

export async function cambiarTexto() {

  log.info('Vamos a cambiar el texto de la web. Para esto primero necesito saber qué texto quieres cambiar. Voy a buscar entre todos los textos de la web');

  
  const { desiredLanguage, notDesiredLanguage } = await getLanguages();
  const { desiredDictionary, notDesiredDictionary } = await getDictionaries(desiredLanguage);

  const desiredText = await searchTexts();

  // get an array of object with the keys that match the desired text and their values
  const matchingTexts = Object.keys(desiredDictionary).filter(key => desiredDictionary[key].toLowerCase().includes(desiredText.toLowerCase())).map(key => ({ key, value: desiredDictionary[key] }));

  if (matchingTexts.length === 0) {
    log.error('No se han encontrado textos que coincidan con la búsqueda');
    outro('Vuelve a iniciar el programa para intentarlo de nuevo');
    process.exit(1);
  }

  // show a select with the matching texts
  const selectedKey = await select({
    message: 'Elige el texto que quieres cambiar',
    options: matchingTexts.map(text => ({ value: text.key, label: text.value })),
  });

  const newTraduction = await text({
    message: 'Escribe el nuevo texto:',
  });

  let newTraductionInOtherLanguage = '';

  const updateOtherLanguage = await select({
    message: `¿Quieres proporcionar el nuevo texto para el idioma '${notDesiredLanguage}'?`,
    options: yesNoOptions,
  });

  if (updateOtherLanguage === 'yes') {
    newTraductionInOtherLanguage = await text({
      message: `Escribe el texto para '${notDesiredLanguage}':`,
    });
  }

  log.message('Vas a cambiar el siguiente texto:');
  log.message(`"${desiredDictionary[selectedKey]}"`);
  log.message('Por:');
  log.message(`"${newTraduction}"`);
  log.message(`En el idioma '${desiredLanguage}'`);

  if (updateOtherLanguage === 'yes') {
    log.info(`Además, vas a cambiar el texto "${desiredDictionary[selectedKey]}" por "${newTraductionInOtherLanguage}" en el idioma ${notDesiredLanguage}`);
  }

  const confirmChanges = await select({
    message: '¿Quieres aplicar estos cambios?',
    options: yesNoOptions,
  });

  if (confirmChanges === 'yes') {
    desiredDictionary[selectedKey] = newTraduction;

    if (updateOtherLanguage === 'yes') {
      notDesiredDictionary[selectedKey] = newTraductionInOtherLanguage;
    }

  } else {
    log.error('Cambios cancelados');
  }

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
  const galleryFiles = readFile(portfolioPath);

  // show the files in the folder
  const portfolio = await select({
    message: 'Selecciona a qué portfolio quieres añadir fotos',
    options: galleryFiles.map(file => ({ value: file, label: file })),
  });
  
  log.info(`Has seleccionado el portfolio ${portfolio}`);
  const folderPortfolio = path.basename(portfolio, '.json');

  // ask for the path of the photos

  const photosPath = await text({
    message: 'Introduce la ruta de las fotos que quieres añadir, separadas por comas',
    hint: 'Por ejemplo: c/path/to/photo1.jpg, c/path/to/photo2.jpg',
  });

  const photos = photosPath.split(',').map(photo => photo.trim());

  photos.forEach(photo => {
    copyFile(photo, `${assetsPath}/${folderPortfolio}/${path.basename(photo)}`);
  });

  // add the photos to the portfolio file
  const portfolioFile = readFile(`${portfolioPath}/${portfolio}`);
  const portfolioData = JSON.parse(portfolioFile);

  photos.forEach(photo => {
    let finalPath = `${assetsPath}/${folderPortfolio}/${path.basename(photo)}`;
    if (finalPath.at(0) === '.') {
      finalPath = finalPath.slice(1);
    }
    
    portfolioData.photos.push({
      place: '',
      description: '',
      path: finalPath,
    });
  });

  writeFile(`${portfolioPath}/${portfolio}`, portfolioData);

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