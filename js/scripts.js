function calculate (firstValue, operator, secondValue) {
    const firstNum = parseFloat(firstValue)
    const secondNum = parseFloat(secondValue)

    if (operator == 'add')
        return firstNum + secondNum
    if (operator == 'subtract')
        return firstNum - secondNum
    if (operator == 'multiply')
        return firstNum * secondNum
    if (operator == 'divide')
        return firstNum / secondNum
}

const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator_keys')
const display = document.querySelector('.calculator_display')

keys.addEventListener('click', element => {
    if (element.target.matches('button')) {
        const key = element.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayNumber = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        Array.from(key.parentNode.children).forEach(i => i.classList.remove('is-depressed'))

        if (!action) {
            if (displayNumber == '0' || previousKeyType == 'operator' || previousKeyType == 'calculate') {
                if (previousKeyType == 'calculate') {
                    calculator.dataset.firstValue = ''
                    calculator.dataset.operator = ''
                    calculator.dataset.modValue = ''
                    calculator.dataset.previousKeyType = ''
                }
                display.textContent = keyContent
            }
            else {
                display.textContent = displayNumber +  keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }
        if (action == 'add' || action == 'subtract'
        || action == 'multiply' || action == 'divide') {

            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayNumber

            if (firstValue && operator && previousKeyType != 'operator' && previousKeyType != 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
            }
            else {
                calculator.dataset.firstValue = displayNumber
            }

            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }
        if (action == 'decimal') {
            if (!displayNumber.includes('.')) {
                display.textContent = displayNumber + '.'
            }
            else if (previousKeyType == 'operator' || previousKeyType == 'calculate') {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }
        if (action == 'clear') {
            if (key.textContent == 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.modValue = ''
                calculator.dataset.previousKeyType = ''
            }
            else {
                key.textContent = 'AC'
            }
            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }
        if (action == 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayNumber
            
            if (firstValue) {
                if (previousKeyType == 'calculate') {
                    firstValue = displayNumber
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
        if (action != 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
    }
})


