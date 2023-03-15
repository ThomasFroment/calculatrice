var operator = "";

var previousValue = "";
var currentValue = "";

const mainDisplay = document.querySelector("[data-mainDisplay]");
const altDisplay = document.querySelector("[data-altDisplay]");

function clear() {
   operator = "";
   previousValue = "";
   currentValue = "";
}

function calculate() {
   var result;

   const currentFloat = parseFloat(currentValue);
   const previousFloat = parseFloat(previousValue);

   switch (operator) {
      case "÷":
         result = previousFloat / currentFloat;
         break;
      case "×":
         result = previousFloat * currentFloat;
         break;
      case "−":
         result = previousFloat - currentFloat;
         break;
      case "+":
         result = previousFloat + currentFloat;
         break;
   }
   return result.toString();
}

function appendValue(text) {
   if (text == "." && currentValue.includes(".")) {
      return;
   }
   currentValue += text;
   mainDisplay.innerText = currentValue;
}

function selectOperator(text) {
   if (currentValue == "") {
      if (previousValue == "") {
         previousValue = "0";
      }
      operator = text;
      altDisplay.innerText = `${previousValue} ${operator}`;
      return;
   }

   if (previousValue != "") {
      const result = calculate();
      operator = text;
      previousValue = result;
      currentValue = "";
      altDisplay.innerText = `${previousValue} ${operator}`;
      return;
   }

   operator = text;
   previousValue = currentValue;
   currentValue = "";
   altDisplay.innerText = `${previousValue} ${operator}`;
}

for (let el of document.querySelectorAll("[data-numbers]")) {
   el.addEventListener("click", (event) => {
      appendValue(event.target.textContent);
   });
}

for (let el of document.querySelectorAll("[data-operators]")) {
   el.addEventListener("click", (event) => {
      selectOperator(event.target.textContent);

      mainDisplay.setAttribute("data-placeholder", previousValue);
      mainDisplay.innerText = currentValue;
   });
}

document.querySelector("[data-equals]").addEventListener("click", () => {
   if (currentValue == "") {
      currentValue = mainDisplay.getAttribute("data-placeholder");
   }
   const result = calculate();

   mainDisplay.setAttribute("data-placeholder", result);
   mainDisplay.innerText = "";
   altDisplay.innerText = `${previousValue} ${operator} ${currentValue} =`;
   clear();
});

document.querySelector("[data-clear]").addEventListener("click", () => {
   clear();
   mainDisplay.setAttribute("data-placeholder", "0");
   mainDisplay.innerText = "";
   altDisplay.innerText = "";
});

document.querySelector("[data-delete]").addEventListener("click", () => {
   currentValue = currentValue.substring(0, currentValue.length-1);
   mainDisplay.innerText = currentValue;
   mainDisplay.setAttribute("data-placeholder", "0");
});
