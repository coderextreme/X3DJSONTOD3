"use strict";

// Load X3D JSON into web page

function ConvertChildren(object, indent, parentkey, element) {
	var key;
	for (key in object) {
		if (typeof object[key] === 'object') {
				ConvertToX3DOM(object[key], indent, key, element);
		}
	}
}

function ConvertToX3DOM(object, indent, parentkey, element) {
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
				ConvertToX3DOM(object[key], indent, key, element);
			} else {
				console.log("Unknown type found in array "+typeof object[key]);
			}
		} else if (typeof object[key] === 'object') {
			if (key.substr(0,1) === '@') {
				ConvertToX3DOM(object[key], indent, key, element);
			} else if (key.substr(0,1) === '-') {
				ConvertChildren(object[key], indent, key, element);
			} else {
				if (key.toLowerCase().indexOf("scene") >= 0 || key.toLowerCase()  === "x3d") {
					var selectkey = key;
					if (selectkey.indexOf("x3d:") == 0) {
						selectkey = selectkey.substr(4);
					}
					ConvertToX3DOM(object[key], indent, key, document.querySelector(selectkey));
				} else {
					var createKey = key;
					var child = document.createElement(createKey);
					ConvertToX3DOM(object[key], indent, key, child);
					element.appendChild(child);
				}
			}
		} else if (typeof object[key] === 'number') {
			element.setAttribute(key.substr(1),object[key]);
		} else if (typeof object[key] === 'string') {
			if (key !== '#comment') {
				element.setAttribute(key.substr(1),object[key]);
			}
		} else if (typeof object[key] === 'boolean') {
			element.setAttribute(key.substr(1),object[key]);
		} else {
			console.log("Unknown type found in object "+typeof object[key]);
		}
	}
	if (isArray) {
		if (parentkey.substr(0,1) === '@') {
			if (arrayOfStrings) {
				arrayOfStrings = false;
				element.setAttribute(parentkey.substr(1),'"'+localArray.join('" "')+'"');
			} else {
				element.setAttribute(parentkey.substr(1),localArray.join(" "));
			}
		}
		isArray = false;
	}
	return element;
}

function loadX3DJS(selector, json) {
	console.log(json);
	var element = document.querySelector(selector);
	ConvertToX3DOM(json, "", "", element);
}

function loadX3DJSON(selector, url) {
	$.getJSON(url, function(json) {
		loadX3DJS(selector, json);
	})
	.fail(function(jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + textStatus + ' ' + errorThrown); });
}
