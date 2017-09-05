const fs = require('fs.promised');
const path = require('path');
const _ = require('lodash');

class Files  {
    constructor(API) {
        this.api = API;
        this.update();
    }

    update() {
        this.api.list().then((data)=> this.files = data);
    }

    list() {
        return new Promise((resolve, reject) => {
            if(true){
                resolve(this.files);
            }
        })
    }

    save(file) {
        const filename = `video-${+new Date()}-${file.name}`;
        return file.mv(path.resolve(__dirname, `./uploaded/${filename}`))
            .then((data) => {
                return this.api.save(filename)
                    .then(filename => {
                        this.update();
                        return filename;
                    });
            });
    }

    remove(file) {
        return this.api.remove(file);
    }
}

class FilesFS {
    constructor() {
    }

    list() {
        return fs.readdir(path.resolve(__dirname, './uploaded/')).then(data=> {
            return data.filter(file => _.startsWith(file, 'video-'));
        })
    }

    save(filename) {
        return new Promise((resolve, reject) => resolve(filename));
    }

    remove(file) {

    }
}

module.exports = {FilesFS, Files};
