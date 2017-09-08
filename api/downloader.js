'use strict';

const fs = require('fs.promised');
const path = require('path');
const shell = require('shelljs');
const _ = require('lodash');
const {Files, FilesFS} = require('./files');
const files = new Files(new FilesFS());

const videoFormat = {
    MP4: 'mp4',
    MOV: 'mov',
    WEBM: 'webm'
};

class Downloader {
    constructor() {
        this.path = path.resolve(__dirname, './uploaded');
    }

    execConstructor(url, filename, format) {
        let command = `youtube-dl -f ${format || videoFormat.MP4} -o '${this.path}/${filename}.%(ext)s' --write-thumbnail --restrict-filenames ${url}`;
        return command
    }

    downloadVideo(url) {
        const filename = (+new Date());
        return new Promise((resolve, reject) => {
            let result = shell.exec(this.execConstructor(url, filename, videoFormat.MP4));

            if (result.code === 0) {
                resolve(`${filename}.${videoFormat.MP4}`)
            } else {
                reject(result.stderr)
            }
        })
    }

    getVideo(url) {
        return this.downloadVideo(url);
    }
}

module.exports = {Downloader, videoFormat};