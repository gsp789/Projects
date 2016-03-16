using System;

namespace ElectronicCircuitProblem.src
{
	public abstract class Gates: IGate
	{
		public int nextState { get; private set; }
		public int currentState { get; private set; }
		
		public abstract bool IsValid();
		
		public void Simulate()
		{
			nextState = GetCurrentState();
		}
		
		public void UpdateCurrentState()
		{
			currentState = nextState;
		}
		
		public abstract int GetCurrentState();
	}
}