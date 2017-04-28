var fs = require('fs');
var d3 = require('d3');
var authors = {};
var authcount = 1;
var years = [];
years[0] = [];
years[0][0] = ["year"];
var parseTime = d3.timeParse("%d %B %Y");
var formatTime = d3.timeFormat("%Y");


var data = fs.readFileSync("data.tsv");
var doc = data.toString().split(/\r?\n/);
for (var row = 1; row < doc.length-1; row++) {
	var d = doc[row].split(/\t/);
	var dt = parseTime(d[0]);
	var author = d[1];
	var year = formatTime(dt)-1968;
	if (typeof years[year] === 'undefined') {
		years[year] = [];
		years[year][0] = year+1968;
	}
	if (typeof authors[author] === 'undefined') {
		authors[author] = authcount++;
		years[0][authors[author]] = author;
	}
	if (typeof years[year][authors[author]] === 'undefined') {
		years[year][authors[author]] = 0
	}
	years[year][authors[author]]++;
}

var max = 0;
for (var year in years) {
	if (max < years[year].length) {
		max = years[year].length;
	}
}

for (var year in years) {
	var y = years[year];
	for (var a = 0; a < max; a++) {
		if (typeof y[a] === 'undefined') {
			y[a] = 0;
		}
	}
	if (typeof y !== 'undefined') {
		console.log(y.join(","));
	}
}
