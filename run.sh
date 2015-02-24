#!/bin/sh
export JSON2D3_HOME=/Users/johncarlson/X3DJSONTOD3

FILE="$1"

mkdir -p ${JSON2D3_HOME}/output
DIRFILE=${JSON2D3_HOME}/output/`basename ${FILE} .x3d`

${JAVA_HOME}/bin/javac -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ${JSON2D3_HOME}/ParseXML.java ${JSON2D3_HOME}/D3Input.java
${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ParseXML < "$FILE" > "$DIRFILE".json
${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < "$FILE" > "$DIRFILE".radial
echo "Creating JavaScript..."
node ${JSON2D3_HOME}/JSON2D3.js < "$DIRFILE".json > "$DIRFILE".js
(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat "$DIRFILE".json | node ${JSON2D3_HOME}/JSON2D3.js; echo  '</html>'; ) > "$DIRFILE".2.html
