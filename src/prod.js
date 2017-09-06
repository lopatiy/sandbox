const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');
const morgan = require('morgan');
const url = require('url');
const app = express();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../build')));
app.use('/api', proxy('localhost:3001', {
    proxyReqPathResolver: (req) => '/api' + url.parse(req.url).path
}));

app.get('/*', function (req, res) {
    console.log(req.path, 'CAUGHT');
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(80, ()=>{
    console.log(new Date() + ":: PRODUCTION SERVER LISTENING PORT 80")
});

