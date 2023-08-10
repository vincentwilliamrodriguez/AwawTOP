const numberBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operation");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const pointBtn = document.querySelector(".point");
const display = document.querySelector(".display");

const add =       (a, b) => (a + b);
const subtract =  (a, b) => (a - b);
const multiply =  (a, b) => (a * b);
const divide =    (a, b) => (a / b);

initialize();

function initialize() {
  // Number Buttons
  for (const numberBtn of numberBtns) {
    numberBtn.addEventListener("click", (e) => {
      display.textContent += e.target.dataset.num;
    });
  }

  // Clear and Delete Buttons
  clearBtn.addEventListener("click", (e) => {
    display.textContent = "";
  });

  deleteBtn.addEventListener("click", (e) => {
    display.textContent = display.textContent.slice(0, -1);
  });

  // Point Button
  pointBtn.addEventListener("click", (e) => {
    display.textContent += ".";
  });

  // Operation Buttons
  for (const operationBtn of operationBtns) {
    operationBtn.addEventListener("click", (e) => {
      display.textContent += e.target.textContent;
      // TODO: e.target.dataset.op
    });
  }
}



function operate(first, operator, second) {
  first = +first;
  second = +second;

  switch (operator) {
    case '+':   return add(first, second);
    case '-':   return subtract(first, second);
    case '*':   return multiply(first, second);
    case '/':   return divide(first, second);
    default:    return "N/A";
  }
}