import java.util.*;
import java.util.concurrent.Callable;
import java.util.function.Supplier;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.*;
import java.util.stream.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.CountDownLatch;

class ConcurrentCrawler {

  final Set<String> visitedSet = Collections.synchronizedSet(new HashSet<>());
  final AtomicLong taskCount = new AtomicLong(1);
  final CountDownLatch latch = new CountDownLatch(1);
  final ExecutorService pool = Executors.newFixedThreadPool(100); 
  Exception exceptionOccurred = null;
  
  public void taskSchedule(String url){
    taskCount.incrementAndGet();
    pool.execute(() -> crawlerTasks(url));
  }
  
  public void crawlerTasks(String url){
    try{
      List<String> toVisitUrl = new Parser().parser(url); 
      toVisitUrl.stream()
                .filter(nextUrl -> visitedSet.add(nextUrl))		
                .collect(Collectors.toSet())
                .forEach(scheduleUrl -> taskSchedule(scheduleUrl));								
      if(taskCount.decrementAndGet() == 0 )
        latch.countDown();
    }
    catch(Exception ex){
      exceptionOccurred = ex;
      latch.countDown();
    }
  }   

  public int concurrentCrawler(String url){	
    try{
      crawlerTasks(url);
      latch.await();
      pool.shutdown(); 
      if(exceptionOccurred != null)
        throw exceptionOccurred;
    }
    catch(Exception ex){
      System.out.println(ex.getMessage());
    }
    return visitedSet.size() + 1;
  }
}