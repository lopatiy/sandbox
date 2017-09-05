const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const {Files, FilesFS} = require('./files');
const files = new Files(new FilesFS());


app.use(fileUpload());
app.post('/api/video-upload', function (req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.files;

    files.save(file)
        .then((filename) => res.send(filename))
        .catch(e => res.status(500).send(e));
});

app.get('/api/videos', (req, res) => {
    files.list()
        .then((files) => {
            res.send(files)
        })
        .catch(e => res.status(500).send(e));
});

app.get('/video', (req,res) => {
    res.send()
});

app.listen(3001, function () {
    console.log("Server started :: LISTENING PORT 3001");
});