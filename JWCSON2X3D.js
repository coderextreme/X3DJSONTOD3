// Java Style Sheet Language, implementation 2

// Convert my JSON format to X3D XML

var content = '';
// read content into buffer
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });

function ConvertJSONToX3D(prototypes, indent) {
	var p;
	var tag;
	var style = false;
	var script = false;
	var attr;
	var buffer = '';
	var firstLevel = false;
	if (typeof indent === 'undefined') {
		firstLevel = true;
		indent = "";
	}
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
					var attrs = [];
					for (attr in prototypes[p]) {
						if (attr !== "jsontag") {
							attrs.push(" "+attr+"='"+prototypes[p][attr]+"'");
						}
					}
					var trailing = '>';
					if (prototypes.length == 1) {
						trailing = '/>';
					}
					if (attrs.length > 0) {
						console.log(indent+"<"+tag+attrs.join('')+trailing);
					} else {
						console.log(indent+"<"+tag+trailing);
					}
				} else {
					if (firstLevel) {
						ConvertJSONToX3D(prototypes[p], indent);
					} else {
						ConvertJSONToX3D(prototypes[p], indent+"  ");
					}
				}
			} else {
				if (script) {
					buffer += prototypes[p];
				} else if (style) {
					buffer += prototypes[p];
				} else {
					console.log(indent+"  "+prototypes[p]);
				}
			}
		}
		if (buffer !== '') {
			console.log(indent+buffer
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;'));
		}
		if (prototypes.length > 1 && typeof prototypes[0]['jsontag'] !== 'undefined') {
			console.log(indent+"</"+prototypes[0]['jsontag']+">");
		}
	}
}

process.stdin.on('end', function() {
	var prototypes = JSON.parse(content);
console.log('<?xml version="1.0" encoding="UTF-8"?>');
console.log('<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 3.3//EN" "http://www.web3d.org/specifications/x3d-3.3.dtd">');
	ConvertJSONToX3D(prototypes, undefined);
});
