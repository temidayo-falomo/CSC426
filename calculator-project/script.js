const display = document.getElementById("display");
const expressionEl = document.getElementById("expression");

let currentValue = "0";
let previousValue = "";
let operator = "";
let shouldResetDisplay = false;

function updateDisplay() {
  display.value = currentValue;
}

function updateExpression(text) {
  expressionEl.textContent = text;
}

function clearAll() {
  currentValue = "0";
  previousValue = "";
  operator = "";
  shouldResetDisplay = false;
  updateDisplay();
  updateExpression("");
}

function appendNumber(num) {
  if (shouldResetDisplay) {
    currentValue = num === "." ? "0." : num;
    shouldResetDisplay = false;
  } else if (num === ".") {
    if (currentValue.includes(".")) return;
    currentValue += ".";
  } else if (currentValue === "0" && num !== ".") {
    currentValue = num;
  } else {
    currentValue += num;
  }
  updateDisplay();
}

function setOperator(op) {
  if (operator && !shouldResetDisplay) {
    calculate();
  }
  previousValue = currentValue;
  operator = op;
  shouldResetDisplay = true;
  updateExpression(`${previousValue} ${operator}`);
}

function calculate() {
  if (!operator || previousValue === "") return;

  const a = parseFloat(previousValue);
  const b = parseFloat(currentValue);

  if (isNaN(a) || isNaN(b)) {
    currentValue = "Error";
    updateDisplay();
    clearPending();
    return;
  }

  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        currentValue = "Error";
        updateDisplay();
        clearPending();
        return;
      }
      result = a / b;
      break;
    case "\\":
      if (b === 0) {
        currentValue = "Error";
        updateDisplay();
        clearPending();
        return;
      }
      result = Math.floor(a / b);
      break;
    case "^":
      result = Math.pow(a, b);
      break;
    case "%":
      result = a % b;
      break;
    default:
      return;
  }

  const expression = `${previousValue} ${operator} ${currentValue} =`;
  currentValue = formatResult(result);
  updateDisplay();
  updateExpression(expression);
  clearPending();
}

function clearPending() {
  previousValue = "";
  operator = "";
  shouldResetDisplay = true;
}

function formatResult(num) {
  if (!isFinite(num)) return "Error";
  const rounded = Math.round(num * 1e10) / 1e10;
  return String(rounded);
}

document.querySelectorAll(".btn-number").forEach((btn) => {
  btn.addEventListener("click", () => appendNumber(btn.dataset.number));
});

document.querySelectorAll(".btn-operator").forEach((btn) => {
  btn.addEventListener("click", () => setOperator(btn.dataset.operator));
});

document.querySelector('[data-action="clear"]').addEventListener("click", clearAll);

document.querySelector('[data-action="equals"]').addEventListener("click", calculate);

const keyMap = {
  ".": () => appendNumber("."),
  "+": () => setOperator("+"),
  "-": () => setOperator("-"),
  "*": () => setOperator("*"),
  "/": () => setOperator("/"),
  "%": () => setOperator("%"),
  "^": () => setOperator("^"),
  "\\": () => setOperator("\\"),
  Enter: calculate,
  "=": calculate,
  Escape: clearAll,
  c: clearAll,
  C: clearAll,
  Backspace: () => {
    currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
    updateDisplay();
  },
};

document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") return appendNumber(e.key);
  if (e.key === "/") e.preventDefault();
  keyMap[e.key]?.();
});

updateDisplay();
