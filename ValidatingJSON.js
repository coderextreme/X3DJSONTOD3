// Java Style Sheet Language, implementation 2

var content = '';
// read content into buffer
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });


process.stdin.on('end', function() {
	var prototypes = JSON.parse(content);
	console.log(JSON.stringify(prototypes, null, "\t"));
});
