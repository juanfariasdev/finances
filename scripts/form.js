import { observerArray } from "./utils/observer.js";

const history = document.getElementById("history");

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

History.newHistory({
  id: 1,
  title: "Titlefunction",
  description: "Description",
  amount: 12.0,
});
History.newHistory({
  id: 2,
  title: "Titlefunction",
  description: "Description",
  amount: 12.0,
});
History.newHistory({
  id: 3,
  title: "Titlefunction",
  description: "Description",
  amount: -12.0,
});
export const totalHistory = {
  total: History.total,
  cashInput: History.cashInput,
  cashOutput: History.cashOutput,
};

console.log(History.allHistoryItems);
console.log(History.total);
console.log(History.cashInput);
console.log(History.cashOutput);

class historyItema {
  create({ id, title, description, amount }) {
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

    history.innerHTML += historyItem;
  }
}
