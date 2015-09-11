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
	  var collection = db.collection('testing_storeX3D');
	  // Insert some documents
	  collection.remove({}, function(err, result) {
	    console.log("Removed the documents");
	    callback(result);
	  });
	}
	var insertDocuments = function(db, callback) {
		var collection = db.collection('testing_storeX3D');
		for (i in process.argv) {
			if (i < 2) {
				continue;
			}
			var file = process.argv[i];
			var data = fs.readFileSync(file);
			try {
				var x3d = JSON.parse(data);
				x3d.file = file;
				collection.insert(x3d, function(err, result) {
					assert.equal(err, null);
					console.log('inserted');
					callback(result);
				});
				// console.log(file, 'succeeded');
			} catch (e) {
				// console.log(file, 'failed', e);
			}
		}
	};
	var findDocuments = function(db, callback) {
		var collection = db.collection('testing_storeX3D');
		collection.find({}).toArray(function(err, docs) {
			callback(docs);
			console.log(docs.length);
		});
	};
	findDocuments(db, function() {
		console.log('found records 1');
		removeDocuments(db, function() {
			console.log('removed');
			insertDocuments(db, function() {
				console.log('saved')
			});
		});
	});
  });
