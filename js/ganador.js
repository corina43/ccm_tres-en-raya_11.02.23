const nombreGanador = sessionStorage.getItem("winner");
const huboEmpate = sessionStorage.getItem("draw") === "true";

// Obtener los elementos del DOM necesarios
const titulo = document.getElementById("title");
const mensaje = document.getElementById("message");
const botonPlayAgain = document.getElementById("play-again");

// Configurar el título y mensaje dependiendo de si hubo un ganador o empate
if (huboEmpate) {
  titulo.innerHTML = "¡Empate!";
  mensaje.innerHTML = "No hubo ganador en esta partida.";
} else {
  titulo.innerHTML = "¡" + nombreGanador + " ganó!";
  mensaje.innerHTML = "¡Felicidades " + nombreGanador + "!";
}

// Agregar un listener al botón de jugar otra vez para redirigir al usuario al inicio del juego
botonPlayAgain.addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "../pages/select.html";
});
      