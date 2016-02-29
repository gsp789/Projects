using System;
using NUnit.Framework;
using ElectronicCircuitProblem.src;

namespace ElectronicCircuitProblem.test
{
  [TestFixture]
  public class NotTest
  {
	private Not not;
	
	public Bus GetBusInstance()
	{
		return new Bus(new Not(), new Not());
	}

	[SetUp]
	public void init()
	{
		not = new Not();
	}
	
	[Test]
	public void Canary()
	{
	  Assert.IsTrue(true);
	}

	[Test]
	public void IsNotValidWithNoInputNotOutput()
	{
		Assert.IsFalse(not.IsValid());
	}
	
	[Test]
	public void IsNotValidWithOneInputAndNoOutput()
	{
		not.AddInput(GetBusInstance());
		Assert.IsFalse(not.IsValid());
	}
	
	[Test]
	public void IsNotValidWithTwoInputsAndNoOutput()
	{
		not.AddInput(GetBusInstance());
		not.AddInput(GetBusInstance());
		
		Assert.IsFalse(not.IsValid());
	}
	
	[Test]
	public void IsNotValidWithTwoInputsAndOutput()
	{
		not.AddOutput(GetBusInstance());
		not.AddInput(GetBusInstance());
		not.AddInput(GetBusInstance());
		
		Assert.IsTrue(not.IsValid());
	}
	
	[Test]
	public void IsNotValidWithOneInputAndOutput()
	{
		not.AddInput(GetBusInstance());
		not.AddOutput(GetBusInstance());
		
		Assert.IsTrue(not.IsValid());
	}
	
	[Test]
	public void DoesSimulateWork()
	{
		InputUnit input = new InputUnit();
		Not not = new Not();
		Bus bus = new Bus(input, not);
		not.AddInput(bus);
		input.AddOutput(bus);
		
		not.Simulate();
		Assert.AreEqual( 0, not.nextState);
	}
	
	[Test]
	public void DoesUpdateCurrentStateWork()
	{
		InputUnit input = new InputUnit();
		Not not = new Not();
		Bus bus = new Bus(input, not);
		not.AddInput(bus);
		input.AddOutput(bus);
		
		not.Simulate();
		not.UpdateCurrentState();
		Assert.AreEqual( 0, not.currentState);
	}
		
  }
}