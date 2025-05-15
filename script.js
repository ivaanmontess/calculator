document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".buttons button");
  const historyList = document.getElementById("history-list");
  const liveResult = document.getElementById("live-result");

  buttons.forEach((button) => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value !== undefined) {
      button.addEventListener("click", () => {
        appendToDisplay(value);
        updateLiveResult();
      });
    }

    if (action === "clear") {
      button.addEventListener("click", () => {
        clearDisplay();
        updateLiveResult();
      });
    }

    if (action === "calculate") {
      button.addEventListener("click", () => {
        calculate();
      });
    }
  });

  function appendToDisplay(value) {
    display.value += value;
  }

  function clearDisplay() {
    display.value = "";
    liveResult.textContent = "";
  }

  function updateLiveResult() {
    try {
      const preview = eval(transformExpression(display.value));
      liveResult.textContent = `= ${preview}`;
    } catch {
      liveResult.textContent = "";
    }
  }

  function calculate() {
    try {
      const expression = transformExpression(display.value);
      const result = eval(expression);
      if (display.value !== "") {
        addToHistory(display.value, result);
        display.value = result;
        liveResult.textContent = "";
      }
    } catch (error) {
      display.value = "Error";
      liveResult.textContent = "";
    }
  }

  function transformExpression(expression) {
    // Reemplaza % por "/100" sólo si va al final o después de un número
    return expression.replace(/(\d+)%/g, "($1/100)");
  }

  function addToHistory(expression, result) {
    const li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;
    historyList.prepend(li);
  }
});
