import { History } from "../class/history.js";
import { updateGraph } from "../graphTotal.js";

const totalDom = document.getElementById("total");
const entradaDom = document.getElementById("entrada");
const saidaDom = document.getElementById("saida");

export function reloadStatus() {
  // Calcula os valores uma única vez
  const total = History.total;
  const entrada = History.cashInput;
  const saida = (History.cashOutput * -1).toFixed(2); // Multiplica por -1 para refletir saídas corretamente

  // Atualiza os valores no DOM
  totalDom.innerHTML = total;
  entradaDom.innerHTML = entrada;
  saidaDom.innerHTML = saida;

  // Atualiza o gráfico
  updateGraph({
    entrada: parseFloat(entrada),
    saida: parseFloat(saida),
  });
}
