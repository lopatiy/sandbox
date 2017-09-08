const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const {Files, FilesFS} = require('./files');

const app = express();
const files = new Files(new FilesFS());

app.use(fileUpload());
app.post('/api/video-upload', function (req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.files;
    const filename = `video-${+new Date()}-${file.name}`;
    return file.mv(path.resolve(__dirname, `./uploaded/${filename}`))
        .then(() => {
            files.save(filename)
                .then((filename) => res.send(filename))
                .catch(e => res.status(500).send(e));
        });
});

app.get('/api/videos', (req, res) => {
    files.list()
        .then((files) => {
            res.send(files)
        })
        .catch(e => res.status(500).send(e));
});

app.get('/api/video', (req,res) => {
    res.send()
});


app.listen(3001, function () {
    console.log("Server started :: LISTENING PORT 3001");
});