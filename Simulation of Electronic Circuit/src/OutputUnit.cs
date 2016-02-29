namespace ElectronicCircuitProblem.src
{
	public class OutputUnit : Gates
	{
		private Bus inputBus = null;
		
		public override bool IsValid() {
			return inputBus != null;
		}
			
		public void AddInput(Bus input)
		{
			inputBus = input;
		}
		
		public override int GetCurrentState()
		{
			return inputBus.GetCurrentState();
		}
		
	}
}