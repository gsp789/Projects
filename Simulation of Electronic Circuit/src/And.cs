using System;
using System.Collections.Generic;
using System.Linq;

namespace ElectronicCircuitProblem.src
{
	public class And : Gates
	{
		private List<Bus> inputBus = new List<Bus>();
		private Bus outputBus = null;
		
		
		public override bool IsValid()
		{
			return (inputBus.Count == 2 && outputBus != null) ? true : false;
		}
		
		public void AddInput(params Bus[] input)
		{
			Array.ForEach(input, bus => inputBus.Add(bus) );
		}
		
		public void AddOutput(Bus output)
		{
			outputBus = output;
		}
		
		public int Evaluate()
		{
			return inputBus.Aggregate(1, (result, input) => input.GetCurrentState() & result);
		}
		
		public override int GetCurrentState()
		{
			return Evaluate();
		}
		
	}
}