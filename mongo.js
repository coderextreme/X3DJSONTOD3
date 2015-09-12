var fs = require('fs');
var assert = require('assert');

module.exports.removeDocuments = function(db, callback) {
	  // Get the documents collection
	  var collection = db.collection('testing_storeX3D');
	  // Insert some documents
	  collection.remove({}, function(err, result) {
		assert.equal(null, err);
		callback(result);
	  });
	};
module.exports.findDocuments = function(db, callback) {
		var collection = db.collection('testing_storeX3D');
		collection.find({}).toArray(function(err, docs) {
			assert.equal(null, err);
			callback(docs);
		});
	};
module.exports.insertDocuments = function(db, callback) {
		var collection = db.collection('testing_storeX3D');

		var finder = require('findit')('/Users/johncarlson/Downloads/www.web3d.org/www.web3d.org/x3d/content/examples');
		finder.on('file', function(file) {
			if (file.indexOf('.json') < 0) {
				return; // if not .json, continue
			}
			var data = fs.readFileSync(file);
			try {
				var x3d = JSON.parse(data);
				x3d.file = file;
				collection.insert(x3d, function(err, result) {
					// assert.equal(null, err);
					callback(result);
				});
				// console.log(file, 'succeeded');
			} catch (e) {
				// console.log(file, 'failed', e);
			}
		});
	};
