const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());
app.post('/video-upload', function (req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let file = req.files[0];

    // Use the mv() method to place the file somewhere on your server
    file.mv(path.resolve(__dirname, '../public/uploaded/filename.jpg'), function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded!');
    });
});

app.listen(3001, function () {
    console.log("Server started :: LISTENING PORT 3001");
});