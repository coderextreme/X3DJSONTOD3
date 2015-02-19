%JAVA_HOME%\bin\javac -cp .;gson-2.3.1.jar ParseXML.java
%JAVA_HOME%\bin\java -cp .;gson-2.3.1.jar ParseXML < ExtrusionHeart.x3d > ExtrusionHeart.json
node X3DJSONTOD3.js < ExtrusionHeart.json > ExtrusionHeart.js
%JAVA_HOME%\bin\java -cp .;gson-2.3.1.jar ParseXML < geoComponent.x3d > geoComponent.json
node X3DJSONTOD3.js < geoComponent.json > geoComponent.js
