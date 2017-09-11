const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const {Files, FilesFS} = require('./files');
const {Downloader} = require('./downloader');
const _ = require('lodash');

const app = express();
const files = new Files(new FilesFS());
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

app.post('/api/video-download', (req, res) => {
    console.log(req);
    console.log(req.body.downloadUrl);
    if (_.isString(req.body.downloadUrl) && !_.isEmpty(req.body.downloadUrl)) {
        downloader.getVideo(req.body.downloadUrl)
            .then((filename) =>
                files.save(filename)
                    .then((filename) => res.send(filename))
                    .catch(e => res.status(500).send(e)))
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


app.listen(3001, function () {
    console.log("Server started :: LISTENING PORT 3001");
});