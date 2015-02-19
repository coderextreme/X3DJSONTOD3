#!/bin/bash
${JAVA_HOME}/bin/javac -cp .:gson-2.3.1.jar ParseXML.java D3Input.java
FILE="$1"
${JAVA_HOME}/bin/java -cp .:gson-2.3.1.jar D3Input < "$FILE" > "$FILE"_skel.json
${JAVA_HOME}/bin/java -cp .:gson-2.3.1.jar ParseXML < "$FILE" > "$FILE".json
rm *.class
node JSON2D3.js < "$FILE".json > "$FILE".js
cd ..
tar -czf X3DJSONTOD3.tar.gz X3DJSONTOD3
zip -r X3DJSONTOD3.zip X3DJSONTOD3/*
