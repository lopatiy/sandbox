const fs = require('fs.promised');
const path = require('path');
const shell = require('shelljs');
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
        return this.api.remove(file)
            .then(()=> this.update());
    }

    cut(file, start, end, x, y, w, h) {
        return this.api.cut(file, start, end, x, y, w, h)
            .then(()=> this.update());
    }
}

class FilesFS {
    constructor() {
        this.source = `${process.env.HOME}/Dropbox` || path.resolve(__dirname, './uploaded/');
    }

    list() {
        return fs.readdir(this.source).then(data=> {
            return data.filter(file => !_.startsWith(file, '.'));
        })
    }

    save(filename) {
        return fs.rename(path.resolve(__dirname, `./uploaded/${filename}`), `${this.source}/${filename}`)
    }

    remove(filename) {
        return fs.unlink(`${this.source}/${filename}`);
    }

    cutConstructor(filename, newFilename, start, end, x, y, w, h){
        const cut = `-ss ${start}.0 -to ${end}.0`;
        const crop = `-filter:v "crop=${w}:${h}:${x}:${y}"`;

        let body = [];
        start && end && body.push(cut);
        x && y && w && h && body.push(crop);

        const command = `ffmpeg -i ${this.source}/${filename}.mp4 ${body.join(' ')} -strict -2 -crf 18 ${this.source}/${newFilename}.mp4`;
        console.log(`VIDEO CUT :: ${command}`);
        return command;
    }

    cut(filename, start, end, x, y, w, h) {
        let newFilename = +new Date();
        return new Promise((resolve, reject) => {
            shell.exec(this.cutConstructor(filename, newFilename, start, end, x, y, w, h),
                (code, out, err) => {
                    if (code === 0) {
                        resolve(`${filename}.${newFilename.MP4}`);
                    } else {
                        reject(err);
                    }
                })
        })
    }
}

module.exports = new Files(new FilesFS());
