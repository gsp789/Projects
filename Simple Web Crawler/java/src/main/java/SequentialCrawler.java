import java.io.*;
import java.util.*;

public class SequentialCrawler{
  public static int sequentialCrawler(String url, Set<String> visitedSet){     
    List<String>toVisit = new Parser().parser(url);
    toVisit.forEach(link -> {
      if(!(visitedSet.contains(link))){
        visitedSet.add(link);
        sequentialCrawler(link, visitedSet);
      }
    });
    return visitedSet.size();
  }
}