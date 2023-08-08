const container = document.querySelector(".container");
const containerSize = container.offsetHeight;
let pixels = [];

const setSizeButton = document.querySelector("#set-size");
const brushButtons = document.querySelectorAll(".brush");
const resetButton = document.querySelector("#reset");

let currentBrush = 0;
for (let i = 0; i < 3; i++) {
  brushButtons[i].addEventListener("click", () => {
    currentBrush = i;
  });
}

let isMousePressed = false;
window.addEventListener("mousedown", () => {
  isMousePressed = true;
});
window.addEventListener("mouseup", () => {
  isMousePressed = false;
});

generateGrid();

function generateGrid(gridSize = 16) {
  pixels = [];
  for (let i = 0; i < gridSize ** 2; i++) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    
    let pixelSize = containerSize / gridSize;
    pixel.style.width = `${pixelSize}px`;
    pixel.style.height = `${pixelSize}px`;
    pixel.style.backgroundColor = "white";

    pixel.addEventListener("mouseover", modifyGrid);

    pixels.push(pixel);
    container.appendChild(pixel);
  }
}

function modifyGrid() {
  if (!isMousePressed)  return;

  let newColor;
  switch (currentBrush) {
    case 0:
      newColor = "black";
      break;

    case 1:
      newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      break;
    
    case 2:
      newColor = "white";
      break;
  }

  this.style.backgroundColor = newColor;
}
