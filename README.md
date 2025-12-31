USE EXTERNAL STYLESHEETS and SCRIPTS
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

	run:
	
	make

	to build everything

`run.bat` should do both of the above, but there are no guarantees

Additional files
```
	* ExtrusionHeart.x3d X3D example file
	* geoComponent.x3d X3D extracted from x3dom_geoComponent.html
	* geofiles web files for x3dom_geoComponent2.html
	* gson-2.3.1.jar GSON library files
	* heart.xhtml XHTML file for heart
	* run.bat is untested.  Testers are welcome
	* run.sh main build script
	* x3dom_geoComponent2.html  HTML file for component example
	* ParseXML.java converts X3D XML to coderextreme's JSON
	* D3Input.java converts X3D XML to JSON suitable for D3 hierarchical input
	* JSON2D3.js converts JSON to JS (safe)
	* X3DJSONTOD3.js converts JSON to JS (dangerous)
	* CARLSON2X3D.js converts special JSON format to  XMLX3D
	* JSON2X3D.js converts X3D JSON format to X3D XML
	* JWCSON2X3D.js converts coderextreme's JSON format to X3DXML
	* X3DJSONLD.js loads X3D JSON into a web browser
```

There are missing images from the component example
