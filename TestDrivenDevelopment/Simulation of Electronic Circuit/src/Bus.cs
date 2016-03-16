using System.Collections.Generic;
using System;
using ElectronicCircuitProblem.src;

namespace ElectronicCircuitProblem.src
{
	public class Bus
	{
		public int currentState { get; private set; }
		public int nextState { get; private set; }
		private IGate inputGate = null; 
		private List<IGate> outputGate = new List<IGate>();
		
		public Bus(IGate input, params IGate[] output) 
		{
			inputGate = input;
			Array.ForEach(output, obj => outputGate.Add(obj));
		}
		
		public bool IsValid()
		{
			return (inputGate != null && outputGate.Count > 0 && outputGate.Count < 3) ? true : false;
		}
		
		public void Simulate()
		{
			nextState = inputGate.GetCurrentState();
		}
		
		public void UpdateCurrentState()
		{
			currentState = nextState;
		}
		
		public int GetCurrentState()
		{
			return inputGate.GetCurrentState();
		}
		
	}
}