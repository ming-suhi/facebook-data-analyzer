const { readdirSync, lstatSync } = require("fs");
const { resolve } = require("path");

class Folder {

  constructor(path) {

    // The path to folder
    this.path = resolve(path);
  }


  // Get all folders
  get folders() {

    // Declare a variable to store folders
    const folders = [];

    // Loop through folder contents
    for (let content of readdirSync(this.path)) {
      
      // Resolve content path
      const contentPath = resolve(this.path, content);

      // Check if directory
      const isDirectory = lstatSync(contentPath).isDirectory();

      // If not folder continue
      if(!isDirectory) continue;

      // Push folder to folders
      folders.push(new Folder(contentPath));
    }

    // Return files
    return folders;
  }


  // Get all files
  get files() {

    // Declare a variable to store files
    const files = [];

    // Loop through folder contents
    for (let content of readdirSync(this.path)) {

      // Resolve content path
      const contentPath = resolve(this.path, content);

      // Check if directory
      const isDirectory = lstatSync(contentPath).isDirectory();

      // If directory continue
      if(isDirectory) continue;

      // Push file to files
      files.push(require(contentPath));
    }

    // Return files
    return files;
  }
}

module.exports = { Folder };