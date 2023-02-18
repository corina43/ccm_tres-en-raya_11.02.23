// Obtengo los nombres de los jugadores desde el almacenamiento de sesión
const inputNamePlayer1 = sessionStorage.getItem("namePlayer1");
const inputNamePlayer2 = sessionStorage.getItem("namePlayer2");

// Asigno los nombres de los jugadores a los elementos correspondientes en la página
document.getElementById("player1").innerHTML = inputNamePlayer1;
document.getElementById("player2").innerHTML = inputNamePlayer2;

// Defino los caracteres para el tablero
const x = "✖";
const o = "〇";

// Obtengo los elementos de las cajas del tablero y el cuadro de diálogo del juego
const boxes = document.querySelectorAll(".box");
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h2");

// Establezco el estado inicial del juego y muestro el primer turno
let estadoJuego = "player1"; // player1 | player2 | PAUSA
const turno = document.getElementById("turn");
turno.innerHTML = "Turno de " + inputNamePlayer1;

// Añado un event listener a cada caja del tablero
boxes.forEach((box, posicion) => {
  box.addEventListener("click", () => {
    // Si el juego está en pausa, no se permite hacer jugadas
    if (estadoJuego === "PAUSA") return;
    // Si la caja ya está ocupada, no se permite hacer jugadas
    if (box.textContent !== "") return;
    // Si la caja está libre, se coloca la ficha correspondiente al jugador actual
    box.textContent = estadoJuego === "player1" ? x : o;
    // Se cambia al siguiente jugador
    estadoJuego = estadoJuego === "player1" ? "player2" : "player1";
    // Se revisa si hay un ganador en la jugada actual
    const posicionGanadora = revisarSiHayGanador();
    if (Array.isArray(posicionGanadora)) {
      // Si hay un ganador, se resaltan las posiciones ganadoras y se muestra el modal de victoria
      ganar(posicionGanadora);
      return;
    }
    if (posicionGanadora === "empate") {
      // Si hay empate, se muestra el modal correspondiente
      mostrarModal("Empate");
    }
    // Se actualiza el turno en la página con el jugador actual
    turno.innerHTML = "Turno de " + (estadoJuego === "player1" ? inputNamePlayer1 : inputNamePlayer2);
  });
});
