


var player1 = "X";
  var player2 = "O";
  var currentPlayer = player1;
  var boxes = document.querySelectorAll('.box');
  
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', function(event) {
      if (event.target.innerHTML === "") {
        event.target.innerHTML = currentPlayer;
        checkWinner();
        switchPlayer();
      }
    });
  }
  
  function switchPlayer() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }
  
  function checkWinner() {
    if (
      boxes[0].innerHTML === currentPlayer && 
      boxes[1].innerHTML === currentPlayer && 
      boxes[2].innerHTML === currentPlayer
    ) {
      alert("El jugador " + currentPlayer + " ha ganado!");
      resetGame();
    } else if (
      boxes[3].innerHTML === currentPlayer && 
      boxes[4].innerHTML === currentPlayer && 
      boxes[5].innerHTML === currentPlayer
    ) {
      alert("El jugador " + currentPlayer + " ha ganado!");
      resetGame();
    } else if (
      boxes[6].innerHTML === currentPlayer && 
      boxes[7].innerHTML === currentPlayer && 
      boxes[8].innerHTML === currentPlayer
    ) {
      alert("El jugador " + currentPlayer + " ha ganado!");
      resetGame();
    } else if (
      boxes[0].innerHTML === currentPlayer && 
      boxes[3].innerHTML === currentPlayer && 
      boxes[6].innerHTML === currentPlayer
    ) {
      alert("El jugador " + currentPlayer + " ha ganado!");
      resetGame();
    } else if (
      boxes[1].innerHTML === currentPlayer && 
      boxes[4].innerHTML === currentPlayer && 
      boxes[7].innerHTML === currentPlayer
    ) {
      alert("El jugador " + currentPlayer + " ha ganado!");
      resetGame();
    } else if (
      boxes[2].innerHTML === currentPlayer && 
      boxes[5].innerHTML === currentPlayer && 
      boxes[8].innerHTML === currentPlayer
    ) {
      alert("El jugador " + currentPlayer + " ha ganado!");
      resetGame();
    } else if (
      boxes[0].innerHTML === currentPlayer && 
      boxes[4].innerHTML === currentPlayer && 
      boxes[8].innerHTML === currentPlayer
    ) {
      alert("El jugador " + currentPlayer + " ha ganado!");
      resetGame();
    } else if (
      boxes[2].innerHTML === currentPlayer && 
      boxes[4].innerHTML === currentPlayer &&
      boxes[6].innerHTML === currentPlayer 
    )
        alert("El jugador " + currentPlayer + " ha ganado!");
        resetGame();
  }
  var turn = "player1"; // establece el turno inicial en player1
var boxes = document.querySelectorAll(".box"); // selecciona todas las cajas

for (var i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function(event) {
    if (event.target.innerHTML === "") {
      event.target.innerHTML = turn;
      if (turn === "player1") {
        turn = "player2";
      } else {
        turn = "player1";
      }
    }
  });
}

// // función para reiniciar el juego
// document.querySelector("button[type='reset']").addEventListener("click", function() {
//   for (var i = 0; i < boxes.length; i++) {
//     boxes[i].innerHTML = "";
//   }
//   turn = "player1";
// });