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
