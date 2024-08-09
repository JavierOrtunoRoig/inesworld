import fs from 'fs';

/**
 * Read a file from the filesystem
 * 
 * @param {string} path - The path of the file to read
 * 
 * @returns {string} - The content of the file
 */
export const readFile = (path) => fs.readFileSync(path, 'utf-8');

/**
 * Write a file to the filesystem
 * 
 * @param {string} path - The path of the file to write
 * @param {string} data - The content to write in the file
 */
export const writeFile = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

/**
 * Copy a file from one location to another
 * 
 * @param {string} src - The source path of the file
 * @param {string} dest - The destination path of the file
 */
export const copyFile = (src, dest) => fs.copyFileSync(src, dest);