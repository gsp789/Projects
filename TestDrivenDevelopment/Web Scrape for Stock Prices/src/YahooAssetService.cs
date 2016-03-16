using System;
using System.IO;
using System.Net;
using System.Collections.Generic;

namespace StockAssetsProblem.src
{
	public class YahooAssetService: IAssetService 
	{
	  
		public static List<string> error_ReadingStocks = new List<string>();
		
		public double GetPrice(string symbol)
		{
			double stockPrice = 0.0;
			string stockUrl = "http://ichart.finance.yahoo.com/table.csv?s=" + symbol;
			try
			{
				StreamReader stock_reader = ReadStockDetails(stockUrl);
				stockPrice = GetPriceForInputStream(stock_reader);
				stock_reader.Close();
			}
			catch (Exception ex)
			{
			  error_ReadingStocks.Add(symbol + "   Invalid stock symbol");
			}
			
			return stockPrice;			
		}
		
		public StreamReader ReadStockDetails(string stockUrl)
		{
		  return new StreamReader(new WebClient().OpenRead(stockUrl));
		}
		
		public double GetPriceForInputStream(StreamReader stock_reader)
		{
			stock_reader.ReadLine();
			double stockPrice = double.Parse(stock_reader.ReadLine().ToString().Split(',')[6]);
			return stockPrice;
		}
		
	}
}