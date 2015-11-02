#!/bin/bash
echo > errors.txt
find ~/Downloads/www.web3d.org/x3d/content/examples/ -name '*.json' -print0 |xargs -0 node ValidatingJSON.js 
for file in `find ~/Downloads/www.web3d.org/x3d/content/examples/ -name '*.json' -print0 |xargs -0 node FindErrors.js`
do
	echo $file >> errors.txt
	jsonlint --quiet $file 2>> errors.txt
done
