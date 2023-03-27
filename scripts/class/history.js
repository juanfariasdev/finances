import { observerArray } from "../utils/observer.js";

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
    const historys = JSON.parse(localStorage.getItem('Finances'));

    this.historyItems = historys.length> 0? historys: [];
    this.listHistory = document.getElementById("history");

    observerArray(this.historyItems);
  }

  newHistory({ id, title, description, amount }) {
    let item = new historyItem({ id, title, description, amount });
    this.historyItems.push(item);

    localStorage.setItem('Finances', JSON.stringify(this.historyItems));
    return item;
  }
  removeItemByID(id) {
    const list = this.historyItems.filter((item) => item.id !== id);
    this.historyItems = list;

    localStorage.setItem('Finances', JSON.stringify(this.historyItems));
  }
  get allHistoryItems() {
    return this.historyItems;
  }
  get total() {
    const total = this.historyItems.reduce(
      (prev, current) => prev + current.amount,
      0
    );
    const totalFixed = total.toFixed(2);
    return totalFixed;
  }
  get cashInput() {
    const total = this.historyItems.reduce((prev, current) => {
      if (current.amount > 0) {
        return prev + current.amount;
      }
      return prev + 0;
    }, 0);

    const totalFixed = total.toFixed(2);
    return totalFixed;
  }
  get cashOutput() {
    const total = this.historyItems.reduce((prev, current) => {
      if (current.amount < 0) return prev + current.amount;
      return prev + 0;
    }, 0);
    const totalFixed = total.toFixed(2);
    return totalFixed;
  }
}

export let History = new historyItemList();
