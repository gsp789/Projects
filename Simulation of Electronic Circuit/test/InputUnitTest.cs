using NUnit.Framework;
using ElectronicCircuitProblem.src;

namespace ElectronicCircuitProblem.test
{
	[TestFixture]
	public class InputUnitTest
	{
		private InputUnit input;
		
		[Test]
		public void Canary()
		{
			Assert.IsTrue(true);
		}
		
		[SetUp]
		public void init()
		{
			input = new InputUnit();
		}
		
		[Test]
		public void testInputUnitNoOutputBusConnected()
		{
			Assert.IsFalse(input.IsValid());
		}
		
		[Test]
		public void testInputUnitWithOutputBusConnected()
		{
			input.AddOutput(new Bus(new And(), new And()));
			Assert.IsTrue(input.IsValid());
		}
		
		[Test]
		public void testInputUnitWithMultipleOutputBuses()
		{
			input.AddOutput(new Bus(new And(), new And()));
			input.AddOutput(new Bus(new And(), new And()));
			Assert.IsTrue(input.IsValid());
		}
		
		[Test]
		public void DoesSimulateWork()
		{
			InputUnit input = new InputUnit();
			
			input.Simulate();
			Assert.AreEqual( 1, input.nextState);
		}
		
		[Test]
		public void DoesUpdateCurrentStateWork()
		{
			InputUnit input = new InputUnit();
			
			input.Simulate();
			input.UpdateCurrentState();
			Assert.AreEqual( 1, input.currentState);
		}
	}
}