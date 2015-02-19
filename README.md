Requirements:
	* Node.js 0.10
	* Java SDK 8 (or lower, not sure)
	* GSON 2.3.1 JAR
		Please fetch your own and place in this folder under the
		name gson-2.3.1.jar, sorry, I can't send zipped jars through
		gmail.  I have included one on github, but it's use is subject
		to the BSD license and Apache license included.  GSON is
		available here: https://code.google.com/p/google-gson/

	Set up the environmental variable JAVA_HOME to your Java SDK folder
	like:
	`export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_25.jdk/Contents/Home`
	on MacOSX

	or
	`set JAVA_HOME=C:\... on Windows`

If you `./run.sh ExtrusionHeart.x3d` in the folder created, it will produce
	* ExtrusionHeart.json, which is the converted from ExtrusionHeart.x3d
	* ExtrusionHeart.js, which is converted from ExtrusionHeart.json into a suitable format for inclusion in an HTML5 web page (change the first select('body') 'body' parameter to something other css selector or tag)

If you `./run.sh geoComponent.x3d` in the folder created, it will produce
	* geoComponent.js, converted from geoComponent.json
	* geoComponent.json, converted from geoComponent.x3d

`run.bat` should do both of the above, but there are no guarantees


Additional files
	* ExtrusionHeart.x3d X3D example file
	* JSON2D3.js converts JSON to JS (safe)
	* ParseXML.java converts XML to JSON
	* X3DJSONTOD3.js converts JSON to JS (dangerous)
	* geoComponent.x3d X3D extracted from x3dom_geoComponent.html
	* geofiles web files for x3dom_geoComponent2.html
	* gson-2.3.1.jar GSON library files
	* heart.xhtml XHTML file for heart
	* run.bat is untested.  Testers are welcome
	* run.sh main build script
	* x3dom_geoComponent2.html  HTML file for component example

There are missing images from the component example

When run.sh is run, a tar and zip of the contents of the folder is placed in the folder above
