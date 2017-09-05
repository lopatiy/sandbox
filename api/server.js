const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());
app.post('/api/video-upload', function (req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.files;
    const savePath = path.resolve(__dirname, `./uploaded/${file.name}`);
    file.mv(savePath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(JSON.stringify({response: savePath}));
    });
});

app.listen(3001, function () {
    console.log("Server started :: LISTENING PORT 3001");
});