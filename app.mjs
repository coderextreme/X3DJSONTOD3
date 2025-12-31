import express from 'express';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();
const server = http.createServer(app);
var port = process.env.PORT || 3000;
app.use(express.static(__dirname));

server.listen(port, function () {
    console.log('listening on http://localhost:' + port + "/timeseriesbar.html");

});
