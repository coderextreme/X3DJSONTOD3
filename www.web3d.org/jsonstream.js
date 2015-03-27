var JSONStream = require('JSONStream').parse('Group..Transform', function (value, path) {
  return { key: path[path.length - 1], value: JSON.stringify(value), path: path }
});

var content = '';
// read content into buffer

process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });


process.stdin.on('end', function() {
	JSONStream.on('data', function(d) {
	  console.log('JSONStream data:', arguments);
	}).end(content);
});
