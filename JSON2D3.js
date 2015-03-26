// Java Style Sheet Language, implementation 2

var content = '';
// read content into buffer
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });

function loadJSON(prototypes, indent) {
	var p;
	var tag;
	var style = false;
	var script = false;
	var attr;
	var buffer = '';
	if (typeof prototypes === "object") {
		for (p in prototypes) {
			if (typeof prototypes[p] === 'object') {
				tag = prototypes[p]["jsontag"];
				if (typeof tag !== 'undefined') {
					if (tag === 'style') {
						style = true;
					} else if (tag === 'script') {
						script = true;
					}
					console.log(indent+"element = element.append('"+tag+"');");
					for (attr in prototypes[p]) {
						if (attr.indexOf("xmlns:") === 0) {
							console.log(indent+"d3.ns.qualify('"+attr+"');");
						} else if (attr !== "jsontag") {
							console.log(indent+"element.attr('"+attr+"', '"+prototypes[p][attr]+"');");
						}
					}
				} else {
					loadJSON(prototypes[p], indent+"\t");
				}
			} else {
				if (script) {
					buffer += prototypes[p];
				} else if (style) {
					buffer += prototypes[p];
				} else {
					console.log(indent+"/*"+prototypes[p]+"*/");
				}
			}
		}
		if (buffer !== '') {
			console.log(indent+"element.text('"+buffer
				.replace(/\n/g, '\\n')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')+"');");
		}
		console.log(indent+"element = element.select(function () { return this.parentNode;});");
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
        console.log('<script type="text/javascript" src="http://www.x3dom.org/download/dev/x3dom-full.js"></script>');
        console.log('<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>');
        console.log("<script type='text/javascript'>var element = d3.select('body');");
	loadJSON(prototypes, "");
        console.log('</script>');
});
