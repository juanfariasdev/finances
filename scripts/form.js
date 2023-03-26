import { History } from "./class/history.js";
import { reloadStatus } from "./utils/loadStatus.js";
const history = document.getElementById("history");
const form = document.getElementById("formAdd");

function createHistory(props) {
  const { id, title, description, amount } = props;
  History.newHistory({
    id,
    title,
    description,
    amount,
  });

  const itemTemplate = createItemTemplate(props);
  history.innerHTML += itemTemplate;
}

form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();

  const elmts = form.getElementsByTagName("input");
  const { title, description, amount } = elmts;

  if (title.value.length === 0) {
    alert("Preencha o titulo por favor!");
    throw new Error("Titulo vazio");
  }
  if (description.value.length === 0) {
    alert("Preencha a descrição por favor!");
    throw new Error("Descrição vazia");
  }
  if (amount.value.length === 0) {
    alert("Preencha o valor!");
    throw new Error("Valor vazio");
  }

  if (isNaN(parseFloat(amount.value))) {
    alert("Preencha o valor com um número válido");
    throw new Error("Valor inválido");
  }
  createHistory({
    id: 1,
    title: title.value,
    description: description.value,
    amount: parseFloat(amount.value),
  });

  console.log({
    total: History.total,
    cashInput: History.cashInput,
    cashOutput: History.cashOutput,
  });
}

function createItemTemplate({ id, title, description, amount }) {
  const historyItem = `
      <li class="item" data-id="${id}">
      <div class="info">
        <h3 class="title">${title}</h3>
        <h4 class="value">R$ ${amount}</h4>
      </div>
      <div class="desc">
        <p>
          ${description}
        </p>
        <div class="function">funcoes</div>
      </div>
    </li>`;

  return historyItem;
}
reloadStatus();
