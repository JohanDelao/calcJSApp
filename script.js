class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        // convert currentOperand to string and then slicing the last number essentially
         this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number){
        // only allows the user to add one period
        if (number === '.' && this.currentOperand.includes('.')) return
        // convert number values to string so if user puts 1 and then 1 it displayes 11 rather than 2
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand) // converting string to number
        const current = parseFloat(this.currentOperand) // converting string to number
        if(isNaN(prev) || isNaN(current)) return // check if it is not a number, if its not then don't run function
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        // split stringNumber before '.' and then convert that to number
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1] 
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}


// Const Variables

// querySelectorAll to find all elements with that value and since its data attribute it must be in bracket
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
// just querySelector since only one button has this data attribute
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// Making new class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// function for whenever we press a number button
numberButtons.forEach(button => {
    // everytime we click a button
    button.addEventListener('click', () => {
        // append whatever number was in that button
        calculator.appendNumber(button.innerText)
        // update the display
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    // everytime we click a button
    button.addEventListener('click', () => {
        // append whatever number was in that button
        calculator.chooseOperation(button.innerText)
        // update the display
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
})