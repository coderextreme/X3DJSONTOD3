var rs = new (require('stream').Readable)();
rs._read = function(n) {};
var oboe = require('oboe')(rs);

var content = '';

process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });

process.stdin.on('end', function() {
	oboe.on('node:*', function(node,path, ancestors) {
	  console.log('node:', node);
	  //console.log('path:', path);
	  //console.log('ancestors:', ancestors);
	});
	rs.push(content);
	rs.push(null);
});
