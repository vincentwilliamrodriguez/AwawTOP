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
  clearBtn.addEventListener("click", clear);
  deleteBtn.addEventListener("click", del);
  pointBtn.addEventListener("click", point);
  equalsBtn.addEventListener("click", calculate);

  for (const numberBtn of numberBtns) {
    numberBtn.addEventListener("click", (e) => {
      addNumber(e.target.dataset.key);
    });
  }

  for (const operationBtn of operationBtns) {
    operationBtn.addEventListener("click", (e) => {
      addOperation(e.target.textContent);
    });
  }

  window.addEventListener("keydown", (e) => {
    const btn = document.querySelector(`button[data-key="${e.key}"]`);
    if (!btn) {
      return;
    }

    if (/[0-9]/.test(e.key)) {
      addNumber(e.key);
    }
    else if (/[\+\-\*\/]/.test(e.key)) {
      addOperation(convertKeyToOperator(e.key));
    }
    else {
      switch (e.key) {
        case "c":
          clear();
          break;
        case "Backspace":
          del();
          break;
        case ".":
          point();
          break;
        case "Enter":
          calculate();
          break;
      }
    }
  });
}

// Number Buttons
function addNumber(num) {
  clearError();

  if (getFocusedNumber() === "0") {
    display.textContent = display.textContent.slice(0, -1);
  }

  display.textContent += num;
  updateCur();
}


// Clear Button
function clear() {
  display.textContent = "0";
  updateCur();
}

// Delete Button
function del() {
  clearError();

  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent === "") {
    display.textContent = "0";
  }
  updateCur();
}

// Point Button
function point() {
  clearError();

  if (getFocusedNumber().includes('.')) {
    return;
  }
  if (getFocusedNumber() === "") {
    display.textContent += "0";
  }
  display.textContent += ".";
  updateCur();
}

// Equals Button
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

// Operation Buttons
function addOperation(operation) {
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
  display.textContent += operation;
  updateCur();
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

function convertKeyToOperator(operator) {
  switch (operator) {
    case "+":
    case "-":
      return operator;
    case "*":
      return "×";
    case "/":
      return "÷";
  }
}