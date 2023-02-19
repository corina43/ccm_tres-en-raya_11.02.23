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

// Añado un event listener al botón de reinicio del juego en el cuadro de diálogo
modal.querySelector("button").addEventListener("click", () => {
  // Se reinician las cajas del tablero y se desactiva el resaltado de posiciones ganadoras
  boxes.forEach(box => {
    box.textContent = "";
    box.classList.toggle("ganador", false);
  });
  // Se cierra el cuadro de diálogo y se reinicia el juego
  modal.close();
  estadoJuego = "player1";
  // Se actualiza el turno en la página con el jugador 1
  
});

// Función que revisa si hay un ganador en el tablero actual
function revisarSiHayGanador(){
  const tablero = Array.from(boxes).map(box => box.textContent);
  console.log(tablero)
  // Reviso filas
  for (let i = 0; i < 9; i+=3) {
      if(tablero[i] && tablero[i] === tablero[i+1] && tablero[i] === tablero[i+2]){
          return ([i,i+1,i+2]);
      }
  }

  // Reviso columnas
  for (let i = 0; i < 3; i++) {
      if(tablero[i] && tablero[i] === tablero[i+3] && tablero[i] === tablero[i+6]){
          return ([i,i+3,i+6]);
      }
  }
  // Reviso oblicuas
  if(tablero[0] && tablero[0] === tablero[4] && tablero[0] === tablero[8]) return [0,4,8];
  if(tablero[2] && tablero[2] === tablero[4] && tablero[2] === tablero[6]) return [2,4,6];

  //Reviso empate
  if(tablero.includes("")) return false;
   return "empate"; 

 
}
//Marco las posiciones ganadoras y muestro el modal de victoria
function ganar(posicionesGanadoras){  
  posicionesGanadoras.forEach(posicion => boxes[posicion].classList.toggle("ganador",true));
  mostrarModal("Ganador  " + (estadoJuego === "player1" ? `${inputNamePlayer2}` : `${inputNamePlayer1}`));
}
function mostrarModal(texto){
 textoModal.innerText = texto;
 modal.showModal();
 estadoJuego = "PAUSA";
}
