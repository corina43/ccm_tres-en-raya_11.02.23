  // Obtener los nombres de los jugadores de la sesión anterior
const inputNamePlayer1 = sessionStorage.getItem("namePlayer1");
const inputNamePlayer2 = sessionStorage.getItem("namePlayer2");

// Mostrar los nombres de los jugadores en la página
document.getElementById("player1").innerHTML = inputNamePlayer1;
document.getElementById("player2").innerHTML = inputNamePlayer2;

// Definir caracteres para el tablero
const x = "✖";
const o = "〇";

// Seleccionar todas las celdas del tablero
const boxes = document.querySelectorAll(".box");

// Estado del juego: player1 | player2 | PAUSA
let estadoJuego = "player1";

// Mostrar el turno del jugador actual en la página
const turno = document.getElementById("turn");
turno.innerHTML = "Turno de " + inputNamePlayer1;

// Agregar un evento click a cada celda del tablero
boxes.forEach((box, posicion) => {
  box.addEventListener("click", () => {
    // Si el juego está en pausa, no hacer nada
    if (estadoJuego === "PAUSA") return;
   
    // Si la celda ya tiene un valor, no hacer nada
    if (box.textContent !== "") return;
   
    // Realizar la jugada correspondiente (marcar la celda con x u o)
    box.textContent = estadoJuego === "player1" ? x : o;
   
    // Cambiar el turno al otro jugador
    estadoJuego = estadoJuego === "player1" ? "player2" : "player1";
   
    // Verificar si hay un ganador
    const posicionGanadora = revisarSiHayGanador();
    if (Array.isArray(posicionGanadora)) {
      
      // Marcar las celdas ganadoras con una clase 'win'
      boxes[posicionGanadora[0]].classList.add("win");
      boxes[posicionGanadora[1]].classList.add("win");
      boxes[posicionGanadora[2]].classList.add("win");
     
      // Guardar el nombre del ganador en la API de almacenamiento web
      const nombreGanador = estadoJuego === "player1" ? inputNamePlayer2 : inputNamePlayer1;
      sessionStorage.setItem("winner", nombreGanador);
     
      // Redirigir al jugador a la página de resultado del juego
      window.location.href = "../pages/ganador.html";
    } else if (revisarSiHayEmpate()) {
      // Si hay empate, declararlo y guardar la información en la API de almacenamiento web
      declareDrawOrChange("Empate!");
      sessionStorage.setItem("winner", "Empate");
      sessionStorage.setItem("draw", "true");
     
      // Redirigir al jugador a la página de resultado del juego
      window.location.href = "../pages/ganador.html";
    } else {
      // Si no hay ganador ni empate, cambiar el turno en la página
      turno.innerHTML = "Turno de " + (estadoJuego === "player1" ? inputNamePlayer1 : inputNamePlayer2);
    }
  });
});

// Función que revisa si hay un ganador
function revisarSiHayGanador() {
  const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
 
  for (let combinacion of combinacionesGanadoras) {
    if (boxes[combinacion[0]].textContent === boxes[combinacion[1]].textContent &&
        boxes[combinacion[1]].textContent === boxes[combinacion[2]].textContent &&
        boxes[combinacion[0]].textContent !== "") {
      // Devolver la combinación ganadora
      return combinacion;
    }
  }
  // Si no hay ganador, devolver false
  return false;
}

// Función que revisa si hay empate
function revisarSiHayEmpate() {
  return [...boxes].every((box) => box.textContent !== "");
}

// Función que declara el empate o el cambio de turno
function declareDrawOrChange(message) {
  turno.innerHTML = message;
  setTimeout(() => {
    turno.innerHTML = "Turno de " + (estadoJuego === "player1" ? inputNamePlayer1 : inputNamePlayer2);
  }, 1000);
}