import { intro, log, outro, select, text,  } from '@clack/prompts';
import en from './src/en.json' assert { type: 'json' };
import es from './src/es.json' assert { type: 'json' };
import fs from 'fs';

const actions = {
  cambiarTexto,
}


intro(`¡Hey, it's Javi! Este es el panel de administración de InesWorld. ¿En qué puedo ayudarte?`);

const projectType = await select({
  message: 'Elige la acción que quieras realizar',
  options: [
    {
      value: 'cambiarTexto',
      label: 'Cambiar textos',
      hint: 'Actualiza los textos de la web',
    },
  ],
});

await actions[projectType]();


outro(`Enohorabuena, has actulizado la web de InesWorld. ¡A seguir creando, hasta la próxima!`);


async function cambiarTexto() {

  log.info('Vamos a cambiar el texto de la web. Para esto primero necesito saber qué texto quieres cambiar. Voy a buscar entre todos los textos de la web');

  const desiredLanguage = await select({
    message: '¿En qué idioma quieres buscar el texto?',
    options: [
      {
        value: 'en',
        label: 'Inglés',
      },
      {
        value: 'es',
        label: 'Español',
      }
    ],
  });

  const notDesiredLanguage = desiredLanguage === 'en' ? 'es' : 'en';

  const dictionary = desiredLanguage === 'en' ? en : es;

  const desiredText = await text({
    message: '¿Podrías escribir parte del texto actual que quieres cambiar? Ya sea una palabra o una frase:',
    hint: `Por ejemplo: "Hey, it's Ines"`,
  });

  log.info(`Buscando textos que contengan "${desiredText}" en el idioma ${desiredLanguage}...`);

  // get an array of object with the keys that match the desired text and their values
  const matchingTexts = Object.keys(dictionary).filter(key => dictionary[key].toLowerCase().includes(desiredText.toLowerCase())).map(key => ({ key, value: dictionary[key] }));

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
    options: [
      {
        value: 'yes',
        label: 'Sí',
      },
      {
        value: 'no',
        label: 'No',
      }
    ],
  });

  if (updateOtherLanguage === 'yes') {
    newTraductionInOtherLanguage = await text({
      message: `Escribe el texto para '${notDesiredLanguage}':`,
    });
  }

  // show info about the changes. If english dictionary or spanish dictionary or both will be updated and ask for confirmation
  log.message('Vas a cambiar el siguiente texto:');
  log.message(`"${dictionary[selectedKey]}"`);
  log.message('Por:');
  log.message(`"${newTraduction}"`);
  log.message(`En el idioma '${desiredLanguage}'`);

  if (updateOtherLanguage === 'yes') {
    log.info(`Además, vas a cambiar el texto "${dictionary[selectedKey]}" por "${newTraductionInOtherLanguage}" en el idioma ${notDesiredLanguage}`);
  }

  const confirmChanges = await select({
    message: '¿Quieres aplicar estos cambios?',
    options: [
      {
        value: 'yes',
        label: 'Sí',
      },
      {
        value: 'no',
        label: 'No',
      }
    ],
  });

  if (confirmChanges === 'yes') {
    dictionary[selectedKey] = newTraduction;

    if (updateOtherLanguage === 'yes') {
      const otherLanguageDictionary = notDesiredLanguage === 'en' ? en : es;
      otherLanguageDictionary[selectedKey] = newTraductionInOtherLanguage;
    }

  } else {
    log.error('Cambios cancelados');
  }

  // save the changes overwriting the file
  const dictionaryToSave = desiredLanguage === 'en' ? en : es;
  const dictionaryPath = desiredLanguage === 'en' ? './src/en.json' : './src/es.json';

  fs.writeFileSync(dictionaryPath, JSON.stringify(dictionaryToSave, null, 2));

  if (updateOtherLanguage === 'yes') {
    const otherLanguageDictionaryToSave = notDesiredLanguage === 'en' ? en : es;
    const otherLanguageDictionaryPath = notDesiredLanguage === 'en' ? './src/en.json' : './src/es.json';

    fs.writeFileSync(otherLanguageDictionaryPath, JSON.stringify(otherLanguageDictionaryToSave, null, 2));
  }

  log.success('Cambios guardados con éxito');

}