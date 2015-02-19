// Java Style Sheet Language, implementation 2

var content = '';
// read content into buffer
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });

function loadJSON(prototypes, indent) {
	var p;
	for (p in prototypes) {
		if (p == 0) {
			var attr;
			console.log(indent+"element = element.append('"+prototypes[p]["jsontag"]+"');");
			for (attr in prototypes[p]) {
				if (attr !== "jsontag" && attr !== "xmlns:xsd") {
					console.log(indent+"\telement.attr('"+attr+"', '"+prototypes[p][attr]+"');");
				} else if (attr === "xmlns:xsd") {
					console.log(indent+"\telement.attr('id', 'rootX3dElement');");
				}
			}
		} else {
			if (typeof prototypes[p] === 'object') {
				loadJSON(prototypes[p], indent+"\t");
			} else if (typeof prototypes[p] === 'string') {
				console.log(indent+"\telement.text('"+prototypes[p]+"');");
			}
			console.log(indent+"\telement = element.select(function () { return this.parentNode;});");
		}
	}
}


/*
d3.json('ExtrusionHeart.json', function(error, json) {
  if (error) return console.warn(error);
  loadJSON(json, "");
});
*/

process.stdin.on('end', function() {
	var prototypes = JSON.parse(content);
        console.log('<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>');
        console.log("<script type='text/javascript'>var element = d3.select('body')");
	loadJSON(prototypes, "");
        console.log(";\n</script>");
});
