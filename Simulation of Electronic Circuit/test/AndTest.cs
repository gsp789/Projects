using System;
using NUnit.Framework;
using ElectronicCircuitProblem.src;

namespace ElectronicCircuitProblem.test
{
  [TestFixture]
  public class AndTest
  {
	private And and;
	
	public Bus GetBusInstance()
	{
		return new Bus(new And(), new And());
	}

	[SetUp]
	public void init()
	{
		and = new And();
	}
	
	[Test]
	public void Canary()
	{
	  Assert.IsTrue(true);
	}

	[Test]
	public void IsAndValidWithNoInputAndOutput()
	{
		Assert.IsFalse(and.IsValid());
	}
	
	[Test]
	public void IsAndValidWithOneInputAndNoOutput()
	{
		and.AddInput(GetBusInstance());
		Assert.IsFalse(and.IsValid());
	}
	
	[Test]
	public void IsAndValidWithTwoInputsAndNoOutput()
	{
		and.AddInput(GetBusInstance());
		and.AddInput(GetBusInstance());
		
		Assert.IsFalse(and.IsValid());
	}
	
	[Test]
	public void IsAndValidWithTwoInputsAndOutput()
	{
		and.AddOutput(GetBusInstance());
		and.AddInput(GetBusInstance());
		and.AddInput(GetBusInstance());
		
		Assert.IsTrue(and.IsValid());
	}
	
	[Test]
	public void IsAndValidWithOneInputAndOutput()
	{
		and.AddInput(GetBusInstance());
		and.AddOutput(GetBusInstance());
		
		Assert.IsFalse(and.IsValid());
	}
	
	[Test]
	public void DoesSimulateWork()
	{
		InputUnit input = new InputUnit();
		And and = new And();
		Bus bus = new Bus(input, and, and);
		and.AddInput(bus, bus);
		input.AddOutput(bus);
		
		and.Simulate();
		Assert.AreEqual( 1, and.nextState);
	}
	
	[Test]
	public void DoesUpdateCurrentStateWork()
	{
		InputUnit input = new InputUnit();
		And and = new And();
		Bus bus = new Bus(input, and, and);
		and.AddInput(bus, bus);
		input.AddOutput(bus);
		
		and.Simulate();
		and.UpdateCurrentState();
		Assert.AreEqual( 1, and.currentState);
	}
		
  }
}