const container = document.querySelector(".container");
const containerSize = container.offsetHeight;
let pixels = [];

const setSizeButton = document.querySelector("#set-size");
const blackWhiteButton = document.querySelector("#black-white");
const randomColorButton = document.querySelector("#random-color");
const eraserButton = document.querySelector("#eraser");
const resetButton = document.querySelector("#reset");

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

  this.style.backgroundColor = "black";
}
