const ctx = document.getElementById("Valores");
const totalDom = document.getElementById("total");
const entradaDom = document.getElementById("entrada");
const saidaDom = document.getElementById("saida");

const entrada = 200;
const saida = 100;

const total = entrada - saida;

totalDom.innerHTML = total.toFixed(2);
entradaDom.innerHTML = entrada.toFixed(2);
saidaDom.innerHTML = saida.toFixed(2);

const data = {
  labels: ["Entrada", "Saida"],
  datasets: [
    {
      label: "Valor",
      data: [entrada, saida],

      backgroundColor: ["#485ACD", "#F05896"],
      borderWidth: 0,
      cutout: 110,
    },
  ],
};

new Chart(ctx, {
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
