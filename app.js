var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var mongo = require('./mongobase');
var assert = require('assert');
var config = require('./config');
var path = require('path');
app.use(express.static(__dirname));

http.listen(port, function () {
    console.log('listening on http://localhost:' + port);
});
