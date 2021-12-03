import { readdirSync, lstatSync } from "fs";
import { resolve } from "path";


/**
 * Get the path of all folders inside a given path
 * @param path A folder path
 */
const getFolderPaths = (path: string) => {
  const folders = [];
  for (let content of readdirSync(path)) {
    const contentPath = resolve(path, content);
    const isDirectory = lstatSync(contentPath).isDirectory();
    if(isDirectory) folders.push(contentPath);
  }
  return folders;
}


/**
 * Get the path of all files inside a given path
 * @param path A folder path
 */
const getFilePaths = (path: string) => {
  const files = [];
  for (let content of readdirSync(path)) {
    const contentPath = resolve(path, content);
    const isDirectory = lstatSync(contentPath).isDirectory();
    if(!isDirectory) files.push(contentPath);
  }
  return files;
}


/**
 * Folder structure.
 * Used to easily navigate through the file system.
 */
export class Folder {
  /** 
   * The path to the folder 
   */
  readonly path: string;
  /** 
   * The folders inside the folder 
   */
  readonly folders: Folder[];
  /** 
   * The file exports of the files inside the folder 
   */
  readonly files: any[];
  /**
   * @param path The path to the folder
   */
  constructor(path: string) {
    this.path = resolve(path);
    this.folders = getFolderPaths(path).map(path => new Folder(path));
    this.files = getFilePaths(path).map(path => {
      if(path.endsWith('.js') || path.endsWith('.json')) {
        return (require(path));
      }
    });
  }
}