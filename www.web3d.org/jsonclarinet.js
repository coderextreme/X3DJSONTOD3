var clarinet = require('clarinet').parser();

clarinet.onopenobject = clarinet.onkey = function(k) {
  console.log('clarinet key =', k);
};
clarinet.onvalue = function(v) {
  console.log('clarinet value =', v);
};
var content = '';
// read content into buffer

process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });


process.stdin.on('end', function() {
	clarinet.write(content).close();
});
