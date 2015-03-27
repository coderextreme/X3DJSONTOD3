#!/bin/sh -x
export JSON2D3_HOME=/Users/johncarlson/X3DJSONTOD3

FILE="$1"

mkdir -p ${JSON2D3_HOME}/output
DIRFILE=${JSON2D3_HOME}/output/`basename ${FILE} .x3d`

echo "Creating JavaScript..."
(echo '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/></head><body></body>'; cat "$DIRFILE".json | node ${JSON2D3_HOME}/X3DJSONTOD3.js; echo  '</html>'; ) > "$DIRFILE".3.html
cat "$DIRFILE".json | node ${JSON2D3_HOME}/JSON2X3D.js > "$DIRFILE".2.x3d

${JAVA_HOME}/bin/javac -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar ${JSON2D3_HOME}/ParseXML.java ${JSON2D3_HOME}/D3Input.java
${JAVA_HOME}/bin/java -cp ${JSON2D3_HOME}:${JSON2D3_HOME}/gson-2.3.1.jar D3Input < "$DIRFILE".2.x3d > "$DIRFILE".radial
