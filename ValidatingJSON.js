// Java Style Sheet Language, implementation 2

var fs = require('fs');

function parseFile(file) {
	fs.readFile(file, function(err, data) {
		if (err) {
			throw err;
		}
		try {
			JSON.parse(data);
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
