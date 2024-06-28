const myList = document.getElementById("myList");
const insertItem = document.getElementById("insertItem");
const btnInsert = document.getElementById("btnInsert");
const paragraph = document.getElementById("list");
const listItems = [];
const completedItems = []; // Nuovo array per tenere traccia degli elementi barrati

btnInsert.addEventListener("click", function (e) {
  e.preventDefault();               // Prevenire la cancellazione automatica

  if (!checkInput()) return;
  popolateArray();
  printList();
  myList.reset();
  
});

function checkInput() {
  if (insertItem.value === "") {
    return false;
  } else {
    return true;
  }
}

function popolateArray() {
  listItems.push(insertItem.value);
  console.log(listItems);
}

function printList() {
  paragraph.innerHTML = "";
  for (let i = 0; i < listItems.length; i++) {
    let newLi = document.createElement("p");
    newLi.innerText = listItems[i];

    if (completedItems[i]) {                               // Verifico se l'elemento è completato richiamando l'arrey
  newLi.classList.add("completed");
    }

    newLi.addEventListener("click", function () {           // Aggiungo l'event listener per marcare come completato
      newLi.classList.toggle("completed");
      completedItems[i] = !completedItems[i];               // Toggle per lo stato completato
    });

    let btnDelete = document.createElement("button");
    btnDelete.setAttribute("type", "button");
    btnDelete.setAttribute("onclick", `deleteItem(${i});`);

    let deleteIcon = document.createElement("ion-icon");        // Creo l'icona di cancellazione
    deleteIcon.setAttribute("name", "trash-outline");
    btnDelete.appendChild(deleteIcon);

    newLi.appendChild(btnDelete);
    paragraph.appendChild(newLi);
  }
}

function deleteItem(index) {
  listItems.splice(index, 1);
  completedItems.splice(index, 1); // Rimuovo lo stato completato corrispondente
  printList();
}
