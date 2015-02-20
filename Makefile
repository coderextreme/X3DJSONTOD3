JSON2D3_HOME=/Users/johncarlson/X3DJSONTOD3

all: java geo heart radial dist java

java:
	${JAVA_HOME}/bin/javac -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ${JSON2D3_HOME}/ParseXML.java ${JSON2D3_HOME}/D3Input.java

geo: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < geoComponent.x3d > geoComponent.json
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < geoComponent.x3d > geoComponent.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < geoComponent.json > geoComponent.js
	cp geoComponent.radial ~/sses-node-example/public/radial.json

heart: java
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < ExtrusionHeart.x3d > ExtrusionHeart.json
	${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < ExtrusionHeart.x3d > ExtrusionHeart.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < ExtrusionHeart.json > ExtrusionHeart.js
	cp ExtrusionHeart.radial ~/sses-node-example/public/radial.json

radial: java
	cat radial.html | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML > radial.json
	cat radial.html | sed 's/ < / \&lt; /g' | ${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input > radial.radial
	echo "Creating JavaScript..."
	node JSON2D3.js < radial.json > radial.js
	cp radial.radial ~/sses-node-example/public/radial.json

dist: java
	rm *.class
	( cd ${JSON2D3_HOME}/..;  tar -czf X3DJSONTOD3.tar.gz X3DJSONTOD3; zip -r X3DJSONTOD3.zip X3DJSONTOD3/*)
