      const inputNamePlayer1 = sessionStorage.getItem("namePlayer1");
      const inputNamePlayer2 = sessionStorage.getItem("namePlayer2");
      
      document.getElementById("player1").innerHTML = inputNamePlayer1;
      document.getElementById("player2").innerHTML = inputNamePlayer2;
      
      // Caracteres para el tablero
      const x = "✖";
      const o = "〇";
      
      // Elementos de la página
      const boxes = document.querySelectorAll(".box");
      let estadoJuego = "player1"; // player1 | player2 | PAUSA
      
      const turno = document.getElementById("turn");
      turno.innerHTML = "Turno de " + inputNamePlayer1;
      
      boxes.forEach((box, posicion) => {
        box.addEventListener("click", () => {
          if (estadoJuego === "PAUSA") return;
          if (box.textContent !== "") return;
          box.textContent = estadoJuego === "player1" ? x : o;
          estadoJuego = estadoJuego === "player1" ? "player2" : "player1";
          const posicionGanadora = revisarSiHayGanador();
          if (Array.isArray(posicionGanadora)) {
            ganar(posicionGanadora);
            return;
          }
          if (posicionGanadora === "empate") {
            declareDrawOrChange();
            return;
          }
          turno.innerHTML = "Turno de " + (estadoJuego === "player1" ? inputNamePlayer1 : inputNamePlayer2);
        });
      });

      
      function revisarSiHayGanador(){
        const tablero = Array.from(boxes).map(box => box.textContent);
  
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
        return 'empate';
        }
      
      function ganar(posicionesGanadoras){  
        posicionesGanadoras.forEach(posicion => boxes[posicion].classList.toggle("winner",true));
        const winner = estadoJuego === "player1" ? inputNamePlayer2 : inputNamePlayer1;

        declareWinner(winner);
      }
      
      function declareWinner(winner) {
        sessionStorage.setItem("winner", winner);
      
        window.location.href = "../pages/ganador.html";
      }
      
      function declareDrawOrChange() {
        sessionStorage.setItem("isDraw", "true");
        window.location.href = "../pages/ganador.html";
      }