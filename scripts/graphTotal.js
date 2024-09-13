const graph = document.getElementById("Valores");

const data = {
  labels: ["Entrada", "Saída"],
  datasets: [
    {
      label: "Valor",
      data: [0, 0],  // Inicia com 0
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
  },
});

// Função para atualizar o gráfico
export function updateGraph({ entrada, saida }) {
  chart.data.datasets[0].data = [entrada, saida];  // Atualiza os dados diretamente
  chart.update();  // Atualiza o gráfico
}
