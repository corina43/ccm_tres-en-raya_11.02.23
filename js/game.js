const inputNamePlayer1 = sessionStorage.getItem("namePlayer1");
const inputNamePlayer2 = sessionStorage.getItem("namePlayer2");

document.getElementById("player1").innerHTML = inputNamePlayer1;
document.getElementById("player2").innerHTML = inputNamePlayer2;

let remainingPieces = {
  player1: 3,
  player2: 3,
};
let currentPlayer = "player1";
let boxes = document.querySelectorAll(".box");

for (let i = 0; i < boxes.length; i++) {
  let active = "active" + i;
  boxes[i].addEventListener("click", function () {
    // if (!this.innerHTML) {
      if (remainingPieces[currentPlayer] > 0) {
        if (currentPlayer === "player1") {
           this.innerHTML = "X";
          remainingPieces.player1--;
          currentPlayer = "player2";
          document.getElementById("player1").style.backgroundColor = "lightgray";
          document.getElementById("player2").style.backgroundColor = "green";
          changeTurn();
          checkWinner();
        } else {
          this.innerHTML = "O";
          remainingPieces.player2--;
          currentPlayer = "player1";
          document.getElementById("player2").style.backgroundColor = "lightgray";
          document.getElementById("player1").style.backgroundColor = "green";
          changeTurn();
          checkWinner();
        }
      } else {
        alert("Ya no tienes fichas para colocar");
      }
    }
  );
}

let turn = 1;
let winner = "";

function changeTurn() {
  if (turn === 1) {
    document.getElementById("turn").innerHTML = `Turno de ${inputNamePlayer1}`;
    turn = 2;
  } else {
    document.getElementById("turn").innerHTML = `Turno de ${inputNamePlayer2}`;
    turn = 1;
  }
}

function checkWinner(){
  const board = Array.from(boxes).map(box => box.innerHTML);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      declareWinner(board[a] === "X" ? inputNamePlayer1 : inputNamePlayer2);
      return;
    }
  }
  
  if (board.every(box => box !== "")) {
    declareDraw();
  }
}

function declareWinner(player) {
  winner = player;
  alert(`¡Felicidades ${winner}! ¡Has ganado!`);
  resetGame();
}

function declareDraw() {
  alert("¡Empate!");
  resetGame();
}

function resetGame() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
  }
  remainingPieces = {
    player1: 3,
    player2: 3,
  };
  currentPlayer = "player1";
  turn = 1;
  winner = "";
  document.getElementById("turn").innerHTML = `Turno de ${inputNamePlayer1}`;
  document.getElementById("player1").style.backgroundColor = "green";
  document.getElementById("player2").style.backgroundColor =  "lightgray"


}
