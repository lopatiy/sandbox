'use strict'

const fs = require('fs.promised');
const path = require('path');
const shell = require('shelljs');
const _ = require('lodash');

const videoFormat = {
    MP4 : 'mp4',
    MOV : 'mov',
    WEBM : 'webm'
};

class Downloader {
    constructor() {
        this.path = path.resolve(__dirname, './uploaded');
    }

    execConstructor(url, format) {
        let command = `youtube-dl -f ${format || videoFormat.MP4} -o '${this.path}/${(+new Date())}.%(ext)s' ${url}`;
        console.log(command);
        return command
    }

    downloadVideo(url) {
        shell.exec(this.execConstructor(url));
    }
}

new Downloader().downloadVideo("https://www.youtube.com/watch?v=BBbHX49-hBg");