function savePlayer() {
    let NamePlayer1  = document.getElementById("NamePlayer1").value;
    let NamePlayer2  = document.getElementById("NamePlayer2").value;
    if (NamePlayer1 != "" && NamePlayer2 != "") {
        sessionStorage.setItem("namePlayer1", NamePlayer1);
        sessionStorage.setItem("namePlayer2", NamePlayer2); 
        window.location.assign("../pages/game.html");
    } else {
        alert("el nombre es obligatorio");
    }
}