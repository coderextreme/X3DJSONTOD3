import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
import java.util.*;
import java.io.*;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.parsers.SAXParser;
import com.google.gson.stream.JsonWriter;

class D3InputSaxHandler extends DefaultHandler {

    private JsonWriter writer = null;

    public D3InputSaxHandler(JsonWriter writer) {
	this.writer = writer;
    }

    public void startElement(String uri, String localName,
        String qName, Attributes attributes) throws SAXException {
	try {
			writer.beginObject();
			writer.name("name").value(qName);
			writer.name("size").value("1");
			writer.name("children");
			writer.beginArray();
	} catch (IOException e) {
		e.printStackTrace();
	}
    }

    public void endElement(String uri, String localName,
        String qName) throws SAXException {
	try {
		writer.endArray();
		writer.endObject();
	} catch (IOException e) {
		e.printStackTrace();
	}
    }

    public void characters(char ch[], int start, int length)
        throws SAXException {

	String value = new String(ch, start, length).trim();
        if(value.length() == 0) return; // ignore white space
	try {
		writer.value(value);
	} catch (IOException e) {
		e.printStackTrace();
	}
    }

    public void comment(char ch[], int start, int length)
        throws SAXException {

	String value = new String(ch, start, length).trim();
        if(value.length() == 0) return; // ignore white space
	try {
		writer.value(value);
	} catch (IOException e) {
		e.printStackTrace();
	}
    }
}    

public class D3Input {
    public static void main (String argv []) {
        SAXParserFactory factory = SAXParserFactory.newInstance();
        try {
            SAXParser      saxParser = factory.newSAXParser();
	    JsonWriter writer = new JsonWriter(new OutputStreamWriter(System.out, "UTF-8"));
            D3InputSaxHandler handler   = new D3InputSaxHandler(writer);
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
