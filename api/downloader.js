'use strict';

const path = require('path');
const shell = require('shelljs');
const queue = require('./queue');
const files = require('./files');
const {QueuedVideo, QueueItemState} = queue;
const _ = require('lodash');

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
        let command = `youtube-dl -f ${format || videoFormat.MP4} -o '${this.path}/${filename}.%(ext)s' --restrict-filenames ${url}`;
        return command
    }

    downloadVideo(url, name) {
        const filename = name || (+new Date());
        return new Promise((resolve, reject) => {
            shell.exec(this.execConstructor(url, filename, videoFormat.MP4), (code, out, err) => {
                if (code === 0) {
                    resolve(`${filename}.${videoFormat.MP4}`);
                } else {
                    reject(err);
                }
            })
        })
    }

    checkVideos(){
        QueuedVideo.find({state: QueueItemState.NEW})
            .then((data) => {
                _.map(data, (video) => {
                    video.state = QueueItemState.LOADING;
                    video.save();

                    this.downloadVideo(video.url, video.name)
                        .then((filename) => {
                            video.state = QueueItemState.DOWNLOADED;
                            video.save();
                            files.save(filename);
                        })
                        .catch((e) => console.error(e))
                })
            })
    }

    getLoading(){
        return QueuedVideo.find({state: QueueItemState.LOADING})
    }

    addVideoToQueue(url){
        const video = new QueuedVideo({
            name: +new Date(),
            url: url,
            state: QueueItemState.NEW
        });

        return video.save().then(()=> this.checkVideos())
    }
}

module.exports = {Downloader, videoFormat};