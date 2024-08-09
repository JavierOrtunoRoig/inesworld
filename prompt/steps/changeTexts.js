import { select, text, log } from '@clack/prompts';
import { yesNoOptions } from '../conts.js';

/**
 * Search for texts that contain the desired text
 * 
 * @param {string} desiredLanguage - The language of the desired text
 * @param {object} desiredDictionary - The dictionary of the desired language
 * 
 * @returns {array} - An array of objects with the keys that match the desired text and their values
 */
export const searchTexts = async (desiredLanguage, desiredDictionary) => {
  const desiredText = await text({
    message: '¿Podrías escribir parte del texto actual que quieres cambiar? Ya sea una palabra o una frase:',
    hint: `Por ejemplo: "Hey, it's Ines"`,
  });

  log.info(`Buscando textos que contengan "${desiredText}" en el idioma '${desiredLanguage}'...`);

  // get an array of object with the keys that match the desired text and their values
  const matchingTexts = Object.keys(desiredDictionary).filter(key => desiredDictionary[key].toLowerCase().includes(desiredText.toLowerCase())).map(key => ({ key, value: desiredDictionary[key] }));

  if (matchingTexts.length === 0) {
    log.error('No se han encontrado textos que coincidan con la búsqueda');
    outro('Vuelve a iniciar el programa para intentarlo de nuevo');
    process.exit(1);
  }

  return matchingTexts;
};

/**
 * Choose the text to change
 * 
 * @param {array} matchingTexts - An array of objects with the keys that match the desired text and their values
 * 
 * @returns {string} - The key of the text
 */
export const chooseText = async (matchingTexts) => {
  return await select({
    message: 'Elige el texto que quieres cambiar',
    options: matchingTexts.map(text => ({ value: text.key, label: text.value })),
  });
};

/**
 * Write the new texts
 * 
 * @param {string} selectedKey - The key of the selected text
 * @param {object} desiredDictionary - The dictionary of the desired language
 * @param {object} notDesiredDictionary - The dictionary of the not desired language
 * @param {string} desiredLanguage - The desired language
 * @param {string} notDesiredLanguage - The not desired language
 * 
 * @returns {object} - An object with the new traduction, if the other language will be updated and the new traduction in the other language
 */

export const writeNewTexts = async (selectedKey, desiredDictionary, notDesiredDictionary, desiredLanguage, notDesiredLanguage) => {
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
    log.info(`Además, vas a cambiar el texto:`);
    log.info(`"${notDesiredDictionary[selectedKey]}"`);

    log.info(`Por:`);

    log.info(`"${newTraductionInOtherLanguage}"`);

    log.info(`En el idioma ${notDesiredLanguage}`);
  }

  return {newTraduction, updateOtherLanguage, newTraductionInOtherLanguage};
}

/**
 * Confirm the changes
 * 
 * @param {object} desiredDictionary - The dictionary of the desired language
 * @param {object} notDesiredDictionary - The dictionary of the not desired language
 * @param {string} selectedKey - The key of the selected text
 * @param {string} newTraduction - The new traduction
 * @param {string} updateOtherLanguage - If the other language will be updated
 * @param {string} newTraductionInOtherLanguage - The new traduction in the other language
 * 
 */
export const confirmChanges = async (desiredDictionary, notDesiredDictionary, selectedKey, newTraduction, updateOtherLanguage, newTraductionInOtherLanguage) => {
  const confirmChanges = await select({
    message: '¿Quieres aplicar estos cambios?',
    options: yesNoOptions, newTraductionInOtherLanguage,
  });

  if (confirmChanges === 'yes') {
    desiredDictionary[selectedKey] = newTraduction;

    if (updateOtherLanguage === 'yes') {
      notDesiredDictionary[selectedKey] = newTraductionInOtherLanguage;
    }

  } else {
    log.error('Cambios cancelados');
  }
}