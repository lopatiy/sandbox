const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const files = require('./files');
const {Downloader} = require('./downloader');
const _ = require('lodash');

const app = express();
const downloader = new Downloader();

app.use(fileUpload());
app.post('/api/video-upload', (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.files;
    const filename = `video-${+new Date()}-${file.name}`;
    return file.mv(path.resolve(__dirname, `./uploaded/${filename}`))
        .then(() =>
            files.save(filename)
                .then((filename) => res.send(filename))
                .catch(e => res.status(500).send(e)));
});

app.get('/api/loading-videos', (req, res) => {
    downloader.checkVideos();
    downloader.getLoading()
        .then((data)=> {
            res.send(_.map(data, (item) => _.pick(item, ['name', 'url'])))
        })
});

app.post('/api/video-download', (req, res) => {
    if (_.isString(req.body.downloadUrl) && !_.isEmpty(req.body.downloadUrl)) {
        downloader.addVideoToQueue(req.body.downloadUrl)
            .then(() => res.send('Added to queue'))
            .catch(e => res.status(500).send(e))
    } else {
        res.status(400).send('Missing Video URL');
    }
});

app.get('/api/videos', (req, res) => {
    files.list()
        .then((files) => {
            res.send(files)
        })
        .catch(e => res.status(500).send(e));
});

app.get('/api/video', (req, res) => {
    res.send()
});


app.listen(3001, () => console.log("Server started :: LISTENING PORT 3001"));