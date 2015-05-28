// Java Style Sheet Language, implementation 2

// convert my JSON format to D3 JavaScript

var content = '';
// read content into buffer
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });

var protos = {
};
var currentproto = "";

function loadElement(tag, attrs, indent) {
	console.log(indent+"element = element.append('"+tag+"');");
	for (attr in attrs) {
		if (attr.indexOf("xmlns:") === 0) {
			console.log(indent+"d3.ns.qualify('"+attr+"');");
		} else if (attr !== "jsontag") {
			console.log(indent+"element.attr('"+attr+"', '"+attrs[attr]+"');");
		}
	}
	if (tag.toLowerCase() === 'connect') {
		console.log(indent+"element.select(function () { return this.parentNode;}).select(function () { return this.parentNode;}).attr('"+attrs['nodeField']+"', '"+protos[currentproto]['interface'][attrs['protoField']]+"');");
	}
}

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
				var attrs = prototypes[p];
				tag = attrs["jsontag"];
			
				if (typeof tag !== 'undefined') {
					if (tag.toLowerCase() === 'style') {
						style = true;
					} else if (tag.toLowerCase() === 'script') {
						script = true;
					} else if (tag.toLowerCase() === 'protodeclare') {
						currentproto = attrs["name"];
						protos[currentproto] = {};
					} else if (tag.toLowerCase() === 'protointerface') {
						protos[currentproto]['interface'] = {};
					} else if (tag.toLowerCase() === 'protobody') {
						var ia = [];
						var dv = [];
						for (i in protos[currentproto]['interface']) {
							ia.push[i];
							dv.push("this."+i+" = \""+protos[currentproto]['interface'][i]+"\"");
						}
/*
						console.log('function '+currentproto+'('+ia.join(",")+") { "+dv.join(";\n")+";")
						console.log(" return element; };");
*/
					} else if (tag.toLowerCase() === 'connect') {
					} else if (tag.toLowerCase() === 'field') {
						if (typeof attrs["value"] !== 'undefined') {
							protos[currentproto]['interface'][attrs["name"]] = attrs["value"];
						}
					} else if (tag.toLowerCase() === 'protoinstance') {
						console.log(indent+'element.append(function(d) { return this.appendChild('+attrs["name"]+'.node().cloneNode(true));});');
					} else if (tag.toLowerCase() === 'is') {
					}
					if (tag.toLowerCase() === 'protobody') {
						console.log(indent+'var '+currentproto+" = ");
						loadElement("group", attrs, indent);
					} else {
						loadElement(tag, attrs, indent);
					}
				} else {
					loadJSON(attrs, indent+"\t");
				}
			} else {
				if (script) {
					buffer += prototypes[p];
				} else if (style) {
					buffer += prototypes[p];
				} else {
					console.log(indent+"element.append(function() { return document.createComment('"+prototypes[p]
				.replace(/\n/g, '\\n')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')+"'); });");
				}
			}
		}
		if (buffer !== '') {
			console.log(indent+"element.text('"+buffer
				.replace(/^ecmascript:/, '')
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
