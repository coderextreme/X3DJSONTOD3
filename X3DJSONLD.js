"use strict";

function ConvertChildren(object, indent, parentkey, element) {
	var key;
	for (key in object) {
		if (typeof object[key] === 'object') {
				ConvertToD3js(object[key], indent, key, element);
		}
	}
}

function ConvertToD3js(object, indent, parentkey, element) {
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
				ConvertToD3js(object[key], indent, key, element);
			} else {
				console.log("Unknown type found in array "+typeof object[key]);
			}
		} else if (typeof object[key] === 'object') {
			if (key.substr(0,1) === '@') {
				ConvertToD3js(object[key], indent, key, element);
			} else if (key.substr(0,1) === '-') {
				ConvertChildren(object[key], indent, key, element);
			} else {
				if (key === "Scene" || key === "X3D") {
					ConvertToD3js(object[key], indent, key, element);
				} else {
					element = element.append(key);
					ConvertToD3js(object[key], indent, key, element);
					element = element.select(function() { return this.parentNode; });
				}
			}
		} else if (typeof object[key] === 'number') {
			element.attr(key.substr(1),object[key]);
		} else if (typeof object[key] === 'string') {
			if (key !== '#comment') {
				element.attr(key.substr(1),object[key]);
			}
		} else if (typeof object[key] === 'boolean') {
			element.attr(key.substr(1),object[key]);
		} else {
			console.log("Unknown type found in object "+typeof object[key]);
		}
	}
	if (isArray) {
		if (parentkey.substr(0,1) === '@') {
			if (arrayOfStrings) {
				arrayOfStrings = false;
				element.attr(parentkey.substr(1),"\""+localArray.join('","')+"\"");
			} else {
				element.attr(parentkey.substr(1),localArray.join(","));
			}
		}
		isArray = false;
	}
	return element;
}

function loadX3DJSON(selector, url) {
	$.get(url, function(json) {
		var element = d3.select(selector);
		ConvertToD3js(json, "", "", element);
	});
}
