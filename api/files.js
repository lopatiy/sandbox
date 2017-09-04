var fs = require('fs');

export default class Files  {
    api;

    constructor(API) {
        this.api
    }

    loadFiles() {
        return this.api.loadFiles();
    }

    saveFile(file) {
        return this.api.saveFile(file);
    }

    cutFile(file) {
        return this.api.cutFile(file);
    }

    getFiles() {
        return this.api.getFiles();
    }
}

class FilesFS {
    files;

    constructor() {
        this.files = [];
        this.readFiles();
    }

    readFiles() {
        fs.readdir('../uploaded').then((data) => {
            console.log(data);
        })
    }

    loadFiles() {

    }

    saveFile(file) {

    }

    cutFile(file) {

    }

    getFiles() {

    }
}
