using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ElectronicCircuitProblem.src;
using System.Windows.Forms;

namespace ElectronicCircuitProblem
{
    public partial class CircuitSimulation : Form
    {
        public CircuitSimulation()
        {
            InitializeComponent();
        }

        private void btnSimulate1_Click(object sender, EventArgs e)
        {
            InputUnit input1 = new InputUnit();
            InputUnit input2 = new InputUnit();
            InputUnit input3 = new InputUnit();
            And gate1 = new And();
            And gate2 = new And();
            OutputUnit output = new OutputUnit();
            Bus bus1 = new Bus(input1, gate1);
            Bus bus2 = new Bus(input2, gate1);
            Bus bus3 = new Bus(input3, gate2);
            Bus bus4 = new Bus(gate1, gate2);
            Bus bus5 = new Bus(gate2, output);
            gate1.AddInput(bus1, bus2);
            gate2.AddInput(bus3, bus4);
            gate1.AddOutput(bus4);
            gate2.AddOutput(bus5);
            input1.AddOutput(bus1);
            input2.AddOutput(bus2);
            input3.AddOutput(bus3);
            output.AddInput(bus5);
            Circuit circuit = new Circuit();
            circuit.AddGates(gate1, gate2, input1, input2, input3, output);
            circuit.AddBuses(bus1, bus2, bus3, bus4, bus5);
            if(circuit.IsValid())
            {
                circuit.Simulate();
                if(output.currentState==1)
                {
                    picOutput1.ImageLocation = @"..\..\src\GUI\Images\OnBulb.jpg";
                }
                else
                {
                    picOutput1.ImageLocation = @"..\..\src\GUI\Images\OffBulb.jpg";
                }
            }
            else
            {
                picOutput1.ImageLocation = @"..\..\src\GUI\Images\InvalidCircuit.png";
            }
        }

        private void btnSimulate2_Click(object sender, EventArgs e)
        {
            InputUnit input1 = new InputUnit();
            InputUnit input2 = new InputUnit();
            Or gate1 = new Or();
            Not gate2 = new Not();
            OutputUnit output = new OutputUnit();
            Bus bus1 = new Bus(input1, gate1);
            Bus bus2 = new Bus(input2, gate1);
            Bus bus3 = new Bus(gate1, gate2);
            Bus bus4 = new Bus(gate2, output);
            gate1.AddInput(bus1, bus2);
            gate2.AddInput(bus3);
            gate1.AddOutput(bus3);
            gate2.AddOutput(bus4);
            input1.AddOutput(bus1);
            input2.AddOutput(bus2);
            output.AddInput(bus4);
            Circuit circuit = new Circuit();
            circuit.AddGates(gate1, gate2, input1, input2, output);
            circuit.AddBuses(bus1, bus2, bus3, bus4);
            if(circuit.IsValid())
            {
                circuit.Simulate();
                if(output.currentState==1)
                {
                    picOutput2.ImageLocation = @"..\..\src\GUI\Images\OnBulb.jpg";
                }
                else
                {
                    picOutput2.ImageLocation = @"..\..\src\GUI\Images\OffBulb.jpg";
                }

            }
            else
            {
                picOutput2.ImageLocation = @"..\..\src\GUI\Images\InvalidCircuit.png";
            }
        }

       
    }
}
