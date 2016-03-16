using System;
using System.Collections.Generic;
using NUnit.Framework;
using ElectronicCircuitProblem.src;

namespace ElectronicCircuitProblem.src
{
	[TestFixture]
	public class CircuitTest
	{
		private Circuit circuit;
		
		[SetUp]
		public void init()
		{
			circuit = new Circuit();
		}
		
		[Test]
		public void Canary()
		{
			Assert.IsTrue(true);
		}
		
		[Test]
		public void testCircuit1()
		{
			And gate1 = new And();
			And gate2 = new And();
			InputUnit input1 = new InputUnit();
			InputUnit input2 = new InputUnit();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(gate1, gate2);
			Bus bus2 = new Bus(input1, gate1, gate1);
			Bus bus3 = new Bus(input2, gate2);
			Bus bus4 = new Bus(gate2, output);
			gate1.AddInput(bus2, bus2);
			gate1.AddOutput(bus1);
			gate2.AddInput(bus1, bus3);
			gate2.AddOutput(bus4);
			input1.AddOutput(bus2);
			input2.AddOutput(bus3);
			output.AddInput(bus4);
			circuit.AddGates(gate1, gate2, input1, input2, output);
			circuit.AddBuses(bus1, bus2, bus3, bus4);
			
			Assert.IsTrue(circuit.IsValid());
		}
		
		[Test]
		public void testCircuit1WithSimulation()
		{
			And gate1 = new And();
			And gate2 = new And();
			InputUnit input1 = new InputUnit();
			InputUnit input2 = new InputUnit();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(gate1, gate2);
			Bus bus2 = new Bus(input1, gate1, gate1);
			Bus bus3 = new Bus(input2, gate2);
			Bus bus4 = new Bus(gate2, output);
			gate1.AddInput(bus2, bus2);
			gate1.AddOutput(bus1);
			gate2.AddInput(bus1, bus3);
			gate2.AddOutput(bus4);
			input1.AddOutput(bus2);
			input2.AddOutput(bus3);
			output.AddInput(bus4);
			circuit.AddGates(gate1, gate2, input1, input2, output);
			circuit.AddBuses(bus1, bus2, bus3, bus4);
			
			circuit.Simulate();
			Assert.AreEqual( 1, output.currentState);
		}
		
		[Test]
		public void testCircuit2()
		{
			And gate1 = new And();
			And gate2 = new And();
			And gate3 = new And();
			InputUnit input1 = new InputUnit();
			InputUnit input2 = new InputUnit();
			InputUnit input3 = new InputUnit();
			InputUnit input4 = new InputUnit();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(gate1, gate3);
			Bus bus2 = new Bus(gate2, gate3);
			Bus bus3 = new Bus(input1, gate1);
			Bus bus4 = new Bus(input2, gate1);
			Bus bus5 = new Bus(input3, gate2);
			Bus bus6 = new Bus(input4, gate2);
			Bus bus7 = new Bus(gate3, output);
			gate1.AddInput(bus3, bus4);
			gate1.AddOutput(bus1);
			gate2.AddInput(bus5, bus6);
			gate2.AddOutput(bus2);
			gate3.AddInput(bus1, bus2);
			gate3.AddOutput(bus7);
			input1.AddOutput(bus3);
			input2.AddOutput(bus4);
			input3.AddOutput(bus5);
			input4.AddOutput(bus6);
			output.AddInput(bus7);
			circuit.AddGates(gate1, gate2, gate3, input1, input2, input3, input4, output);
			circuit.AddBuses(bus1, bus2, bus3, bus4, bus5, bus6);
			
			Assert.IsTrue(circuit.IsValid());
		}
		
