using NUnit.Framework;
using StockAssetsProblem.src;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;

namespace StockAssetsProblem.test
{
	[TestFixture]
	public class IAssetServiceTest
	{
		const double DELTA = 1e-6;
		YahooAssetService testServiceClass = new YahooAssetService();

		[Test]
		public void Canary()
		{
		  Assert.IsTrue(true);
	  }

		[Test]
		public void testGetPriceForInputStream()
		{
				string sampleData = "Date,Open,High,Low,Close,Volume,Adj Close\n'10/13/2015',35.76,36.24,35.53,35.63,237.54,35.63";
				byte[] byteArray = Encoding.ASCII.GetBytes(sampleData);
				MemoryStream stream = new MemoryStream(byteArray);

				Assert.AreEqual(35.63, testServiceClass.GetPriceForInputStream(new StreamReader(stream)));
		}
			
		[Test]
		public void testGetPriceWithStockSymbol()
		{
		  string symbol = "A";
		  Assert.Greater(testServiceClass.GetPrice(symbol), 0.0);
		}

		[Test]
		public void testGetPriceInvalidSymbol()
		{
		  string symbol = "BZ234";
			Assert.AreEqual(testServiceClass.GetPrice(symbol), 0.0);
		}
	
	}
}
