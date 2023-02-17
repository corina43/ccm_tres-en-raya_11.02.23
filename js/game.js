const inputNamePlayer1 = sessionStorage.getItem("namePlayer1");
const inputNamePlayer2 = sessionStorage.getItem("namePlayer2");

document.getElementById("player1").innerHTML = inputNamePlayer1;
document.getElementById("player2").innerHTML = inputNamePlayer2;

// Caracteres para el tablero
const x = "✖";
const o = "〇";

// Elementos de la página
const boxes = document.querySelectorAll(".box");
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h2");
let estadoJuego = "player1"; // player1 | player2 | PAUSA
let contadorFichasPlayer1 = 3;
let contadorFichasPlayer2 = 3;

const turno = document.getElementById("turn");
turno.innerHTML = "Turno de " + inputNamePlayer1 + " (" + contadorFichasPlayer1 + " fichas restantes)";

boxes.forEach((box, posicion) => {
  box.addEventListener("click", () => {
    if (estadoJuego === "PAUSA") return;
    if (box.textContent !== "") return;
    if (estadoJuego === "player1" && contadorFichasPlayer1 === 0) return;
    if (estadoJuego === "player2" && contadorFichasPlayer2 === 0) return;
    box.textContent = estadoJuego === "player1" ? x : o;
    estadoJuego = estadoJuego === "player1" ? "player2" : "player1";
    if (estadoJuego === "player1") {
      contadorFichasPlayer1--;
      turno.innerHTML = "Turno de " + inputNamePlayer1 + " (" + contadorFichasPlayer1 + " fichas restantes)";
    } else {
      contadorFichasPlayer2--;
      turno.innerHTML = "Turno de " + inputNamePlayer2 + " (" + contadorFichasPlayer2 + " fichas restantes)";
    }
    const posicionGanadora = revisarSiHayGanador();
    if (Array.isArray(posicionGanadora)) {
      ganar(posicionGanadora);
      return;
    }
    if (posicionGanadora === "empate") {
      mostrarModal("Empate");
    }
  });
});

modal.querySelector("button").addEventListener("click", () => {
  boxes.forEach(box => {
    box.textContent = "";
    box.classList.toggle("ganador", false);
  });
  modal.close();
  estadoJuego = "player1";
  contadorFichasPlayer1 = 3;
  contadorFichasPlayer2 = 3;
  turno.innerHTML = "Turno de " + inputNamePlayer1 + " (" + contadorFichasPlayer1 + " fichas restantes)";
});


function revisarSiHayGanador() {
  const tablero = Array.from(boxes).map(box => box.textContent);
  let fichasJugador1 = 0;
  let fichasJugador2 = 0;
  
  // Reviso filas
  for (let i = 0; i < 9; i+=3) {
    fichasJugador1 = 0;
    fichasJugador2 = 0;
    for (let j = i; j < i+3; j++) {
      if (tablero[j] === x) {
        fichasJugador1++;
      } else if (tablero[j] === o) {
        fichasJugador2++;
      }
    }
    if (fichasJugador1 === 3) {
      return [i, i+1, i+2];
    } else if (fichasJugador2 === 3) {
      return [i, i+1, i+2];
    }
  }
  
  // Reviso columnas
  for (let i = 0; i < 3; i++) {
    fichasJugador1 = 0;
    fichasJugador2 = 0;
    for (let j = i; j < i+7; j+=3) {
      if (tablero[j] === x) {
        fichasJugador1++;
      } else if (tablero[j] === o) {
        fichasJugador2++;
      }
    }
    if (fichasJugador1 === 3) {
      return [i, i+3, i+6];
    } else if (fichasJugador2 === 3) {
      return [i, i+3, i+6];
    }
  }
  
  // Reviso diagonales
  fichasJugador1 = 0;
  fichasJugador2 = 0;
  for (let i = 0; i < 9; i+=4) {
    if (tablero[i] === x) {
      fichasJugador1++;
    } else if (tablero[i] === o) {
      fichasJugador2++;
    }
  }
  if (fichasJugador1 === 3) {
    return [0, 4, 8];
  } else if (fichasJugador2 === 3) {
    return [0, 4, 8];
  }
  fichasJugador1 = 0;
  fichasJugador2 = 0;
  for (let i = 2; i < 7; i+=2) {
    if (tablero[i] === x) {
      fichasJugador1++;
    } else if (tablero[i] === o) {
      fichasJugador2++;
    }
  }
  if (fichasJugador1 === 3) {
    return [2, 4, 6];
  } else if (fichasJugador2 === 3) {
    return [2, 4, 6];
  }
  
  // Reviso empate
  if (tablero.includes("")) return false;
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
 estadoJuuego = "PAUSA";
}