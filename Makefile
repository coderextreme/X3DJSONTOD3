JSON2D3_HOME=/Users/johncarlson/X3DJSONTOD3

all: clean java HelloWorld geo heart radial DolphinMorpher dist java

clean:
	-rm ExtrusionHeart.js ExtrusionHeart.json ExtrusionHeart.radial geoComponent.js geoComponent.json geoComponent.radial radial.js radial.json radial.radial *.class *.2.html

java:
	${JAVA_HOME}/bin/javac -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ${JSON2D3_HOME}/ParseXML.java ${JSON2D3_HOME}/D3Input.java

geo: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < geoComponent.x3d > geoComponent.json
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < geoComponent.x3d > geoComponent.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < geoComponent.json > geoComponent.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat geoComponent.json | node JSON2D3.js; echo  '</html>'; ) > geoComponent.2.html
	cp geoComponent.radial ~/sses-node-example/public/radial.json

HelloWorld: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < HelloWorld.x3d > HelloWorld.json
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < HelloWorld.x3d > HelloWorld.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < HelloWorld.json > HelloWorld.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat HelloWorld.json | node JSON2D3.js; echo  '</html>'; ) > HelloWorld.2.html
	cp HelloWorld.radial ~/sses-node-example/public/radial.json
	./run.sh HelloWorld.x3d

DolphinMorpher: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < DolphinMorpher.x3d > DolphinMorpher.json
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < DolphinMorpher.x3d > DolphinMorpher.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < DolphinMorpher.json > DolphinMorpher.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat DolphinMorpher.json | node JSON2D3.js; echo  '</html>'; ) > DolphinMorpher.2.html
	cp DolphinMorpher.radial ~/sses-node-example/public/radial.json
	./run.sh DolphinMorpher.x3d

heart: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < ExtrusionHeart.x3d > ExtrusionHeart.json
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < ExtrusionHeart.x3d > ExtrusionHeart.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < ExtrusionHeart.json > ExtrusionHeart.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat ExtrusionHeart.json | node JSON2D3.js; echo  '</html>'; ) > ExtrusionHeart.2.html
	cp ExtrusionHeart.radial ~/sses-node-example/public/radial.json

radial: java
	cat radial.html | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML > radial.json
	cat radial.html | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input > radial.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < radial.json > radial.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat radial.json | node JSON2D3.js; echo  '</html>'; ) > radial.2.html
	cp radial.radial ~/sses-node-example/public/radial.json

dist: java
	rm *.class
	( cd ${JSON2D3_HOME}/..;  tar -czf X3DJSONTOD3.tar.gz X3DJSONTOD3; zip -r X3DJSONTOD3.zip X3DJSONTOD3/*)
