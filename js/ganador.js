const winner = sessionStorage.getItem("winner");
      const isDraw = sessionStorage.getItem("isDraw");
      const namePlayer1 = sessionStorage.getItem("namePlayer1");
      const namePlayer2 = sessionStorage.getItem("namePlayer2");
      
      document.getElementById("winner").innerHTML = winner;
      document.getElementById("player1").innerHTML = namePlayer1;
      document.getElementById("player2").innerHTML = namePlayer2;
      
      if (winner) {
          // Si hay un ganador, mostramos su nombre en el título
          document.querySelector("h1").textContent = `¡Felicidades ${winner}! ¡Has ganado!`;
      } else if (isDraw) {
          // Si hubo empate, mostramos un mensaje indicando que fue un empate
          document.querySelector("h1").textContent = "¡Es un empate!";
      }
      
      // Agregamos un listener al botón para que reinicie el juego
      document.querySelector("button").addEventListener("click", () => {
          sessionStorage.clear();
          window.location.href = "../pages/game.html";
      });
      