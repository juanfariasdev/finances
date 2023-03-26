const graph = document.getElementById("Valores");

const data = {
  labels: ["Entrada", "Saida"],
  datasets: [
    {
      label: "Valor",
      data: [0, 0],

      backgroundColor: ["#485ACD", "#F05896"],
      borderWidth: 0,
      cutout: 110,
    },
  ],
};

const chart = new Chart(graph, {
  type: "doughnut",
  data,
  options: {
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          color: "rgb(255, 255, 255)",
        },
      },
    },
    parsing: {
      key: "nested.value",
    },
  },
});

export function updateGraph({ entrada, saida, total }) {
  chart.data.datasets.forEach((dataset, idx) => {
    dataset.data = [entrada, saida];
  });
  chart.update();
}
