import { glob, globSync, globStream, globStreamSync, Glob } from 'glob'
import * as fs from 'fs';

var monthMap = {
	"January": "01",
	"February": "02",
	"March": "03",
	"April": "04",
	"May": "05",
	"June": "06",
	"July": "07",
	"August": "08",
	"September": "09",
	"October": "10",
	"November": "11",
	"December": "12"
};

const files = await glob('../www.web3d.org/x3d/content/examples/**/*.json')
console.log("date\tauthor");
files.forEach(function(file) {
	// console.log(file);
	var created = "";
	var modified = "";
	var translated = "";
	var creators = "";
	try {
		var json = JSON.parse(fs.readFileSync(file));
		var metas = json.X3D.head.meta;
		for (var m in metas) {
			var meta = metas[m];
			var name = meta["@name"];
			var content = meta["@content"];
			if (name === 'created') {
				created = content;
			}
			if (name === 'translated') {
				translated = content;
			}
			if (name === 'modified') {
				modified = content;
			}
			if (name === 'creator') {
				creators = content;
			}
		}
	} catch (e) {
	}
	if (typeof creators === 'undefined' || creators === "") {
		creators = "Unknown";
	}
	if (typeof created === 'undefined' || created === "") {
		if (typeof translated !== 'undefined' && translated !== "") {
			console.error("Empty 'created' date", created, 'for', file, "setting to 'translated'", translated);
			created = translated;
		} else
		if (typeof modified !== 'undefined' && modified !== "") {
			console.error("Empty 'created' date", created, 'for', file, "setting to 'modified'", modified);
			created = modified;
		} else {
			console.error("Empty 'created' date", created, 'for', file, "setting to '1969'");
			created = '01 January 1969';
		}
	}
	creators = creators.replace(/,/g, ' ');
	/*
	var creatorArray = creators.split(/ *, *|,?and |.* By /);
	for (var c in creatorArray) {
		if (creatorArray[c].trim() !== "") {
			console.log(created.trim()+"\t"+creatorArray[c].trim());
		}
	}
	*/
	console.log(created+"\t"+creators+"\t"+file);
});
