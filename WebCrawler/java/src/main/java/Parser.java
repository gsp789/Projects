import java.util.*;
import java.io.*;
import java.util.stream.*;
import org.jsoup.Connection.*;
import org.jsoup.Connection.Response;
import org.jsoup.Jsoup;
import org.jsoup.helper.Validate;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Parser{

  public static List<String> parser(String url){    
    List<String> toVisit = new ArrayList<>();
    try{
      Document page = Jsoup.connect(url).timeout(0).get();
      Elements links = page.select("a[href]");      
      toVisit = links.stream()
                     .map(link -> link.attr("abs:href"))
                     .collect(Collectors.toList());
    }
    catch(Exception ex){
      throw new RuntimeException(ex);
    }
    return toVisit;
  }
  
}