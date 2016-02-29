using System;
using System.Collections.Generic;
using System.Linq;

namespace ElectronicCircuitProblem.src
{
	public class Not : Gates
	{
		private Bus inputBus = null;
		private Bus outputBus = null;
		
		
		public override bool IsValid()
		{
			return (inputBus != null && outputBus != null) ? true : false;
		}
		
		public void AddInput(Bus input)
		{
			inputBus = input;
		}
		
		public void AddOutput(Bus output)
		{
			outputBus = output;
		}
		
		public override int GetCurrentState()
		{
			return inputBus.GetCurrentState() ^ 1;
		}
		
	}
}