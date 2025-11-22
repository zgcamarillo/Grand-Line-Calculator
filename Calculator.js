// creating variables 
let display = document.querySelector(".display");
let currentInput = "";
let operator = "";
let previousInput = "";

//display function - calc will show 0 if nothing is in currentInput
function updateDisplay() {
    display.textContent = currentInput || "0";
};
// adding values to the number button
document.querySelectorAll(".number").forEach(btn => 
    {btn.addEventListener("click", () => {
        let value = btn.textContent;
        //prevents repeating decimal
        if (value === "." && currentInput.includes(".")) return;
        //adding values to the strings
        currentInput += value;
        //updating display 
        updateDisplay();
    })});
//adding values to the operations 
document.querySelectorAll(".operation").forEach(btn => {
    btn.addEventListener("click", () => {
        let value= btn.textContent;
        //when user wants to clear; we are telling the calc to erase, forget prev number, erase operator, stop the code w return
        if (value === "C") {
            currentInput = "";
            previousInput = "";
            operator = "";
            updateDisplay();
            return;
        } else if (value === "⇐") {
            //.slice - removing a part of a string. (index start, -1 = last character)
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
            return;
        } else if (value === "%") {
            currentInput = (parseFloat(currentInput)/100).toString();
            //parseFloat - builtin function converts string into number
            //.toString - converting back to string 
            updateDisplay();
            return;
        } else if (value === "±") {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay();
            return;
        } else if (["+", "-", "*", "/"].includes(value)) {
            operator = value;
            previousInput = currentInput;
            currentInput = "";
        }
        
    });
});
document.querySelector(".equal").addEventListener("click", () => {
    if (currentInput === "" || previousInput === "") return;
    //if user doesnt input anything - do nothing
    //converting strings into numbers 
    let num1 = parseFloat(previousInput);
    let num2 = parseFloat(currentInput);
    let result = 0;
    //telling calculator what to do depending on the operation chosen
    switch (operator) {
        case "+": result = num1 + num2; break; 
        case "-": result = num1 - num2; break;
        case "*": result = num1 * num2; break;
        //if user inputs 0 as num2 - mark no berries found / error
        case "/": result = num2 === 0 ? "No Berries Found" : num1 / num2; break;

    }
    currentInput = result.toString();
    previousInput = "";
    operator = "";
    updateDisplay();
});
//start with displaying 0 
updateDisplay();