using System;
using NUnit.Framework;
using ElectronicCircuitProblem.src;

namespace ElectronicCircuitProblem.test
{
  [TestFixture]
  public class OrTest
  {
	private Or or;
	
	public Bus GetBusInstance()
	{
		return new Bus(new Or(), new Or());
	}

	[SetUp]
	public void init()
	{
		or = new Or();
	}
	
	[Test]
	public void Canary()
	{
	  Assert.IsTrue(true);
	}

	[Test]
	public void IsOrValidWithNoInputAndOutput()
	{
		Assert.IsFalse(or.IsValid());
	}
	
	[Test]
	public void IsOrValidWithOneInputAndNoOutput()
	{
		or.AddInput(GetBusInstance());
		Assert.IsFalse(or.IsValid());
	}
	
	[Test]
	public void IsOrValidWithTwoInputsAndNoOutput()
	{
		or.AddInput(GetBusInstance());
		or.AddInput(GetBusInstance());
		
		Assert.IsFalse(or.IsValid());
	}
	
	[Test]
	public void IsOrValidWithTwoInputsAndOutput()
	{
		or.AddOutput(GetBusInstance());
		or.AddInput(GetBusInstance());
		or.AddInput(GetBusInstance());
		
		Assert.IsTrue(or.IsValid());
	}
	
	[Test]
	public void IsOrValidWithOneInputAndOutput()
	{
		or.AddInput(GetBusInstance());
		or.AddOutput(GetBusInstance());
		
		Assert.IsFalse(or.IsValid());
	}
	
	[Test]
	public void DoesSimulateWork()
	{
		InputUnit input = new InputUnit();
		Or or = new Or();
		Bus bus = new Bus(input, or, or);
		or.AddInput(bus, bus);
		input.AddOutput(bus);
		
		or.Simulate();
		Assert.AreEqual( 1, or.nextState);
	}
	
	[Test]
	public void DoesUpdateCurrentStateWork()
	{
		InputUnit input = new InputUnit();
		Or or = new Or();
		Bus bus = new Bus(input, or, or);
		or.AddInput(bus, bus);
		input.AddOutput(bus);
		
		or.Simulate();
		or.UpdateCurrentState();
		Assert.AreEqual( 1, or.currentState);
	}
		
  }
}