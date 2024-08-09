import { intro, outro, select } from '@clack/prompts';
import { cambiarTexto, subirCambios, cancelProgram, addPortfolioPhotos } from "../../ines-console.js";
import { selectAction } from '../conts.js';

const actions = {
  cambiarTexto,
  subirCambios,
  cancelProgram,
  addPortfolioPhotos
}


export const main = async () => {
  intro(`¡Hey, it's Javi! Este es el panel de administración de InesWorld. ¿En qué puedo ayudarte?`);

  const projectType = await select(selectAction);

  await actions[projectType]();


  outro(`Enhorabuena, has actulizado la web de InesWorld. ¡A seguir creando, hasta la próxima!`);
}