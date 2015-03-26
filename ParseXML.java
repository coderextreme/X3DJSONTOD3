import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.ext.DefaultHandler2;
import java.util.*;
import java.io.*;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.parsers.SAXParser;
import com.google.gson.stream.JsonWriter;

class SaxHandler extends DefaultHandler2 {

    private JsonWriter writer = null;

    public SaxHandler(JsonWriter writer) {
	this.writer = writer;
    }
    public void startDocument() throws SAXException {
	try {
		writer.beginArray();
	} catch (IOException e) {
		e.printStackTrace();
	}
    }
    public void endDocument() throws SAXException {
	try {
		writer.endArray();
	} catch (IOException e) {
		e.printStackTrace();
	}
    }

    public void startElement(String uri, String localName,
        String qName, Attributes attributes) throws SAXException {
	try {
		writer.beginArray();
		writer.beginObject();
		writer.name("jsontag").value(qName);
		for (int at = 0; at < attributes.getLength(); at++) {
			writer.name(attributes.getQName(at)).value(attributes.getValue(at));
		}
		writer.endObject();
	} catch (IOException e) {
		e.printStackTrace();
	}
    }

    public void endElement(String uri, String localName,
        String qName) throws SAXException {
	try {
		writer.endArray();
	} catch (IOException e) {
		e.printStackTrace();
	}
    }

    public void comment(char ch[], int start, int length)
        throws SAXException {

	String value = new String(ch, start, length);
        if(value.length() == 0) return; // ignore white space
	try {
		writer.value(value);
	} catch (IOException e) {
		e.printStackTrace();
	}
    }
    public void characters(char ch[], int start, int length)
        throws SAXException {

	String value = new String(ch, start, length);
        if(value.length() == 0) return; // ignore white space
	try {
		writer.value(value);
	} catch (IOException e) {
		e.printStackTrace();
	}
    }
}    

public class ParseXML {
    public static void main (String argv []) {
        SAXParserFactory factory = SAXParserFactory.newInstance();
        try {
            SAXParser      saxParser = factory.newSAXParser();
	    JsonWriter writer = new JsonWriter(new OutputStreamWriter(System.out, "UTF-8"));
	    XMLReader xmlReader = saxParser.getXMLReader();
            SaxHandler handler   = new SaxHandler(writer);
	    xmlReader.setProperty("http://xml.org/sax/properties/lexical-handler",
                      handler); 
            writer.setIndent("\t");
	    System.err.println("Parsing");
            saxParser.parse(System.in, handler);
	    System.err.println("Successfully parsed");
            writer.close();
        } catch (Throwable err) {
            err.printStackTrace ();
        }
    }
}
