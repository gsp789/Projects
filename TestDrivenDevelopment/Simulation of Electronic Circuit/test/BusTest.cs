using ElectronicCircuitProblem.src;
using NUnit.Framework;

namespace ElectronicCircuitProblem.test
{
	[TestFixture]
	public class BusTest
	{
		private Bus busObj;
		
		[Test]
		public void Canary()
		{
			Assert.IsTrue(true);
		}
		
		
		
		[Test]
		public void testIsBusValidWithInputAndOutputGates()
		{
			busObj = new Bus(new And(), new And());
			Assert.IsTrue(busObj.IsValid());
		}
		
		[Test]
		public void testIsBusValidWithInputAndTwoOutputGates()
		{
			busObj = new Bus(new And(), new And());
			Assert.IsTrue(busObj.IsValid());
		}
		
		[Test]
		public void testIsBusValidWithInputAndThreeOutputGates()
		{
			busObj = new Bus(new And(), new And(), new And(), new And());
			Assert.IsFalse(busObj.IsValid());
		}
		
		[Test]
		public void DoesSimulateWork()
		{
			InputUnit input = new InputUnit();
			And and = new And();
			Bus bus = new Bus(input, and, and);
			
			bus.Simulate();
			Assert.AreEqual( 1, bus.nextState);
		}
		
		[Test]
		public void DoesUpdateCurrentStateWork()
		{
			InputUnit input = new InputUnit();
			And and = new And();
			Bus bus = new Bus(input, and, and);
			
			bus.Simulate();
			bus.UpdateCurrentState();
			Assert.AreEqual( 1, bus.currentState);
		}
	}
}