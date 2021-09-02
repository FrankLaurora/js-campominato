var playground = document.getElementById("playground");

function battlefield(num) {
    for (var i = 1; i <= num; i++) {
        playground.innerHTML += `<div class="square">${i}</div>`
    }
}

//genero 16 numeri casuali tra 1 e 100 e li aggiungo a un array che non può contenere duplicati
var bombs = [];

function placeBombs(num)/*num è un numero compreso tra 1 e il numero di caselle del campo minato */ {
    while(bombs.length <= 16) {
        let bomb = Math.floor(Math.random() * num) + 1;
        if(!bombs.includes(bomb)) {
            bombs.push(bomb)
        }
    }
    
    return bombs;
}

//creo una variabile che a cui assegno il numero della cella cliccata
var clickedBox = playground.addEventListener("click",
    function(clicked) {
        let checkedBoxNum = parseInt(clicked.target.innerHTML);
        let checkedBox = clicked.target;
        probe(bombs, checkedBoxNum, checkedBox);
    }
);

var safeBoxes = []; /* qui verranno aggiunti, senza ripetizioni, i numeri contenuti nelle caselle cliccate che non contenevano mine*/

//genero una funzione che verifichi la presenza di checkedBoxNum in bombs e aggiunga checkedBoxNum a safeBoxes se non è presente. Se checkedBoxNum è presente in bombs la funzione genera un alert e restituisce il punteggio (la lunghezza di safeBoxes). Inoltre, cambio il colore alla casella indicata dall'argomento tag.
function probe(arr, elem, tag) {
    if(!arr.includes(elem)){
        if(!safeBoxes.includes(elem)) {
            tag.classList.add("safe");
            return safeBoxes.push(elem);
        }
    } else {
        tag.classList.add("unsafe");
        alert("Hai perso! Hai totalizzato " + safeBoxes.length + " punti.");
    }
}

battlefield(50);
placeBombs(50);