"use strict";
// Java Style Sheet Language, implementation 1

var content = '';
// read content into buffer
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });

function printElement(el, indent) {
	var child;
	var key;
	var attrs;
	if (typeof el === 'string') {
		return;
	}
	if (typeof el === 'undefined') {
		return;
	}
	if (typeof el.key !== 'undefined') {
		key = el.key;
	}
	if (el.attributes && el.attributes.length > 0) {
		attrs = " "+el.attributes.join(" ");
	}
	if (key === '#comment') {
		console.log(indent+'<!--'+attrs.substr(10, attrs.length-11)+'-->');
		return;
	}
		
	if (el.children && typeof key !== 'undefined' && typeof attrs !== 'undefined' ) {
		console.log(indent+"<"+key+attrs+">")
	} else if (el.children && typeof key !== 'undefined' ) {
		console.log(indent+"<"+key+">")
	} else if (typeof key !== 'undefined' && typeof attrs !== 'undefined' ) {
		console.log(indent+"<"+key+attrs+"/>")
	} else if (typeof key !== 'undefined' ) {
		console.log(indent+"<"+key+"/>")
	}
	for (child in el) {
		printElement(el[child], indent+" ");
	}
	if (el.children && typeof key !== 'undefined') {
		console.log(indent+"</"+key+">");
	}
}

function ConvertToX3D(object, parentkey) {
	var key;
	var localArray = [];
	var isArray = false;
	var arrayOfStrings = false;
	var attributes = [];
	var children = [];
	var elkey;
	for (key in object) {
		if (key === '_type') {
			elkey = object[key];
			continue;
		} 
		if (key === '#comment') {
			children.push('<!--'+object.content+'-->');
			break;
		}
		if (isNaN(parseInt(key))) {
			isArray = false;
		} else {
			isArray = true;
		}
		if (isArray) {
			if (typeof object[key] === 'number') {
				localArray.push(object[key]);
			} else if (typeof object[key] === 'string') {
				localArray.push(object[key]);
				arrayOfStrings = true;
			} else if (typeof object[key] === 'boolean') {
				localArray.push(object[key]);
			} else if (typeof object[key] === 'object') {
				var el = ConvertToX3D(object[key], key);
				children.push(el);
			} else {
				console.log("Unknown type found in array "+typeof object[key]);
			}
		} else if (typeof object[key] === 'object') {
			var el = ConvertToX3D(object[key], key);
			if (typeof object[key]["_type"] === 'undefined' && key !== 'children') {
				for (var attr in el.attributes) {
					attributes.push(el.attributes[attr]);
				}
			}
			children.push(el);
		} else if (typeof object[key] === 'number') {
			attributes.push(key+"='"+object[key]+"'");
		} else if (typeof object[key] === 'string') {
			attributes.push(key+"='"+object[key]+"'");
		} else if (typeof object[key] === 'boolean') {
			attributes.push(key+"='"+object[key]+"'");
		} else {
			console.log("Unknown type found in object "+typeof object[key]);
		}
	}
	if (isArray) {
		if (arrayOfStrings) {
			arrayOfStrings = false;
			attributes.push(parentkey+"='&quot;"+localArray.join('&quot; &quot;')+"&quot;'");
		} else {
			attributes.push(parentkey+"='"+localArray.join(" ")+"'");
		}
		isArray = false;
	}
	return { key: elkey, attributes: attributes, children: children};
}

process.stdin.on('end', function() {
	var json = JSON.parse(content);
console.log('<?xml version="1.0" encoding="UTF-8"?>');
console.log('<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 3.3//EN" "http://www.web3d.org/specifications/x3d-3.3.dtd">');
	var el = ConvertToX3D(json, "", "");
	printElement(el, "");
});