		[Test]
		public void testCircuit2WithSimulation()
		{
			And gate1 = new And();
			And gate2 = new And();
			And gate3 = new And();
			InputUnit input1 = new InputUnit();
			InputUnit input2 = new InputUnit();
			InputUnit input3 = new InputUnit();
			InputUnit input4 = new InputUnit();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(gate1, gate3);
			Bus bus2 = new Bus(gate2, gate3);
			Bus bus3 = new Bus(input1, gate1);
			Bus bus4 = new Bus(input2, gate1);
			Bus bus5 = new Bus(input3, gate2);
			Bus bus6 = new Bus(input4, gate2);
			Bus bus7 = new Bus(gate3, output);
			gate1.AddInput(bus3, bus4);
			gate1.AddOutput(bus1);
			gate2.AddInput(bus5, bus6);
			gate2.AddOutput(bus2);
			gate3.AddInput(bus1, bus2);
			gate3.AddOutput(bus7);
			input1.AddOutput(bus3);
			input2.AddOutput(bus4);
			input3.AddOutput(bus5);
			input4.AddOutput(bus6);
			output.AddInput(bus7);
			circuit.AddGates(gate1, gate2, gate3, input1, input2, input3, input4, output);
			circuit.AddBuses(bus1, bus2, bus3, bus4, bus5, bus6);
			
			circuit.Simulate();
			Assert.AreEqual( 1, output.currentState);
		}
		
		[Test]
		public void testCircuit3()
		{
			And gate1 = new And();
			And gate2 = new And();
			InputUnit input1 = new InputUnit();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(input1, gate1, gate1);
			Bus bus2 = new Bus(gate1, gate2, gate2);
			Bus bus3 = new Bus(gate2, output);
			gate1.AddInput(bus1, bus1);
			gate1.AddOutput(bus2);
			gate2.AddInput(bus2, bus2);
			gate2.AddOutput(bus3);
			input1.AddOutput(bus1);
			output.AddInput(bus3);
			circuit.AddGates(gate1, gate2, input1, output);
			circuit.AddBuses(bus1, bus2, bus3);
			
			Assert.IsTrue(circuit.IsValid());
		}
		
		[Test]
		public void testCircuit3WithSimulation()
		{
			And gate1 = new And();
			And gate2 = new And();
			InputUnit input1 = new InputUnit();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(input1, gate1, gate1);
			Bus bus2 = new Bus(gate1, gate2, gate2);
			Bus bus3 = new Bus(gate2, output);
			gate1.AddInput(bus1, bus1);
			gate1.AddOutput(bus2);
			gate2.AddInput(bus2, bus2);
			gate2.AddOutput(bus3);
			input1.AddOutput(bus1);
			output.AddInput(bus3);
			circuit.AddGates(gate1, gate2, input1, output);
			circuit.AddBuses(bus1, bus2, bus3);
			
			circuit.Simulate();
			Assert.AreEqual( 1, output.currentState);
		}
		
		[Test]
		public void testCircuit4()
		{
			And gate1 = new And();
			Not gate2 = new Not();
			InputUnit input1 = new InputUnit();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(input1, gate1, gate1);
			Bus bus2 = new Bus(gate1, gate2);
			Bus bus3 = new Bus(gate2, output);
			gate1.AddInput(bus1, bus1);
			gate1.AddOutput(bus2);
			gate2.AddInput(bus2);
			gate2.AddOutput(bus3);
			input1.AddOutput(bus1);
			output.AddInput(bus3);
			circuit.AddGates(gate1, gate2, input1, output);
			circuit.AddBuses(bus1, bus2, bus3);
			
			Assert.IsTrue(circuit.IsValid());
		}
		
		[Test]
		public void testCircuit4WithSimulation()
		{
			Or gate1 = new Or();
			Not gate2 = new Not();
			InputUnit input1 = new InputUnit();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(input1, gate1, gate1);
			Bus bus2 = new Bus(gate1, gate2);
			Bus bus3 = new Bus(gate2, output);
			gate1.AddInput(bus1, bus1);
			gate1.AddOutput(bus2);
			gate2.AddInput(bus2);
			gate2.AddOutput(bus3);
			input1.AddOutput(bus1);
			output.AddInput(bus3);
			circuit.AddGates(gate1, gate2, input1, output);
			circuit.AddBuses(bus1, bus2, bus3);
			
			circuit.Simulate();
			Assert.AreEqual( 0, output.currentState);
		}
		
