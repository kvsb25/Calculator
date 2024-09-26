let display = document.querySelector(".display");
let numbers = document.querySelectorAll(".numbers");
let functions = document.querySelectorAll(".functions");
let operators = document.querySelectorAll(".operators");
let calculation = '';
let stack = []; // to track parenthesis

const updateDisplay = () => {
    if ((typeof calculation != 'number')) {
        // below code is to show '%' instead of '/100*' on display
        let str = [];
        for (let i = 0; i < calculation.length; i++) {
            str.push(calculation[i]);
        }

        for (let i = 0; i < str.length; i++) {
            if (str[i] === '/' && str[i + 1] === '1' && str[i + 2] === '0' && str[i + 3] === '0' && str[i + 4] === '*') {
                let temp = [];
                for (let j = str.length - 1; j > (i + 4); j--) {
                    temp.push(str[j]);
                    str.pop();
                }
                for (let j = (i + 4); j >= i; j--) {
                    str.pop();
                }
                str.push('%');
                for (let j = temp.length - 1; j >= 0; j--) {
                    str.push(temp[j]);
                }
            }
        }

        let dis = '';

        for (s of str) {
            dis += s;
        }
        display.innerHTML = dis;
    }
    else
    {
        display.innerHTML = calculation;
    }
}

const handleMultipliWithParanthesis = () => {
    let fixStack = [];
    for (let i = 0; i < calculation.length; i++) {
        if (calculation[i] == '(' && calculation[i - 1] == ')') {
            fixStack.push('*');
        }
        else if (calculation[i] == '(' && isDigit(calculation[i - 1])) {
            fixStack.push('*');
        }

        fixStack.push(calculation[i]);
    }

    calculation = fixStack.join('');
}

const handleParenthisis = () => {
    if (stack.length % 2 === 0) {
        calculation += '(';
        stack.push('(');
    }
    else {
        calculation += ')';
        stack.push(')');
    }
    handleMultipliWithParanthesis();
    updateDisplay();
}

const handleEquals = () => {
    try {
        calculation = eval(calculation);
        updateDisplay();
    } catch (error) {
        console.log(error);
        display.innerHTML = 'Invalid format used';
    }
}

const clear = () => {
    calculation = '';
    stack = [];
    display.innerHTML = "0";
}

const isDigit = (s) => {
    if (s >= '0' && s <= '9') {
        return true;
    }
    else {
        return false;
    }
}

display.addEventListener("click", ()=>{
    let calcCopy = calculation.toString();
    let tempArr = [];

    for (let i = 0; i<calcCopy.length; i++)
    {
        tempArr.push(calcCopy[i]);
    }
    tempArr.pop();

    let temp = '';

    for (ele of tempArr) {
        temp += ele;
    }

    calculation = temp;
    updateDisplay();
});

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        calculation += number.innerText;
        updateDisplay();
    });
});

operators.forEach((operator) => {
    if (operator.id == "divide") {
        operator.addEventListener("click", () => {
            calculation += "/";
            updateDisplay();
        });
    }
    else if (operator.id == "multiply") {
        operator.addEventListener("click", () => {
            calculation += "*";
            updateDisplay();
        });
    }
    else if (operator.id == "minus") {
        operator.addEventListener("click", () => {
            calculation += "-";
            updateDisplay();
        });
    }
    else if (operator.id == "plus") {
        operator.addEventListener("click", () => {
            calculation += "+";
            updateDisplay();
        });
    }
    else if (operator.id == "equals") {
        operator.addEventListener("click", handleEquals);
    }
})

functions.forEach((func) => {
    if (func.id == "clear") {
        func.addEventListener("click", clear);
    }
    else if (func.id == "bracket") {
        func.addEventListener("click", handleParenthisis);
    }
    else if (func.id == "percentage") {
        func.addEventListener("click", () => {
            calculation += "/100*";
            updateDisplay();
        })
    }
})
