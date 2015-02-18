%JAVA_HOME%\bin\javac -cp .;gson-2.3.1.jar ParseXML.java
%JAVA_HOME%\bin\java -cp .;gson-2.3.1.jar ParseXML < ExtrusionHeart.x3d > output.json
node X3DJSONTOD3.js < output.json > tohtml.js
