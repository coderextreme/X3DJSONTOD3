var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var mongo = require('./mongo');
var assert = require('assert');
app.use(express.static(__dirname));

// connect to mongo
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/testing_storeX3D';

app.get('/', function(req, res, err) {
	res.contentType("text/json");
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		mongo.findDocuments(db, function(docs) {
			res.send(docs);
		});
	});
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
