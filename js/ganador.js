const nombreGanador = sessionStorage.getItem("winner");
const huboEmpate = sessionStorage.getItem("draw") === "true";

// Obtener los elementos del DOM necesarios
const titulo = document.getElementById("titulo");
const mensaje = document.getElementById("message");
const botonJugarOtraVez = document.getElementById("jugar-otra-vez");

// Configurar el título y mensaje dependiendo de si hubo un ganador o empate
if (huboEmpate) {
  titulo.innerHTML = "¡Empate!";
  mensaje.innerHTML = "No hubo ganador en esta partida.";
} else {
  titulo.innerHTML = "¡" + nombreGanador + " ganó!";
  mensaje.innerHTML = "¡Felicitaciones " + nombreGanador + "!";
}

// Agregar un listener al botón de jugar otra vez para redirigir al usuario al inicio del juego
botonJugarOtraVez.addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "../pages/select.html";
});
      