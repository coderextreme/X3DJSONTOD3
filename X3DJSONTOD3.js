// Java Style Sheet Language, implementation 1

var content = '';
// read content into buffer
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });
// convert to JSON

function ConvertToD3js(prototypes, indent) {
	var p;
	for (p in prototypes) {
		if (p == 0) {
			console.log(indent+".append(\""+prototypes[p]["data-tag"]+"\")");
			var attr;
			for (attr in prototypes[p]) {
				if (attr !== "data-tag" && attr !== "xmlns:xsd") {
					console.log(indent+"\t.attr(\""+attr+"\", \""+prototypes[p][attr]+"\")");
				} else if (attr === "xmlns:xsd") {
					console.log(indent+"\t.attr('id', 'rootX3dElement')");
				}
			}
		} else {
			if (typeof prototypes[p] === 'object') {
				ConvertToD3js(prototypes[p], indent+"\t");
			}
			console.log(indent+"\t.select(function() { return this.parentNode; })");
		}
	}
}

process.stdin.on('end', function() {
	var prototypes = JSON.parse(content);
        console.log('<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>');
        console.log("<script type='text/javascript'>d3.select('body')");
	ConvertToD3js(prototypes, "");
        console.log(";\n</script>");
});
