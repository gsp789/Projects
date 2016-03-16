using NUnit.Framework;
using ElectronicCircuitProblem.src;

namespace ElectronicCircuitProblem.test
{
	[TestFixture]
	public class OutputUnitTest
	{
		private OutputUnit output;
		
		[Test]
		public void Canary()
		{
			Assert.IsTrue(true);
		}
		
		[SetUp]
		public void init()
		{
			output = new OutputUnit();
		}
		
		[Test]
		public void testOutputUnitNoOutputBusConnected()
		{
			Assert.IsFalse(output.IsValid());
		}
		
		[Test]
		public void testOutputUnitWithOutputBusConnected()
		{
			output.AddInput(new Bus(new And(), new And()));
			Assert.IsTrue(output.IsValid());
		}
		
		[Test]
		public void testOutputUnitWithMultipleOutputBuses()
		{
			output.AddInput(new Bus(new And(), new And()));
			output.AddInput(new Bus(new And(), new And()));
			Assert.IsTrue(output.IsValid());
		}
		
		[Test]
		public void DoesSimulateWork()
		{
			InputUnit input = new InputUnit();
			And and = new And();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(input, and, and);
			Bus bus2 = new Bus(and, output);
			and.AddInput(bus1, bus1);
			and.AddOutput(bus2);
			output.AddInput(bus2);
			input.AddOutput(bus1);
			
			output.Simulate();
			Assert.AreEqual( 1, output.nextState);
		}
		
		[Test]
		public void DoesUpdateCurrentStateWork()
		{
			InputUnit input = new InputUnit();
			And and = new And();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(input, and, and);
			Bus bus2 = new Bus(and, output);
			and.AddInput(bus1, bus1);
			and.AddOutput(bus2);
			output.AddInput(bus2);
			input.AddOutput(bus1);
			
			output.Simulate();
			output.UpdateCurrentState();
			Assert.AreEqual( 1, output.currentState);
		}
	}
}