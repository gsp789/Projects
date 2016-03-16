using System;
using System.IO;
using StockAssetsProblem.src;
using System.Collections.Generic;

namespace StockAssetsProblem.ui {

  public class StockRun {
	
	   public static void displayStockAssetDetails(Dictionary<string, int> stocks, Dictionary<string, double> netAssets)
        {
            Console.WriteLine("Symbol      Shares      NetAssetValue");
            Console.WriteLine("---------------------------------");
            foreach (var pair in stocks)
            {
                if (netAssets[pair.Key] > 0.0)
                    Console.WriteLine(pair.Key + "       " + pair.Value+"       " + netAssets[pair.Key]);
            }
            Console.WriteLine("---------------------------------");
            Console.WriteLine("TotalAssets:   "+ netAssets["TotalAssetValues"]);

            Console.WriteLine("\nErrors:");
            Console.WriteLine("---------------------------------");
            foreach(var errorStocks in YahooAssetService.error_ReadingStocks)
            {
                    Console.WriteLine(errorStocks);
            }
        }
		
		public static void Main(String[] args) {
			try
			{
				string[] input = System.IO.File.ReadAllLines("ui\\InputStockSymbols.txt");
				Dictionary<string, int> stocks = new Dictionary<string, int>();
				foreach(string line in input)
				{
					string[] inputs = line.Split(',');
					stocks.Add(inputs[0], int.Parse(inputs[1]));
				}
				
				StockAssets stockAssetObj = new StockAssets();
				stockAssetObj.assetService=new YahooAssetService();
				Dictionary<string, double> netAssets = stockAssetObj.CalculateTotalAssetsForInputSymbol(stocks);
        StockRun.displayStockAssetDetails(stocks, netAssets);
			}
			catch(Exception ex)
			{
				Console.WriteLine(ex.Message);
			}
		}
  }
}