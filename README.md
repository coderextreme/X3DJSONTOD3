Requirements:
	Node.js 0.10
	Java SDK 8 (or lower, not sure)
	GSON 2.3.1 JAR (please fetch your own and place in this folder under the name gson-2.3.1.jar, sorry, I can't send zipped jars through gmail)
	Set up the environmental variable JAVA_HOME to your Java SDK folder
	like:
	export JAVA_HOME /Library/Java/JavaVirtualMachines/jdk1.8.0_25.jdk/Contents/Home
	on MacOSX

	or
	set JAVA_HOME=C:\... on Windows

If you `./run.sh ExtrusionHeart.x3d` in the folder created, it will produce
	output.json, which is the converted from ExtrusionHeart.x3d
	tohtml.js, which is converted from output.json into a suitable format for inclusion in an HTML5 web page (change the first select('body') 'body' parameter to something other css selector or tag)

heart.xhtml is an example of an X3DOM file converted to D3X3DOM.  Note that there are bugs in it because I based the heart on X3D instead of X3DOM.  Good luck


run.bat is untested.  Testers are welcome
