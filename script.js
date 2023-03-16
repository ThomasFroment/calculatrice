var currNumber = "";
var prevNumber = "";

var currOperator = "";
var chainOperation = false;

const INPUT = document.querySelector("[data-input]");
const OUTPUT = document.querySelector("[data-output]");

function reset(err) {
   currNumber = "";
   prevNumber = "";

   currOperator = "";

   OUTPUT.innerText = "";
   if (err) {
      INPUT.innerText = err;
      return;
   }
   INPUT.innerText = "0";
}

function calculate() {
   var result;

   const currFloat = parseFloat(currNumber);
   const prevFloat = parseFloat(prevNumber);

   switch (currOperator) {
      case "÷":
         if (currFloat === 0) {
            return NaN;
         }
         result = prevFloat / currFloat;
         break;
      case "×":
         result = prevFloat * currFloat;
         break;
      case "−":
         result = prevFloat - currFloat;
         break;
      case "+":
         result = prevFloat + currFloat;
         break;
   }

   return result.toString();
}

function appendDigit(digit) {
   if (digit === "." && currNumber.includes(".")) {
      return;
   }
   if (digit === "0" && currNumber === "0") {
      return;
   }
   currNumber += digit;
   INPUT.innerText = currNumber;
}

function selectOperator(symbol) {
   if (currNumber === "" || prevNumber === "") {
      if (prevNumber === "") {
         prevNumber = currNumber || "0";
      }
      currOperator = symbol;
      currNumber = "";

      OUTPUT.innerText = `${prevNumber} ${currOperator}`;
      return;
   }

   const result = calculate();
   if (isNaN(result)) {
      reset("ERR");
      return;
   }
   currOperator = symbol;

   prevNumber = result;
   currNumber = "";

   INPUT.innerText = result;
   OUTPUT.innerText = `${prevNumber} ${currOperator}`;
}

const NUMBERS = document.querySelectorAll("[data-numbers]");
NUMBERS.forEach((NUMBER) => {
   NUMBER.addEventListener("click", function (e) {
      appendDigit(e.target.textContent);
   });
});

const CLEAR = document.querySelector("[data-clear]");
CLEAR.addEventListener("click", function () {
   reset();
});

const DELETE = document.querySelector("[data-delete]");
DELETE.addEventListener("click", function () {
   currNumber = currNumber.substring(0, currNumber.length - 1);
   if (currNumber !== "") {
      INPUT.innerText = currNumber;
      return;
   }
   INPUT.innerText = "0";
});

const EQUALS = document.querySelector("[data-equals]");
EQUALS.addEventListener("click", function () {
   if (currOperator === "" || prevNumber === "") {
      return;
   }
   if (currNumber === "") {
      currNumber = INPUT.innerText;
   }

   const result = calculate();
   if (isNaN(result)) {
      reset("ERR");
      return;
   }
   INPUT.innerText = result;
   OUTPUT.innerText = `${prevNumber} ${currOperator} ${currNumber} =`;

   currOperator = "";

   currNumber = "";
   prevNumber = result;
});

const OPERATORS = document.querySelectorAll("[data-operators]");
OPERATORS.forEach((OPERATOR) => {
   OPERATOR.addEventListener("click", function (e) {
      selectOperator(e.target.textContent);
   });
});