		[Test]
		public void testCircuit5()
		{
			Or gate1 = new Or();
			Not gate2 = new Not();
			InputUnit input1 = new InputUnit();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(input1, gate1, gate1);
			Bus bus2 = new Bus(gate1, gate2);
			Bus bus3 = new Bus(gate2, output);
			gate1.AddInput(bus1, bus1);
			gate1.AddOutput(bus2);
			gate2.AddInput(bus2);
			gate2.AddOutput(bus3);
			input1.AddOutput(bus1);
			output.AddInput(bus3);
			circuit.AddGates(gate1, gate2, input1, output);
			circuit.AddBuses(bus1, bus2, bus3);
			
			Assert.IsTrue(circuit.IsValid());
		}
		
		[Test]
		public void testCircuit5WithSimulation()
		{
			And gate1 = new And();
			Not gate2 = new Not();
			InputUnit input1 = new InputUnit();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(input1, gate1, gate1);
			Bus bus2 = new Bus(gate1, gate2);
			Bus bus3 = new Bus(gate2, output);
			gate1.AddInput(bus1, bus1);
			gate1.AddOutput(bus2);
			gate2.AddInput(bus2);
			gate2.AddOutput(bus3);
			input1.AddOutput(bus1);
			output.AddInput(bus3);
			circuit.AddGates(gate1, gate2, input1, output);
			circuit.AddBuses(bus1, bus2, bus3);
			
			circuit.Simulate();
			Assert.AreEqual( 0, output.currentState);
		}
		
		[Test]
		public void testCircuitWithNoInputAndOutputUnits()
		{
			And gate1 = new And();
			And gate2 = new And();
			Bus bus1 = new Bus(gate1, gate2, gate2);
			gate1.AddOutput(bus1);
			gate2.AddInput(bus1, bus1);
			circuit.AddGates(gate1, gate2);
			circuit.AddBuses(bus1);
			
			Assert.IsFalse(circuit.IsValid());
		}
		
		[Test]
		public void testCircuitWithNoInputUnit()
		{
			And gate1 = new And();
			And gate2 = new And();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(gate1, gate2, gate2);
			Bus bus2 = new Bus(gate2, output);
			gate1.AddOutput(bus1);
			gate2.AddInput(bus1, bus1);
			gate2.AddOutput(bus2);
			output.AddInput(bus2);
			circuit.AddGates(gate1, gate2, output);
			circuit.AddBuses(bus1, bus2);
			
			Assert.IsFalse(circuit.IsValid());
		}
		
		[Test]
		public void testCircuitWithNoOutputUnit()
		{
			And gate1 = new And();
			And gate2 = new And();
			InputUnit input = new InputUnit();
			Bus bus1 = new Bus(gate1, gate2, gate2);
			Bus bus2 = new Bus(input, gate1, gate1);
			gate1.AddInput(bus2, bus2);
			gate1.AddOutput(bus1);
			gate2.AddInput(bus1, bus1);
			input.AddOutput(bus2);
			circuit.AddGates(gate1, gate2, input);
			circuit.AddBuses(bus1, bus2);
			
			Assert.IsFalse(circuit.IsValid());
		}
		
		[Test]
		public void testCircuitWithUnConnectedGates()
		{
			And gate1 = new And();
			And gate2 = new And();
			InputUnit input = new InputUnit();
			OutputUnit output = new OutputUnit();
			Bus bus1 = new Bus(gate2, output);
			Bus bus2 = new Bus(input, gate1, gate1);
			gate1.AddInput(bus2, bus2);
			gate2.AddOutput(bus1);
			input.AddOutput(bus2);
			output.AddInput(bus1);
			circuit.AddGates(gate1, gate2, input, output);
			circuit.AddBuses(bus1, bus2);
			
			Assert.IsFalse(circuit.IsValid());
		}
		
		
	}
}