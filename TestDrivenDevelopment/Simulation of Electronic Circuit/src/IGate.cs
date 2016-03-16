namespace ElectronicCircuitProblem.src
{
	public interface IGate
	{
		bool IsValid();
		void Simulate();
		void UpdateCurrentState();
		int GetCurrentState();
	}
}