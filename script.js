function add(a, b) {
    console.log(a + b);
    return a + b;
}

function substract(a, b) {
    console.log(a - b);
    return a - b;
}

function multiply(a, b) {
    console.log(a * b);
    return a * b;
}

function divide(a, b) {
    console.log(a / b);
    return (a / b).toFixed(5);
}

let res = 0;
function operate(firstNumber, secondNumber, operator){
    
    switch(operator){
        case "+":
            res = add(firstNumber, secondNumber);
            break;
        case "-":
            res = substract(firstNumber, secondNumber);
            break;
        case "x":
            res = multiply(firstNumber, secondNumber);
            break;
        case "/":
            res = divide(firstNumber, secondNumber);
            break;
    }
    return res;
}

function changeDisplay(val){
    const display = document.getElementById("display");

    // if(display.innerHTML == "0123456789" || display.innerHTML == res && secondNumber !== ""){
    if(display.innerHTML == "0123456789"){
       display.innerHTML = "";
    }

    if (val === "clear"){
        display.innerHTML = "";
        return;
    } 


    display.innerHTML += val;
}

let firstNumber =""; let secondNumber = "";

function detect(){
    const digit = document.querySelectorAll(".digit");
    const touchbtns = document.querySelector("#touchbtns");
    let operand;

    touchbtns.addEventListener('click', (e) => {
        changeDisplay(e.target.textContent);

        if (e.target.className === "digit"){
            if(!operand){
                firstNumber += e.target.textContent;
                console.log(`first number is ${firstNumber}, btw second number is ${secondNumber}`);
            } else {
                secondNumber += e.target.textContent;
                console.log(`second number is ${secondNumber}`);
                if (operand === "/" & +secondNumber === 0) {
                    changeDisplay("clear");
                    alert("h o h o. you tried division by zero");
                    firstNumber = ""; secondNumber = ""; operand = undefined;
                }
                operate(+firstNumber, +secondNumber, operand);
                firstNumber = res; secondNumber = ""; operand = undefined;
                changeDisplay("clear");
                changeDisplay(res);
            }
        
        } else if (e.target.className === "operator"){

            if (operand !== undefined){
                operand = e.target.textContent;
            }

            if (document.getElementById("display").innerHTML === res){
                firstNumber = res;
                secondNumber = "";
                operand = e.target.textContent;
            } else {
                if (secondNumber === "") {
                operand = e.target.textContent;
                console.log(`you tap operator ${operand}`);
                } else {
                operate(+firstNumber, +secondNumber, operand);
                firstNumber = res; secondNumber = ""; operand = e.target.textContent;
                changeDisplay("clear");
                changeDisplay(res+operand); 
                }
            }
            
        } else if (e.target.id === "equal"){
            operate(+firstNumber, +secondNumber, operand);
            firstNumber = res; secondNumber = ""; operand = undefined;
            changeDisplay("clear");
            changeDisplay(res);
        } else if(e.target.id === "clearBtn"){
            changeDisplay("clear");
            firstNumber = ""; secondNumber = ""; operand = undefined;
        }
    
    
    })    
}
detect();
