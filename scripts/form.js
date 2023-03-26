import { observerArray } from "./utils/observer.js";

const history = document.getElementById("history");
const form = document.getElementById("formAdd");
class historyItem {
  constructor({ id, title, description, amount }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.amount = amount;
    this.date = new Date();
  }
}
class historyItemList {
  constructor() {
    this.historyItems = [];
    this.listHistory = document.getElementById("history");

    observerArray(this.historyItems);
  }

  newHistory({ id, title, description, amount }) {
    let item = new historyItem({ id, title, description, amount });
    this.historyItems.push(item);
    return item;
  }
  get allHistoryItems() {
    return this.listHistory;
  }
  get total() {
    const total = this.historyItems.reduce(
      (prev, current) => prev + current.amount,
      0
    );
    return total;
  }
  get cashInput() {
    const total = this.historyItems.reduce((prev, current) => {
      if (current.amount > 0) return prev + current.amount;
      return prev;
    }, 0);
    return total;
  }
  get cashOutput() {
    const total = this.historyItems.reduce((prev, current) => {
      if (current.amount < 0) return prev + current.amount;
      return prev;
    }, 0);
    return total;
  }
}

let History = new historyItemList();

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

createHistory({
  id: 1,
  title: "History",
  description: "History description",
  amount: 12.0,
});

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
    amount: parseFloat(amount.value).toFixed(2),
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
export const totalHistory = {
  total: History.total,
  cashInput: History.cashInput,
  cashOutput: History.cashOutput,
};
