var glob = require('glob');
var fs = require('fs');

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

glob('www.web3d.org/x3d/content/examples/**/*.json', function( err, files ) {
	if (err) return;
	console.log("date\tauthor");
	files.forEach(function(file) {
		// console.log(file);
		var created = "";
		var modified = "";
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
			created = modified;
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
		console.log(created+"\t"+creators);
	});
});

