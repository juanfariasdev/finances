import { History } from "../class/history.js";
import { updateGraph } from "../graphTotal.js";

const totalDom = document.getElementById("total");
const entradaDom = document.getElementById("entrada");
const saidaDom = document.getElementById("saida");

export function reloadStatus() {
  totalDom.innerHTML = History.total;
  entradaDom.innerHTML = History.cashInput;
  saidaDom.innerHTML = History.cashOutput;

  updateGraph({
    total: History.total,
    entrada: History.cashInput,
    saida: History.cashOutput * -1,
  });
}
