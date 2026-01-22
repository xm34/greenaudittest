const simulationButton = document.getElementById("simulate-button");
const runSimulationButton = document.getElementById("run-simulation");
const downloadButton = document.getElementById("download-report");

const snapshotProject = document.getElementById("snapshot-project");
const snapshotClimate = document.getElementById("snapshot-climate");
const snapshotEui = document.getElementById("snapshot-eui");
const snapshotSavings = document.getElementById("snapshot-savings");

const resultEnergy = document.getElementById("result-energy");
const resultEnergyDetail = document.getElementById("result-energy-detail");
const resultDemand = document.getElementById("result-demand");
const resultDemandDetail = document.getElementById("result-demand-detail");
const resultCost = document.getElementById("result-cost");
const resultCostDetail = document.getElementById("result-cost-detail");
const resultSavings = document.getElementById("result-savings");
const resultSavingsDetail = document.getElementById("result-savings-detail");

const measuresBody = document.getElementById("measures-body");

const simulationTemplates = [
  {
    energy: "18.2 GWh",
    demand: "3.9 MW",
    cost: "$2.55M",
    savings: "23.4%",
    savingsDetail: "vs. baseline",
    measures: [
      ["High efficiency chiller upgrade", "2.1 GWh", "$296k", "4.2 years"],
      ["LED lighting retrofit", "1.4 GWh", "$180k", "2.1 years"],
      ["Advanced controls + analytics", "0.9 GWh", "$120k", "1.8 years"],
    ],
  },
  {
    energy: "16.4 GWh",
    demand: "3.2 MW",
    cost: "$2.18M",
    savings: "28.9%",
    savingsDetail: "post-ECM scenario",
    measures: [
      ["High performance glazing", "1.1 GWh", "$140k", "6.0 years"],
      ["VRF conversion", "2.6 GWh", "$355k", "3.5 years"],
      ["Smart ventilation controls", "0.7 GWh", "$90k", "1.5 years"],
    ],
  },
  {
    energy: "14.9 GWh",
    demand: "2.9 MW",
    cost: "$1.98M",
    savings: "34.1%",
    savingsDetail: "deep retrofit package",
    measures: [
      ["Heat recovery retrofit", "1.5 GWh", "$200k", "2.8 years"],
      ["All-electric boiler swap", "1.9 GWh", "$255k", "4.6 years"],
      ["Envelope air sealing", "0.6 GWh", "$80k", "2.2 years"],
    ],
  },
];

let simulationIndex = 0;

const updateTable = (measures) => {
  measuresBody.innerHTML = "";
  measures.forEach((measure) => {
    const row = document.createElement("tr");
    measure.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    measuresBody.appendChild(row);
  });
};

const updateSimulation = (formData) => {
  const simulation = simulationTemplates[simulationIndex];
  simulationIndex = (simulationIndex + 1) % simulationTemplates.length;

  const facility = formData.get("facility") || "Riverside Office Tower";
  const climate = formData.get("climate") || "ASHRAE 4A - Mixed Humid";
  const area = Number(formData.get("area")) || 245000;
  const utility = Number(formData.get("utility")) || 0.14;

  const baselineEui = (82000 / area) * 1000;

  snapshotProject.textContent = facility;
  snapshotClimate.textContent = climate;
  snapshotEui.textContent = `${baselineEui.toFixed(1)} kBtu/ft²`;
  snapshotSavings.textContent = `-${simulation.savings}`;

  resultEnergy.textContent = simulation.energy;
  resultEnergyDetail.textContent = `Modeled for ${area.toLocaleString()} ft²`;
  resultDemand.textContent = simulation.demand;
  resultDemandDetail.textContent = `Utility rate $${utility.toFixed(2)}/kWh`;
  resultCost.textContent = simulation.cost;
  resultCostDetail.textContent = "EnergyPlus cost output";
  resultSavings.textContent = simulation.savings;
  resultSavingsDetail.textContent = simulation.savingsDetail;

  updateTable(simulation.measures);
};

const handleSimulation = () => {
  const form = document.getElementById("audit-form");
  const formData = new FormData(form);
  updateSimulation(formData);
};

simulationButton.addEventListener("click", handleSimulation);
runSimulationButton.addEventListener("click", handleSimulation);

downloadButton.addEventListener("click", () => {
  const timestamp = new Date().toISOString().split("T")[0];
  alert(`Audit report for ${snapshotProject.textContent} prepared (\n${timestamp}).`);
});
