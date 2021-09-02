var btnPlay = document.getElementById("play");
var playground = document.getElementById("playground");
var boxNumber = Number;

function battlefield(num) {
    for (var i = 1; i <= num; i++) {
        playground.innerHTML += `<div class="square">${i}</div>`
    }
}

//genero 16 numeri casuali tra 1 e 100 e li aggiungo a un array che non può contenere duplicati
var bombs = [];

function placeBombs(num1, num2)/*num è un numero compreso tra 1 e il numero di caselle del campo minato */ {
    while(bombs.length <= (num1 * num2)) {
        let bomb = Math.floor(Math.random() * num1) + 1;
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
        //con la funzione probe controllo che la casella sia minata o meno
        probe(bombs, checkedBoxNum, checkedBox);
    }
);

var safeBoxes = []; /* qui verranno aggiunti, senza ripetizioni, i numeri contenuti nelle caselle cliccate che non contenevano mine*/

//genero una funzione che verifichi la presenza di checkedBoxNum in bombs e aggiunga checkedBoxNum a safeBoxes se non è presente. Se checkedBoxNum è presente in bombs la funzione genera un alert e restituisce il punteggio (la lunghezza di safeBoxes). Inoltre, cambio il colore alla casella indicata dall'argomento tag.
function probe(arr, elem, tag) {
    if(!arr.includes(elem)){
        if(!safeBoxes.includes(elem) && safeBoxes.length != (boxNumber - bombs.length - 1)) {
            tag.classList.add("safe");
            return safeBoxes.push(elem);
        } else if(!safeBoxes.includes(elem) && safeBoxes.length == (boxNumber - bombs.length - 1)) {
            tag.classList.add("safe");
            alert("Hai vinto! Hai evitato tutte le mine! Il tuo punteggio è " + (safeBoxes.length + 1) + ".");
            return safeBoxes.push(elem);
        }
    } else {
        tag.classList.add("unsafe");
        alert("Hai perso! Hai totalizzato " + safeBoxes.length + " punti.");
    }
}

btnPlay.addEventListener("click", 
    function(){
        //svuoto il campo da gioco e resetto gli array di bombe e punteggio
        playground.innerHTML = "";
        bombs = [];
        safeBoxes = [];

        //raccolgo gli input dell'utente per righe, colonne e difficoltà
        var rows = parseInt(document.getElementById("rows").value);
        var columns = parseInt(document.getElementById("columns").value);
        var difficulty = document.getElementById("difficulty").value;
        
        //valido gli input dell'utente per righe e colonne
        if(rows < 2 || rows > 10 || columns < 2 || columns > 10) {
            return alert("Attenzione! Devi inserire un numero compreso da 2 a 10 per righe e colonne!");
        } else {
            //calcolo il numero di caselle moltiplicando righe per colonne
             boxNumber = rows * columns;

            //creo il campo di gioco
            battlefield(boxNumber);

            //genero le bombe
            if(difficulty == "easy") {
                placeBombs(boxNumber, 0.16);
            } else if(difficulty == "regular") {
                placeBombs(boxNumber, 0.2);
            } else if(difficulty == "hard") {
                placeBombs(boxNumber, 0.33);
            }

            //aggiungo all'elemento con id "playground" la classe appropriata per il numero di colonne
            playground.classList.add("col_" + columns);
        }
    }
);

