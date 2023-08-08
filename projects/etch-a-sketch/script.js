const container = document.querySelector(".container");
const containerSize = container.offsetHeight;

const setSizeButton = document.querySelector("#set-size");
const brushButtons = document.querySelectorAll(".brush");
const resetButton = document.querySelector("#reset");

let pixels = [];
let isMousePressed = false;
let currentBrush = 0;
let currentSize = 16;

initialize();
generateGrid(currentSize);

function initialize() {
  window.addEventListener("mousedown", () => {
    isMousePressed = true;
  });
  window.addEventListener("mouseup", () => {
    isMousePressed = false;
  });

  for (let i = 0; i < 3; i++) {
    brushButtons[i].addEventListener("click", () => {
      currentBrush = i;
    });
  }

  setSizeButton.addEventListener("click", () => {
    let userInput;

    do {
      userInput = prompt("Please enter an integer no greater than 100:");
      if (userInput == null || userInput == ""){
        return;
      }

      userInput = parseInt(userInput, 10);

    } while (isNaN(userInput) || userInput < 1 || userInput > 100);

    currentSize = userInput;
    generateGrid(userInput);
  });

  resetButton.addEventListener("click", () => {
    generateGrid(currentSize);
  });
}


function generateGrid(gridSize) {
  container.innerHTML = "";
  pixels = [];

  for (let i = 0; i < gridSize ** 2; i++) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    
    let pixelSize = containerSize / gridSize;
    pixel.style.width = `${pixelSize}px`;
    pixel.style.height = `${pixelSize}px`;
    pixel.style.backgroundColor = "white";

    for (const eventName of ["mousedown", "mouseover"]) {
      pixel.addEventListener(eventName, (e) => modifyGrid(e));
    }
    

    pixels.push(pixel);
    container.appendChild(pixel);
  }
}

function modifyGrid(e) {
  if (e.type === "mouseover" && !isMousePressed)  return;

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

  e.target.style.backgroundColor = newColor;
}
