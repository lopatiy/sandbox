const fs = require('fs.promised');
const path = require('path');
const _ = require('lodash');

class Files  {
    constructor(API) {
        this.api = API;
        this.update();
    }

    update() {
        this.updateTime = +new Date();
        return this.api.list().then((data)=> this.files = data);
    }

    list() {
        return new Promise((resolve, reject) => {
            if (+new Date() - this.updateTime < 30000) {
                resolve(this.files);
            } else {
                this.update().then(()=> resolve(this.files));
            }
        })
    }

    save(filename) {
        return this.api.save(filename)
            .then(filename => {
                this.update();
                return filename;
            });
    }

    remove(file) {
        return this.api.remove(file);
    }
}

class FilesFS {
    constructor() {
        this.source = `${process.env.HOME}/Dropbox` || path.resolve(__dirname, './uploaded/');
    }

    list() {
        return fs.readdir(this.source).then(data=> {
            return data.filter(file => _.startsWith(file, 'video-'));
        })
    }

    save(filename) {
        console.log(filename);
        return fs.rename(path.resolve(__dirname, `./uploaded/${filename}`), `${this.source}/${filename}`)
    }

    remove(file) {

    }
}

module.exports = {FilesFS, Files};
