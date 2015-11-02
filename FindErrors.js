// FindErrors.js  Report files which don't parse properly

var fs = require('fs');

function parseFile(file) {
	fs.readFile(file, function(err, data) {
		if (err) {
			throw err;
		}
		try {
			JSON.parse(data);
		} catch (e) {
			console.log(file);
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
