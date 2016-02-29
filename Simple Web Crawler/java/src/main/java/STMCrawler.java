import java.io.*;
import java.util.*;
import java.util.stream.*;
import org.multiverse.api.references.*;
import org.multiverse.commitbarriers.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import static org.multiverse.api.StmUtils.*;

class STMCrawler{

  final TxnRef<Set<String>> visitedSet = newTxnRef(Collections.unmodifiableSet(new HashSet<>()));
  final TxnInteger taskCount = newTxnInteger(1);
  final ExecutorService pool = Executors.newFixedThreadPool(100); 
  Exception exceptionOccurred = null;
  
  public boolean updateVisitedSet(String url){
    return atomic( ()-> { 
      if(!visitedSet.atomicGet().contains(url)){
        Set<String> tempSet = Stream.concat(visitedSet.get().stream(), Stream.of(url))
                                    .collect(Collectors.toSet());
	visitedSet.set(Collections.unmodifiableSet(tempSet));
	return true;
      }
      return false;
    });
  }

  public void taskSchedule(String url){
    taskCount.atomicIncrementAndGet(1);
    pool.execute(()->crawlerTasks(url));
  }
  
  public void crawlerTasks(String url){
    try{
      List<String> toVisitUrl =  new Parser().parser(url); 
      toVisitUrl.stream()
                .filter(nextUrl -> updateVisitedSet(nextUrl))
                .collect(Collectors.toSet())
                .forEach(scheduleUrl -> taskSchedule(scheduleUrl));
      taskCount.atomicIncrementAndGet(-1);
    }
    catch(Exception ex){
      exceptionOccurred = ex;
      taskCount.atomicSet(0);
    }
  }

  public int stmCrawler(String url){
    try{
      crawlerTasks(url);
      atomic(()->{
        if(taskCount.get() != 0)
          retry();
      });
      pool.shutdown(); 
      if(exceptionOccurred != null)
        throw exceptionOccurred;
    }
    catch(Exception ex){
      System.out.println(ex.getMessage());
    }
    return visitedSet.atomicGet().size() + 1;
  }

}
