#!/bin/bash
${JAVA_HOME}/bin/javac -cp .:gson-2.3.1.jar ParseXML.java
# ${JAVA_HOME}/bin/java -cp .:gson-2.3.1.jar ParseXML < HAnimPrototypes.x3d > hanim.json
FILE=`basename "$1" .x3d`
${JAVA_HOME}/bin/java -cp .:gson-2.3.1.jar ParseXML < "$FILE".x3d > "$FILE".json
rm *.class
node JSON2D3.js < "$FILE".json > "$FILE".js
cd ..
tar -czf X3DJSONTOD3.tar.gz X3DJSONTOD3
zip -r X3DJSONTOD3.zip X3DJSONTOD3/*
