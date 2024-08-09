import path from 'path';
import { select } from "@clack/prompts";
import { readFile } from '../files.js';


export const choosePortfolio = async (portfolios) => select({
  message: 'Selecciona a qué portfolio quieres añadir fotos',
  options: portfolios.map(file => ({ value: file, label: path.basename(file, '.json') })),
});

export const addPhotosToPortfolio = async (photos, portfolioPath, portfolio, assetsPath, folderPortfolio) => {
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

  return portfolioData;
}