const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const files = require('./files');
const {Downloader} = require('./downloader');
const _ = require('lodash');
const ig = require('./content-maker/index');

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

app.delete('/api/video/:filename', (req, res) => {
    if (_.isString(req.params.filename) && !_.isEmpty(req.params.filename)) {
        files.remove(req.params.filename)
            .then(() => res.send('Removed'))
            .catch(e => res.status(500).send(e))
    } else {
        res.status(400).send('Missing filename');
    }
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

app.post('/api/video-cut', (req, res) => {
    const {video, start, end, x, y, w, h} = req.body;
    if (video) {
        files.cut(video, start, end, x, y, w, h)
            .then(() => res.send('Added to queue'))
            .catch(e => res.status(500).send(e))
    } else {
        res.status(400).send('Arguments Mismatch: video, start, end');
    }
});

app.get('/api/videos', (req, res) => {
    files.list()
        .then((files) => {
            res.send(files)
        })
        .catch(e => res.status(500).send(e));
});

app.get('/api/ig/account/:name', (req, res) => {
    const name = req.params.name;
    if(_.isString(name)){
        ig.getAccount(name)
            .then(account => res.send(account.params));
    } else {
        res.status(200).send('Account name argument missing.')
    }
});

app.get('/api/video', (req, res) => {
    res.send()
});


app.listen(3001, () => console.log("Server started :: LISTENING PORT 3001"));