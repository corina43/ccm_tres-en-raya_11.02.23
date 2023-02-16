const screen = document.querySelector(".screen");

screen.addEventListener("click", function() {
  screen.style.backgroundColor = "black";
});

screen.addEventListener("mouseleave", function() {
  screen.style.backgroundColor = "white";
});
