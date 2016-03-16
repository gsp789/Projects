using NUnit.Framework;
using StockAssetsProblem.src;
using System;
using System.Collections.Generic;
using Rhino.Mocks;

namespace StockAssetsProblem.test
{
	[TestFixture]
	public class StockAssetsTest
	{
		const double DELTA = 1e-6;
		
		StockAssets stck_assets=new StockAssets();
		
		[Test]
		public void testNetAsset()
		{
			Assert.AreEqual(8900, StockAssets.CalculateNetAssetValue(8.9, 1000), DELTA);
		}

		[Test]
		public void testNetAssetWithInvalidShares()
		{
			Assert.AreEqual(0, StockAssets.CalculateNetAssetValue(5.2, 0));
		}

		[Test]
		public void testNetAssetWithInvalidPrice()
		{
			Assert.AreEqual(0, StockAssets.CalculateNetAssetValue(-1, 4));
		}

		[Test]
		public void testNetAssetWithInvalidPriceAndShare()
		{
			Assert.AreEqual(0, StockAssets.CalculateNetAssetValue(-1, -1));
		}
				
		[Test]
		public void testCalculateTotalAssetsNoInput()
		{
		  Dictionary<string, double> expectedOutput = new Dictionary<string, double>(){ {"TotalAssetValues", 0.0} };	  
			Dictionary<string, int> input = new Dictionary<string, int>();
		  Assert.AreEqual(expectedOutput, stck_assets.CalculateTotalAssetsForInputSymbol(input));
		}
	
		 [Test]
			public void testReadStockDetails()
			{
				List< double> expectedOutput = new List<double>() { 35.0002 };

				Dictionary<string, int> input = new Dictionary<string, int>()
																						{
																								{ "A", 100}
																						};
				IAssetService myStub = (IAssetService)MockRepository.GenerateMock<YahooAssetService>();
				stck_assets.assetService = myStub;
				Dictionary<string, double> output=stck_assets.CalculateTotalAssetsForInputSymbol(input);
				Assert.That(new List<double>(output.Values), Is.All.GreaterThan(0) );
			}
	
		 [Test]
		public void testCalculateTotalAssetsTwoInputsOneInvalid()
		{
			Dictionary<string, int> input = new Dictionary<string, int>()
																					 {
																						 { "A", 100},
																						 { "AZ2", 100}
																					 };
      stck_assets.assetService = MockRepository.GenerateMock<YahooAssetService>();
			Dictionary<string, double> output=stck_assets.CalculateTotalAssetsForInputSymbol(input);
			Assert.That(new List<double>(output.Values), Is.All.GreaterThanOrEqualTo(0));
		}
		
		[Test]
		public void testCalculateTotalAssetsOneInputValid()
		{
				Dictionary<string, int> input = new Dictionary<string, int>()
																									{
																											{ "AAPL", 100}                                                                                                                
																									};
				stck_assets.assetService = MockRepository.GenerateMock<YahooAssetService>();
				Dictionary<string, double> output = stck_assets.CalculateTotalAssetsForInputSymbol(input);
				Assert.That(new List<double>(output.Values), Is.All.GreaterThan(0));
		}

		[Test]
		public void testCalculateTotalAssetsTwoInputsValid()
		{
				Dictionary<string, int> input = new Dictionary<string, int>()
																									{
																											{ "AAPL", 100},
																											{"FAC",200}
																									};
				stck_assets.assetService = MockRepository.GenerateMock<YahooAssetService>();
				Dictionary<string, double> output = stck_assets.CalculateTotalAssetsForInputSymbol(input);
				Assert.That(new List<double>(output.Values), Is.All.GreaterThan(0));
		}				
								
		[Test]
	  public void testCalculateTotalNetAssetsNooInput()
	  {
		  List<double> input = new List<double>();
			double expectedOutput = 0.0;
			
		  Assert.AreEqual(expectedOutput, StockAssets.CalculateTotalNetAssets(input), DELTA);
	  }
		
		[Test]
		public void testCalculateTotalNetAssets()
		{
		  List<double> input = new List<double>() { 3563.0002 };
		  double expectedOutput = 3563.0002;
		 
		  Assert.AreEqual(expectedOutput, StockAssets.CalculateTotalNetAssets(input), DELTA);
		}
		
		[Test]
		public void testCalculateTotalNetAssetsTwoInputs()
		{
		  List<double> input = new List<double>() { 3599.00, 11159.99};
		  double expectedOutput = 14758.99;
			
		  Assert.AreEqual(expectedOutput, StockAssets.CalculateTotalNetAssets(input), DELTA);
		}
		
  }
}
