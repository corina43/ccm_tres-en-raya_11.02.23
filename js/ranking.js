const ranking = document.getElementById("ranking");

// Recuperar las partidas guardadas en localStorage
const partidas = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));

// Crear elementos HTML para cada partida y agregarlos al ranking
partidas.forEach((partida, index) => {
  const elemento = document.createElement("div");
  elemento.classList.add("partida");
  elemento.innerHTML = `
    <span class="numero">${index + 1}.</span>
    <span class="jugadores">${partida.jugador1} vs ${partida.jugador2}</span>
    <span class="resultado">${partida.resultado}</span>
    <span class="fecha">${partida.fecha.toLocaleDateString()}</span>
  `;
  ranking.appendChild(elemento);
});