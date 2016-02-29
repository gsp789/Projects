import scala.io.Source
import java.net.URL
import akka.actor.Actor
import akka.actor.ActorRef
import akka.actor.ActorSystem
import akka.actor.Props
import akka.actor.UntypedActor
import akka.routing._

case object RequestAURL
case class URLCount()
case class crawl(url : String)
case class reportException(ex: Exception)

class SlaveActor extends Actor {

  def getURL(senderRef : ActorRef) = { 
    senderRef ! RequestAURL 
  }

  def getLinks(pageContent:String) : List[String] = {
    """href=.{1,20}.html""".r
                           .findAllIn(pageContent)
                           .toList
                           .map(str => str.substring(6))
  }

  def parse(url: String): List[String] =
  {
    val pageContent = Source.fromURL(url).mkString
    val subLinks: List[String] = getLinks(pageContent)
    val links  = subLinks.map(link => new URL(new URL(url), link).toString)
    links
  }

  def receive = 
  {	
    case crawl(url) =>  val senderRef : ActorRef = sender
			try{
                          val sublinks : List[String] = parse(url)
                          sublinks.foreach { link => senderRef ! crawl(link) }
                          senderRef ! URLCount()
                          getURL(senderRef)
                        }
			catch{
                          case exceptionObj : Exception => senderRef ! reportException(exceptionObj)
			}
  }
}

class MasterActor extends Actor {
  var toVisitURLs = List.empty[String]
  var visitedURLs = List.empty[String]
  var slaveActor:ActorRef = context.actorOf(RoundRobinPool(125).props(Props[SlaveActor]), "workerRouter")
  var pendingNumberOfURLsToVisit = 0
  val start = System.nanoTime()
	
  def sendURL() : Unit = {
                          try{
                            if(!toVisitURLs.isEmpty) {
                              slaveActor ! crawl(toVisitURLs.head)
                              toVisitURLs = toVisitURLs.tail
                            }
                          }
                          catch{
                            case exceptionObj : Exception => self ! reportException(exceptionObj) 
                          } 
  }
 
  override def receive = {
    case RequestAURL => sendURL()
    case crawl(url) =>  try{
                          if(!visitedURLs.contains(url)) {
                            visitedURLs = url :: visitedURLs
                            toVisitURLs = url :: toVisitURLs
                            pendingNumberOfURLsToVisit += 1
                            sendURL()
                          }
			}
			catch{
                          case exceptionObj : Exception => self ! reportException(exceptionObj)
			}
    case URLCount() =>try{
			pendingNumberOfURLsToVisit -= 1
			if(pendingNumberOfURLsToVisit == 0) {
                          val end = System.nanoTime()
                          println("Using Actors: " + visitedURLs.size + " Time : " + (end - start)/1.0e9)
                          context.system.terminate()
			}
                      }
                      catch{
                        case exceptionObj : Exception => self ! reportException(exceptionObj)
                      }
    case reportException(ex) => context.system.terminate()
				println("Exception Occured:" + ex)
  }
}

object WebCrawler {

  def main(args:Array[String]): Unit =
  {
    try{
      val url: String = "http://www.cs.uh.edu/~svenkat/fall2014pl/samplepages/"
      println("Url : " + url)
      val system = ActorSystem("CrawlerSystem")
      val masterActor = system.actorOf(Props[MasterActor], name = "masteractor")
      masterActor ! crawl(url)
    }
    catch{
      case exceptionObj : Exception => println("exceptionObj")
    }
  }
}

