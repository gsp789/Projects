using System;
using System.Collections.Generic;

namespace StockAssetsProblem.src
{
	public interface IAssetService
	{
		double GetPrice(string symbol); 
	}
}
