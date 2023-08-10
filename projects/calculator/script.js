const numberBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operation");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const pointBtn = document.querySelector(".point");
const equalsBtn = document.querySelector(".equals");
const display = document.querySelector(".display");
const OPERATION_REGEX = /[\+\-\×\÷]+/;

const add =       (a, b) => (a + b);
const subtract =  (a, b) => (a - b);
const multiply =  (a, b) => (a * b);
const divide =    (a, b) => (a / b);
const roundOff =  (num) => Math.round((+num + Number.EPSILON) * 100) / 100
const checkError = (num) => /[a-zA-Z]/.test(num);

let curFirst = "0";
let curOperation = "";
let curSecond = "0";

initialize();

function initialize() {
  // Number Buttons
  for (const numberBtn of numberBtns) {
    numberBtn.addEventListener("click", (e) => {
      clearError();

      if (getFocusedNumber() === "0") {
        display.textContent = display.textContent.slice(0, -1);
      }

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
    clearError();

    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "") {
      display.textContent = "0";
    }
    updateCur();
  });

  // Point Button
  pointBtn.addEventListener("click", (e) => {
    clearError();

    if (getFocusedNumber().includes('.')) {
      return;
    }
    if (getFocusedNumber() === "") {
      display.textContent += "0";
    }
    display.textContent += ".";
    updateCur();
  });

  // Equals Button
  equalsBtn.addEventListener("click", calculate);

  // Operation Buttons
  for (const operationBtn of operationBtns) {
    operationBtn.addEventListener("click", (e) => {
      clearError();
      
      if (OPERATION_REGEX.test(display.textContent.slice(-1))) {
        display.textContent = display.textContent.slice(0, -1);
      }
      else if (curOperation) {
        calculate();

        if (checkError(display.textContent)) {
          return;
        }
      }
      display.textContent += e.target.textContent;
      updateCur();
    });
  }
}

function updateCur() {
  let text = display.textContent;
  let isFirstNegative = text.slice(0, 1) === "-";

  if (isFirstNegative) {
    text = text.slice(1);
  }

  [curFirst, curSecond] = text.split(OPERATION_REGEX);
  if (isFirstNegative) {
    curFirst = "-" + curFirst;
  }

  curOperation = OPERATION_REGEX.exec(text);
  curOperation = (curOperation) ? curOperation[0] : curOperation
}

function getFocusedNumber() {
  return (curOperation) ? curSecond : curFirst;
}

function calculate() {
  if (!(curFirst && curOperation && curSecond)) {
    return;
  }

  let result = roundOff(operate(curFirst, curOperation, curSecond)).toString();

  if (checkError(result)) {
    result = "N/A";
  }

  display.textContent = result;
  updateCur();
}

function operate(first, operator, second) {
  first = +first;
  second = +second;

  switch (operator) {
    case '+':   return add(first, second);
    case '-':   return subtract(first, second);
    case '×':   return multiply(first, second);
    case '÷':   return divide(first, second);
    default:    return "N/A";
  }
}

function clearError() {
  if (checkError(display.textContent)) {
    display.textContent = "0";
    updateCur();
  }
}