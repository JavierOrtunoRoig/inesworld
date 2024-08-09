import { select } from '@clack/prompts';
import en from '../src/en.json' assert { type: 'json' };
import es from '../src/es.json' assert { type: 'json' };

/**
 * Get the desired language from the user and the not desired language
 * 
 * @returns {Promise<{ desiredLanguage: string, notDesiredLanguage: string }>}
 */
export async function getLanguages() {
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

  return { desiredLanguage, notDesiredLanguage };
}

/**
 * @param {string} desiredLanguage
 * @returns {Promise<{ desiredDictionary notDesiredDictionary }>}
 */
export async function getDictionaries(desiredLanguage) {
  return {
    desiredDictionary: desiredLanguage === 'en' ? en : es,
    notDesiredDictionary: desiredLanguage === 'en' ? es : en,
  }
}