var playground = document.getElementById("playground");

function battlefield(num) {
    for (var i = 1; i <= num; i++) {
        playground.innerHTML += `<div class="square">${i}</div>`
    }
}

battlefield(100);

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
        return clickedBox = parseInt(clicked.target.innerHTML);
    }
);

var safeBoxes = []; /* qui verranno aggiunti, senza ripetizioni, i numeri contenuti nelle caselle cliccate che non contenevano mine*/

//genero una funzione che verifichi la presenza di clickedBox in bombs e aggiunga clickedBox a safeBoxes se non è presente. Se clickedBox è presente in bombs la funzione genera un alert e restituisce il punteggio (la lunghezza di safeBoxes)
