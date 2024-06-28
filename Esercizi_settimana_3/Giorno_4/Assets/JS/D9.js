const numbers = []; // Array per contenere tutti i numeri generati
const cellCount = 90; // Numero totale di celle nel tabellone

// Funzione per creare la griglia del tabellone
const creaCell = (numberCells) => {
  const tabelloneDiv = document.getElementById("tabellone");

  // Ciclo per creare ogni cella del tabellone
  for (let i = 0; i < numberCells; i++) {
    // Crea un div per la cella
    const tabCellDiv = document.createElement("div");
    tabCellDiv.classList.add("number");

    // Crea l'elemento che conterrà il numero della cella
    const cellValue = document.createElement("h3");
    cellValue.innerText = `${i + 1}`; // Imposta il testo del numero

    // Aggiunge il numero alla cella
    tabCellDiv.appendChild(cellValue);

    // Aggiunge la cella al tabellone
    tabelloneDiv.appendChild(tabCellDiv);

    // Aggiunge il numero all'array 'numbers'
    numbers.push(i + 1);
  }

  // Stampa l'array 'numbers' nella console
  console.log(numbers);
};

// Funzione per generare una nuova scheda con 15 numeri casuali
const generateScheda = () => {
  // Crea un div per la scheda
  const schedaDiv = document.createElement("div");
  schedaDiv.classList.add("scheda");

  // Array per contenere i numeri della scheda
  let schedaNumbers = [];

  // Genera 15 numeri casuali unici
  while (schedaNumbers.length < 15) {
    const randomNum = Math.floor(Math.random() * cellCount) + 1; // Genera un numero casuale tra 1 e 90
    if (!schedaNumbers.includes(randomNum)) {
      schedaNumbers.push(randomNum); // Aggiunge il numero all'array se non è già presente
    }
  }

  // Ordina i numeri della scheda in ordine crescente
  schedaNumbers.sort((a, b) => a - b);

  // Crea le celle della scheda con i numeri generati
  for (let i = 0; i < 15; i++) {
    const numDiv = document.createElement("div");
    numDiv.classList.add("number");
    numDiv.innerText = schedaNumbers[i]; // Imposta il testo del numero
    schedaDiv.appendChild(numDiv);

    // Aggiunge un'interruzione di riga dopo ogni 5 numeri
    if ((i + 1) % 5 === 0) {
      schedaDiv.appendChild(document.createElement("br"));
    }
  }

  // Aggiunge la scheda generata al contenitore delle schede
  document.getElementById("schedeList").appendChild(schedaDiv);
};

// Funzione per estrarre un numero casuale e oscurare le celle corrispondenti nel tabellone e nelle schede
const estraiNumero = () => {
  // Seleziona tutte le celle del tabellone
  const allNumbersTabellone = document.querySelectorAll(
    "#tabellone .number h3"
  );
  // Seleziona tutte le celle delle schede
  const allNumbersSchede = document.querySelectorAll("#schedeList .number");

  // Genera un indice casuale per selezionare un numero dal tabellone
  const randomIndex = Math.floor(Math.random() * allNumbersTabellone.length);
  // Ottiene il numero selezionato
  const selectedNumber = allNumbersTabellone[randomIndex].innerText;

  // Controlla se il numero selezionato esiste
  if (selectedNumber) {
    // Oscura le celle del tabellone che contengono il numero selezionato
    allNumbersTabellone.forEach((number) => {
      if (number.innerText === selectedNumber) {
        number.parentElement.style.backgroundColor = "black";
      }
    });

    // Oscura le celle delle schede che contengono il numero selezionato
    allNumbersSchede.forEach((number) => {
      if (number.innerText === selectedNumber) {
        number.style.backgroundColor = "black";
      }
    });
  }
};

// Funzione di inizializzazione che viene chiamata al caricamento della pagina
window.addEventListener("load", init);

function init() {
  // Crea il tabellone con 90 celle
  creaCell(cellCount);

  // Aggiunge un event listener al pulsante 'Aggiungi' per generare nuove schede
  document.getElementById("btnAggiungi").addEventListener("click", () => {
    // Ottiene il numero di schede da generare
    const numberOfSchede = document.getElementById("addSchede").value;
    // Genera il numero di schede specificato
    for (let i = 0; i < numberOfSchede; i++) {
      generateScheda();
    }
  });

  // Aggiunge un event listener al pulsante 'Estrai Numero' per estrarre numeri casuali
  document.getElementById("btnEstrai").addEventListener("click", estraiNumero);
}
