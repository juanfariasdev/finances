import { reloadStatus } from "./loadStatus.js";

export function observerArray(arr) {
  // Observa o método push
  addObserverMethods("push", arr, handlePushEvent);
  
  // Observa o método pop
  addObserverMethods("pop", arr, handlePopEvent);
}

// Função de callback para o evento push
function handlePushEvent(newState) {
  console.log('O array foi modificado via "push".');
  reloadStatus();
}

// Função de callback para o evento pop
function handlePopEvent(newState) {
  console.log('O array foi modificado via "pop".');
  reloadStatus();
}

/**
 * Função que adiciona observadores aos métodos de array
 * @param {string} method - Método a ser observado (ex: "push", "pop")
 * @param {Array} array - Array ao qual o observador será anexado
 * @param {Function} callback - Função a ser chamada após a alteração no array
 */
function addObserverMethods(method, array, callback) {
  // Lista de métodos permitidos para observação
  const allowedMethods = ["pop", "push"];

  // Valida se o parâmetro method é uma string
  if (typeof method !== "string") {
    throw new TypeError('O parâmetro "method" deve ser uma string');
  }

  // Verifica se o método está na lista de métodos permitidos
  if (!allowedMethods.includes(method)) {
    throw new Error(`Método não permitido. Use um dos seguintes: ${allowedMethods.join(", ")}`);
  }

  // Define um novo comportamento para o método observado
  Object.defineProperty(array, method, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (...args) {
      // Executa o método original do array
      const result = Array.prototype[method].apply(this, args);

      // Executa o callback com o novo estado do array
      callback(this);

      return result; // Retorna o resultado original do método
    },
  });
}
