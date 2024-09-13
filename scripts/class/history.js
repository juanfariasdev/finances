import { finaceKey } from "../../data/keys.js";
import { observerArray } from "../utils/observer.js";

// Classe que define um item do histórico
class HistoryItem {
  constructor({ id, title, description, amount, category }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.amount = amount;
    this.category = category;

    this.date = new Date();  // Data de criação do item
  }
}

// Classe que gerencia a lista de itens do histórico
class HistoryItemList {
  constructor() {
    this.historyItems = this.loadFromStorage();
    this.listHistory = document.getElementById("history");

    observerArray(this.historyItems);
  }

  // Carrega o histórico do LocalStorage
  loadFromStorage() {
    const history = JSON.parse(localStorage.getItem(finaceKey)) || [];
    return history.length > 0 ? history : [];
  }

  // Salva o histórico no LocalStorage
  saveToStorage() {
    localStorage.setItem(finaceKey, JSON.stringify(this.historyItems));
  }

  // Adiciona um novo item ao histórico
  newHistory({ id, title, description, amount, category }) {
    const item = new HistoryItem({ id, title, description, amount, category });
    this.historyItems.push(item);

    this.saveToStorage();  // Atualiza o LocalStorage
    return item;
  }

  // Remove um item do histórico pelo ID
  removeItemByID(id) {
    this.historyItems = this.historyItems.filter(item => item.id !== id);
    this.saveToStorage();  // Atualiza o LocalStorage
  }

  // Retorna todos os itens do histórico
  get allHistoryItems() {
    return this.historyItems;
  }

  // Calcula o valor total (entrada - saída)
  get total() {
    return this.calculateTotal().toFixed(2);
  }

  // Calcula o total de entradas
  get cashInput() {
    return this.calculateAmountByType('input').toFixed(2);
  }

  // Calcula o total de saídas
  get cashOutput() {
    return this.calculateAmountByType('output').toFixed(2);
  }

  // Função privada para calcular o total (interno)
  calculateTotal() {
    return this.historyItems.reduce((acc, item) => acc + item.amount, 0);
  }

  // Função privada para calcular entradas ou saídas
  calculateAmountByType(type) {
    return this.historyItems.reduce((acc, item) => {
      if (type === 'input' && item.amount > 0) {
        return acc + item.amount;
      } else if (type === 'output' && item.amount < 0) {
        return acc + item.amount;
      }
      return acc;
    }, 0);
  }
}

// Exporta uma instância da lista de histórico
export let History = new HistoryItemList();
