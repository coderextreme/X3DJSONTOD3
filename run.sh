#!/bin/bash
${JAVA_HOME}/bin/javac -cp .:gson-2.3.1.jar ParseXML.java
# ${JAVA_HOME}/bin/java -cp .:gson-2.3.1.jar ParseXML < HAnimPrototypes.x3d > hanim.json
${JAVA_HOME}/bin/java -cp .:gson-2.3.1.jar ParseXML < "$1" > output.json
node X3DJSONTOD3.js < output.json > tohtml.js
rm *.class
cd ..
tar -czf X3DJSONTOD3.tar.gz X3DJSONTOD3/{ExtrusionHeart.x3d,ParseXML.java,README.md,X3DJSONTOD3.js,tohtml.js,output.json,heart.xhtml,run.bat,run.sh,gson-2.3.1.jar}
zip -r X3DJSONTOD3.zip X3DJSONTOD3
