export function observerArray(arr) {
  addObserverMethods("push", arr, alterouEstadoPush);
  addObserverMethods("pop", arr, alterouEstadoPop);
}

// recebe o novo estado do array
function alterouEstadoPush(state) {
  console.log('Alterou o estado via "push".');
  //   console.log("Novo estado: ", state);
}

// recebe o novo estado do array
function alterouEstadoPop(state) {
  console.log('Alterou o estado via "pop".');
  //   console.log("Novo estado: ", state);
}

/**
 *
 * @param method método a ser adicionado a funcao observadora
 * @param array array que terá observadores em seu método
 * @param callback funcao a ser chamada após chamada do método de `array`
 */
function addObserverMethods(method, array, callback) {
  // métodos autorizados para observadores
  const methods = ["pop", "push"];

  // verificacao de seguranca
  if (typeof method !== "string") {
    throw new TypeError('The "method" param must be string');
  }

  // verifica se o método é permitido
  if (!methods.includes(method)) {
    throw new Error("Method not allowed. Use one of these: " + methods);
  }

  Object.defineProperty(array, method, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (...args) {
      const result = Array.prototype[method].apply(this, args);

      // passa o valor do novo estado para as funcoes observadoras
      callback(this);

      return result;
    },
  });
}
