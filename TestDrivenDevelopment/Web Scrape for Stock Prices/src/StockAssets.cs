using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StockAssetsProblem.src
{
    public class StockAssets
    {  
     public IAssetService assetService { get; set; }

        public static double CalculateNetAssetValue(double priceOfEachShare, int numberOfShares)
        {
            return (priceOfEachShare > 0 && numberOfShares > 0) ? priceOfEachShare * numberOfShares : 0;
        }

        public static double CalculateTotalNetAssets(List<double> netAssets)
        {
            return (netAssets.Count > 0) ? netAssets.Where(price => price > 0).Sum() : 0.0;
        }

        public Dictionary<string, double> CalculateTotalAssetsForInputSymbol(Dictionary<string, int> inputDictValues)
        {
            Dictionary<string, double> myValues = new Dictionary<string, double>();
            
            foreach (var assetKeys in inputDictValues)
            {
                double priceOfShare = assetService.GetPrice(assetKeys.Key);
                double netAssetsPrice = StockAssets.CalculateNetAssetValue(priceOfShare, assetKeys.Value);
                myValues.Add(assetKeys.Key, netAssetsPrice);
            }
            double TotalAssetValues = CalculateTotalNetAssets(new List<double>(myValues.Values));
            myValues.Add("TotalAssetValues", TotalAssetValues);
            return myValues;
        }
        			
		}
}