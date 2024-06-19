// copy ./image-sitemap.xml to ./dist/image-sitemap.xml

const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, './sitemap-images.xml');
const target = path.resolve(__dirname, './dist/sitemap-images.xml');

console.log('Copying sitemap-images.xml to dist');
fs.copyFileSync(source, target);
console.log('Copied sitemap-images.xml to dist');


const sitemapIndex = path.resolve(__dirname, './dist/sitemap-index.xml');

fs.writeFileSync(sitemapIndex, `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://inesworld.vercel.app/sitemap-0.xml</loc></sitemap><sitemap><loc>https://inesworld.vercel.app/sitemap-images.xml</loc></sitemap></sitemapindex>`);

console.log('Edited sitemap-index.xml in dist');