const inputNamePlayer1 = sessionStorage.getItem("namePlayer1");
const inputNamePlayer2 = sessionStorage.getItem("namePlayer2");

document.getElementById("player1").innerHTML = inputNamePlayer1;
document.getElementById("player2").innerHTML = inputNamePlayer2;

let remainingPieces = {
  player1: 3,
  player2: 3,
	 for(let i = 0; i < boxes.length; i++){
  let active = "active" + i;
  boxes[i].addEventListener("click", function () {
    if (!this.innerHTML) {
      if (remainingPieces[currentPlayer] > 0) {
        if (currentPlayer === "player1") {
          this.innerHTML = "X";
          remainingPieces.player1--;
          currentPlayer = "player2";
          
          document.getElementById("player1").style.backgroundColor = "lightgray";
          document.getElementById("player2").style.backgroundColor = "yellow";
          changeTurn();
          checkWinner();
        } else {
          this.innerHTML = "O";
          remainingPieces.player2--;
          currentPlayer = "player1";
          document.getElementById("player2").style.backgroundColor = "lightgray";
          document.getElementById("player1").style.backgroundColor = "yellow";
          changeTurn();
          checkWinner();
        }
      } else {
        alert("Ya no tienes fichas para colocar");
      }
    }
  });
  function checkWinner(){
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
  document.getElementById("player1").style.backgroundColor = "yellow";
  document.getElementById("player2").style.backgroundColor


}
// Marco las posiciones ganadoras y muestro el modal de victoria
// function winner(winningCombinations){
//     console.log(winningCombinations)
//     winningCombinations.forEach(board => boxes[board].classList.toggle("ganador",true));
//     mostrarModal("Ganador jugador " + (estadoJuego === "P1" ? "2" : "1"));
// }

// function mostrarModal(texto){
//     textoModal.innerText = texto;
//     modal.showModal();
//     estadoJuego = "PAUSA";
// }