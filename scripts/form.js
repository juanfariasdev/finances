import { History } from "./class/history.js";
import { reloadStatus } from "./utils/loadStatus.js";
const history = document.getElementById("history");
const form = document.getElementById("formAdd");
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

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

  const btns = document.querySelectorAll(".remove");
  btns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      removeItemByID(event);
    });
  });
  reloadStatus();
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
    id: uuidv4(),
    title: title.value,
    description: description.value,
    amount: parseFloat(amount.value),
  });
  form.reset();
}

function createItemTemplate({ id, title, description, amount }) {
  const historyItem = `
      <li class="item" data-id="${id}">
      <div class="info">
        <h3 class="title">${title}</h3>
        <h4 class="value">R$ ${amount.toFixed(2)}</h4>
      </div>
      <div class="desc">
        <p>
          ${description}
        </p>
        <div class="function"><button class="remove">remove</button></div>
      </div>
    </li>`;

  return historyItem;
}

export function removeItemByID(e) {
  if (confirm("deseja mesmo remover?")) {
    const item = e.target.parentElement.parentElement.parentElement;
    const valueId = item.attributes["data-id"].value;
    console.log(valueId);

    History.removeItemByID(valueId);
    item.remove();
  }
  reloadStatus();
}

History.allHistoryItems.forEach((item)=> {
const itemTemplate = createItemTemplate(item)
history.innerHTML += itemTemplate;
})
const btns = document.querySelectorAll(".remove");
btns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    removeItemByID(event);
  });
});
reloadStatus();

