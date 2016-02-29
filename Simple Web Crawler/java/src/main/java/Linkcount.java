import java.io.*;
import java.util.function.Supplier; 
import java.util.*;     

public class Linkcount {

  public static void main(String[] args){
    String url = "http://www.cs.uh.edu/~svenkat/fall2014pl/samplepages";
	    
    System.out.println("\nUrl: " + url);
    List<Long> result = timeCode(()->new SequentialCrawler().sequentialCrawler(url, new HashSet<>(Arrays.asList(url))));
    System.out.println("\nSequential: " + result.get(0) + " Time : " + ((double)(result.get(1)) / 1000) + " (s)");
 
    result = timeCode(()->new ConcurrentCrawler().concurrentCrawler(url));
    System.out.println("\nConcurrent: " + result.get(0) + " Time : " + ((double)(result.get(1)) / 1000) + " (s)\n");

    result = timeCode(()->new STMCrawler().stmCrawler(url));
    System.out.println("\nUsing STM: " + result.get(0) + " Time : " + ((double)(result.get(1)) / 1000) + " (s)");
  }    

  public static List<Long> timeCode(Supplier<Integer> functionCall){
    long startTime = System.currentTimeMillis();
    int result = functionCall.get();
    long endTime = System.currentTimeMillis();
    return(Arrays.asList((long)result, (endTime - startTime)));
  }
}
 