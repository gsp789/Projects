using System.Collections.Generic;
using System;
using System.Linq;
namespace ElectronicCircuitProblem.src
{
	public class Circuit
	{
		private List<IGate> gates = new List<IGate>();
		private List<Bus> buses = new List<Bus>();
		
		public bool IsValid()
		{
			return gates.Aggregate(true, (result, gate) => result ? gate.IsValid(): result )  &&
				   buses.Aggregate(true, (result, bus) => result ? bus.IsValid(): result );
		}
		
		public void AddBuses(params Bus[] inputBuses)
		{
			Array.ForEach(inputBuses, bus => buses.Add(bus));
		}
		
		public void AddGates(params IGate[] inputGates)
		{
			Array.ForEach(inputGates, gate => gates.Add(gate));
		}
		
		public void Simulate()
		{
			gates.ForEach( gate => gate.Simulate());
			buses.ForEach(bus => bus.Simulate());
			gates.ForEach(gate => gate.UpdateCurrentState());
			buses.ForEach(bus => bus.UpdateCurrentState());
		}		
	}
}
