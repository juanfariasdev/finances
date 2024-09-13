import { History } from "./class/history.js";
import { reloadStatus } from "./utils/loadStatus.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const inflow = document.getElementById("inflow");
const outflow  = document.getElementById("outflow");
const form = document.getElementById("formAdd");

form.addEventListener("submit", formSubmit);

// Carrega o histórico existente ao carregar a página
History.allHistoryItems.forEach((item) => {
  addItemToDOM(item);
});
attachRemoveEvent();
reloadStatus();

// Função para submeter o formulário
function formSubmit(e) {
  e.preventDefault();
  const formData = getFormData();

  if (!validateFormData(formData)) return;

  const newItem = {
    id: uuidv4(),
    title: formData.title,
    description: formData.description? formData.description : "",
    amount: parseFloat(formData.amount),
    category: formData.category,
  };

  History.newHistory(newItem);
  addItemToDOM(newItem);
  attachRemoveEvent();
  reloadStatus();
  form.reset();
}

// Função para obter os dados do formulário
function getFormData() {
  const title = form.querySelector("input[name='title']").value;
  const description = form.querySelector("input[name='description']").value;
  const amount = form.querySelector("input[name='amount']").value;
  const category = form.querySelector("select[name='category']").value;


  return { title, description, amount, category };
}

// Função de validação de dados
function validateFormData({ title, amount, category }) {
  if (!title) {
    alert("Preencha o título por favor!");
    return false;
  }
  
  if (!category) {
    alert("Preencha a categoria por favor!");
    return false;
  }

  if (!amount || isNaN(parseFloat(amount))) {
    alert("Preencha o valor com um número válido!");
    return false;
  }
  

  return true;
}

// Adiciona um novo item ao DOM
function addItemToDOM(item) {
  const isInflow = item.amount > 0;

  const itemTemplate = createItemTemplate(item);
if(isInflow) inflow.insertAdjacentHTML('beforeend', itemTemplate);
else outflow.insertAdjacentHTML('beforeend', itemTemplate);
}

// Cria o template HTML para um item
function createItemTemplate({ id, title, description, amount, category }) {
  return `
    <li class="item" data-id="${id}">
      <div class="info">
        <h3 class="title">${title}</h3>
        <h4 class="value">R$ ${amount.toFixed(2)}</h4>
        
      </div>
      <div class="desc">
      <div>
          <p>${description}</p>
          <p class="category">Categoria: <span>${category}</span></p>
        </div>
        <div class="function">
          <button class="remove">Remover</button>
        </div>
      </div>
    </li>`;
}

// Anexa o evento de remoção aos botões
function attachRemoveEvent() {
  const btns = document.querySelectorAll(".remove");
  btns.forEach((btn) => {
    btn.removeEventListener("click", removeItemByID);  // Remove eventos duplicados
    btn.addEventListener("click", removeItemByID);
  });
}

// Função para remover um item pelo ID
function removeItemByID(e) {
  if (confirm("Deseja mesmo remover?")) {
    const item = e.target.closest(".item");
    const valueId = item.getAttribute("data-id");

    History.removeItemByID(valueId);
    item.remove();
    reloadStatus();
  }
}
