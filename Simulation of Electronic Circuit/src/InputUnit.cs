namespace ElectronicCircuitProblem.src
{
	public class InputUnit : Gates
	{
		private Bus outputBus = null;
			
		public override bool IsValid() {
			return outputBus != null;
		}
		
		public void AddOutput(Bus output)
		{
			outputBus = output;
		}
		
		public override int GetCurrentState()
		{
			return 1;
		}
		
	}
}