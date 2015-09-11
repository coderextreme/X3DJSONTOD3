JSON2D3_HOME=/Users/johncarlson/Source/X3DJSONTOD3
JAVA_HOME=/usr

all: 
	-rm json.log
	( for i in `find X3dForWebAuthors/. -name '*.x3d'`; do \
		cat $$i | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML  | node compress.js >> json.log; \
	 done)

clean:
	-rm ExtrusionHeart.js ExtrusionHeart.json *.radial geoComponent.js geoComponent.json radial.js radial.json *.class *.2.html *.3.html *.2.x3d *.2.json HelloWorld.json HelloWorld.js DolphinMorpher.js DolphinMorpher.json output/DolphinMorpher.2.x3d output/DolphinMorpher.3.html output/DolphinMorpher.radial output/HelloWorld.2.x3d output/HelloWorld.3.html output/HelloWorld.radial

java:
	${JAVA_HOME}/bin/javac -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ${JSON2D3_HOME}/ParseXML.java ${JSON2D3_HOME}/D3Input.java

TestJson: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < TestJsonEncoding.x3d > TestJsonEncoding.json

Script: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < ScriptControlEvents.x3d > ScriptControlEvents.json

pp3: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < pp3.x3d > pp3.json
	echo "Creating JavaScript..."
	node JSON2D3.js < pp3.json > pp3.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat pp3.json | node JSON2D3.js; echo  '</html>'; ) > pp3.2.html
	node JWCSON2X3D.js < pp3.json > pp3.2.x3d
	-diff pp3.x3d pp3.2.x3d

fish: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < CircleFishPrototype.x3d > CircleFishPrototype.json 
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < CircleFishPrototype.x3d > CircleFishPrototype.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < CircleFishPrototype.json > CircleFishPrototype.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat CircleFishPrototype.json | node JSON2D3.js; echo  '</html>'; ) > CircleFishPrototype.2.html
	node JWCSON2X3D.js < CircleFishPrototype.json > CircleFishPrototype.2.x3d
	-diff CircleFishPrototype.x3d CircleFishPrototype.2.x3d
	cat CircleFishPrototype.2.x3d | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML > CircleFishPrototype.2.json

geo: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < geoComponent.x3d > geoComponent.json
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < geoComponent.x3d > geoComponent.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < geoComponent.json > geoComponent.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat geoComponent.json | node JSON2D3.js; echo  '</html>'; ) > geoComponent.2.html
	node JWCSON2X3D.js < geoComponent.json > geoComponent.2.x3d
	-diff geoComponent.x3d geoComponent.2.x3d
	cat geoComponent.2.x3d | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML > geoComponent.2.json

HelloWorld: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < HelloWorld.x3d > HelloWorld.json
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < HelloWorld.x3d > HelloWorld.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < HelloWorld.json > HelloWorld.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat HelloWorld.json | node JSON2D3.js; echo  '</html>'; ) > HelloWorld.2.html
	./run.sh HelloWorld.x3d
	node JWCSON2X3D.js < HelloWorld.json > HelloWorld.2.x3d
	diff HelloWorld.x3d HelloWorld.2.x3d
	cat HelloWorld.2.x3d | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML > HelloWorld.2.json

DolphinMorpher: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < DolphinMorpher.x3d > DolphinMorpher.json
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < DolphinMorpher.x3d > DolphinMorpher.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < DolphinMorpher.json > DolphinMorpher.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat DolphinMorpher.json | node JSON2D3.js; echo  '</html>'; ) > DolphinMorpher.2.html
	./run.sh DolphinMorpher.x3d
	node JWCSON2X3D.js < DolphinMorpher.json > DolphinMorpher.2.x3d
	diff DolphinMorpher.x3d DolphinMorpher.2.x3d
	cat DolphinMorpher.2.x3d | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML > DolphinMorpher.2.json

Sphere: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < Sphere.x3d > Sphere.json
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < Sphere.x3d > Sphere.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < Sphere.json > Sphere.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat Sphere.json | node JSON2D3.js; echo  '</html>'; ) > Sphere.2.html
	./run.sh Sphere.x3d
	node JWCSON2X3D.js < Sphere.json > Sphere.2.x3d
	diff Sphere.x3d Sphere.2.x3d
	cat Sphere.2.x3d | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML > Sphere.2.json

heart: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < ExtrusionHeart.x3d > ExtrusionHeart.json
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < ExtrusionHeart.x3d > ExtrusionHeart.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < ExtrusionHeart.json > ExtrusionHeart.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat ExtrusionHeart.json | node JSON2D3.js; echo  '</html>'; ) > ExtrusionHeart.2.html
	node JWCSON2X3D.js < ExtrusionHeart.json > ExtrusionHeart.2.x3d
	--diff ExtrusionHeart.x3d ExtrusionHeart.2.x3d
	cat ExtrusionHeart.2.x3d | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML > ExtrusionHeart.2.json

radial: java
	cat radial.html | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML > radial.json
	cat radial.html | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input > radial.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < radial.json > radial.js
	(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat radial.json | node JSON2D3.js; echo  '</html>'; ) > radial.2.html
	node JWCSON2X3D.js < radial.json > radial.3.html
	-diff radial.html radial.3.html
	cat radial.3.html | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML > radial.2.json

dist: java
	rm *.class
	( cd ${JSON2D3_HOME}/..;  tar -czf X3DJSONTOD3.tar.gz X3DJSONTOD3; zip -r X3DJSONTOD3.zip X3DJSONTOD3/*)
