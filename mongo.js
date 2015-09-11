var fs = require('fs');

// connect to mongo
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://localhost:27017/testing_storeX3D';

// our model
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.error('mongo is open');
	var removeDocuments = function(db, callback) {
	  // Get the documents collection
	  var collection = db.collection('documents');
	  // Insert some documents
	  collection.remove({}, function(err, result) {
	    console.log("Removed the documents");
	    callback(result);
	  });
	}
	var insertDocuments = function(db, callback) {
		var collection = db.collection('documents');
		function parseFile(file) {
			fs.readFile(file, function(err, data) {
				if (err) {
					throw err;
				}
				try {
					var x3d = JSON.parse(data);
					collection.insert(x3d, function(err, result) {
						assert.equal(err, null);
						console.log('inserted');
						callback(result);
					});
					console.log(file, 'succeeded');
				} catch (e) {
					console.log(file, 'failed', e);
				}
			});
		}
		for (i in process.argv) {
			if (i < 2) {
				continue;
			}
			var file = process.argv[i];
			parseFile(file);
		}
	};
	var findDocuments = function(db, callback) {
		var collection = db.collection('documents');
		collection.find({}).toArray(function(err, docs) {
			callback(docs);
			console.log(docs);
		});
	};
	removeDocuments(db, function() {
		console.log('removed');
		insertDocuments(db, function() {
			console.log('saved')
			findDocuments(db, function() {
				console.log('found records');
				db.close();
			});
		});
	});
  });
