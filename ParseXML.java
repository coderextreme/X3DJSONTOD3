import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
import java.util.*;
import java.io.*;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.parsers.SAXParser;
import com.google.gson.stream.JsonWriter;

class SaxHandler extends DefaultHandler {

    private JsonWriter writer = null;

    public SaxHandler(JsonWriter writer) {
	this.writer = writer;
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
}    

public class ParseXML {
    public static void main (String argv []) {
        SAXParserFactory factory = SAXParserFactory.newInstance();
        try {
            SAXParser      saxParser = factory.newSAXParser();
	    JsonWriter writer = new JsonWriter(new OutputStreamWriter(System.out, "UTF-8"));
            SaxHandler handler   = new SaxHandler(writer);
            writer.setIndent("\t");
            saxParser.parse(System.in, handler);
            writer.close();
        } catch (Throwable err) {
            err.printStackTrace ();
        }
    }
}
