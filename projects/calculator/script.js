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

let curFlag = 0;
let curFirst = 0;
let curOperation = "";
let curSecond = 0;

initialize();

function initialize() {
  // Number Buttons
  for (const numberBtn of numberBtns) {
    numberBtn.addEventListener("click", (e) => {
      display.textContent += e.target.dataset.num;
      updateCur();
    });
  }

  // Clear and Delete Buttons
  clearBtn.addEventListener("click", (e) => {
    display.textContent = "0";
    updateCur();
  });

  deleteBtn.addEventListener("click", (e) => {
    display.textContent = display.textContent.slice(0, -1);
    updateCur();
  });

  // Point Button
  pointBtn.addEventListener("click", (e) => {
    display.textContent += ".";
    updateCur();
  });

  // Operation Buttons
  for (const operationBtn of operationBtns) {
    operationBtn.addEventListener("click", (e) => {
      display.textContent += e.target.textContent;
      // TODO: e.target.dataset.op
      updateCur();
    });
  }

}

function updateCur() {
  [curFirst, curSecond] = display.textContent.split(/[\+\-\×\÷]+/);
  curOperation = /[\+\-\×\÷]+/.exec(display.textContent);
  curOperation = (curOperation) ? curOperation[0] : curOperation

  console.log(curFlag, "Awaw", curFirst, curOperation, curSecond);
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