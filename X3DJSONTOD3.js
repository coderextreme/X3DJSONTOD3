"use strict";
// Java Style Sheet Language, implementation 1

var content = '';
// read content into buffer
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });


function ConvertChildren(object, indent, parentkey) {
	var key;
	for (key in object) {
		if (typeof object[key] === 'object') {
				ConvertToD3js(object[key], indent+"\t", key);
		}
	}
}

function ConvertToD3js(object, indent, parentkey) {
	var key;
	var localArray = [];
	var isArray = false;
	var arrayOfStrings = false;
	for (key in object) {
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
				ConvertToD3js(object[key], indent+"\t", key);
			} else {
				console.log("Unknown type found in array "+typeof object[key]);
			}
		} else if (typeof object[key] === 'object') {
			if (key.substr(0,1) === '@') {
				ConvertToD3js(object[key], indent+"\t", key);
			} else if (key.substr(0,1) === '-') {
				ConvertChildren(object[key], indent+"\t", key);
			} else {
				console.log(indent+"\telement = element.append('"+key+"');");
				ConvertToD3js(object[key], indent+"\t", key);
				console.log(indent+"\telement = element.select(function() { return this.parentNode; })");
			}
		} else if (typeof object[key] === 'number') {
			console.log(indent+"\telement.attr('"+key.substr(1)+"','"+object[key]+"');");
		} else if (typeof object[key] === 'string') {
			console.log(indent+"\telement.attr('"+key.substr(1)+"','"+object[key]+"');");
		} else if (typeof object[key] === 'boolean') {
			console.log(indent+"\telement.attr('"+key.substr(1)+"','"+object[key]+"');");
		} else {
			console.log("Unknown type found in object "+typeof object[key]);
		}
	}
	if (isArray) {
		if (parentkey.substr(0,1) === '@') {
			if (arrayOfStrings) {
				arrayOfStrings = false;
				console.log(indent+"element.attr('"+parentkey.substr(1)+"','\""+localArray.join('" "')+"\"');");
			} else {
				console.log(indent+"element.attr('"+parentkey.substr(1)+"','"+localArray.join(" ")+"');");
			}
		}
		isArray = false;
	}
}

process.stdin.on('end', function() {
	var json = JSON.parse(content);
        console.log('<script type="text/javascript" src="http://www.x3dom.org/download/dev/x3dom-full.js"></script>');
        console.log('<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>');
        console.log("<script type='text/javascript'>var element = d3.select('body');");

	ConvertToD3js(json, "", "");
        console.log(";\n</script>");
});
