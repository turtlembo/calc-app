
    const display = document.querySelector('.header');
    const buttons = document.querySelectorAll('button');
    const body = document.getElementById('body');
  
    let currentOperand = '0';
    let previousOperand = '';
    let operation = null;
    let resetDisplay = false;
    
    function updateDisplay() {
        display.textContent = currentOperand;
    }
    
    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = null;
        resetDisplay = false;
    }
    
    function inputDigit(digit) {
        if (currentOperand === '0' || resetDisplay) {
            currentOperand = digit;
            resetDisplay = false;
        } else {
            currentOperand += digit;
        }
    }
    
    function inputDecimal() {
        if (resetDisplay) {
            currentOperand = '0.';
            resetDisplay = false;
            return;
        }
        
        if (!currentOperand.includes('.')) {
            currentOperand += '.';
        }
    }
    
    function handleOperator(nextOperation) {
        if (operation && !resetDisplay) {
            compute();
        }
        
        if (currentOperand !== '0' || nextOperation === '=') {
            previousOperand = currentOperand;
            operation = nextOperation;
            resetDisplay = true;
        }
        
        if (nextOperation === '=') {
            operation = null;
        }
    }
    
    function compute() {
        let computation;
        const prev = parseFloat(previousOperand.replace(',', '.'));
        const current = parseFloat(currentOperand.replace(',', '.'));
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch(operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Деление на ноль невозможно!');
                    clear();
                    updateDisplay();
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        
        currentOperand = computation.toString().replace('.', ',');
        operation = null;
        previousOperand = '';
    }
    
    function handleSpecialFunction(func) {
        const current = parseFloat(currentOperand.replace(',', '.'));
        
        switch(func) {
            case 'AC':
                clear();
                break;
            case '+/-':
                if (currentOperand !== '0') {
                    currentOperand = currentOperand.startsWith('-') 
                        ? currentOperand.substring(1) 
                        : '-' + currentOperand;
                }
                break;
            case '%':
                if (!isNaN(current)) {
                    currentOperand = (current / 100).toString().replace('.', ',');
                }
                break;
        }
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;
            
            if (this.classList.contains('interactions')) {
                handleSpecialFunction(value);
            } else if (this.classList.contains('operator') && value !== '=') {
                handleOperator(value);
            } else if (value === '=') {
                if (operation && previousOperand) {
                    compute();
                    resetDisplay = true;
                }
            } else if (value === ',') {
                inputDecimal();
            } else if (!isNaN(parseInt(value))) {
                inputDigit(value);
            }
            
            updateDisplay();
        });
    });
    
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        if (key >= '0' && key <= '9') {
            inputDigit(key);
            updateDisplay();
        }
        
        else if (['+', '-', '*', '/'].includes(key)) {
            const operators = {
                '+': '+',
                '-': '-',
                '*': '×',
                '/': '÷'
            };
            handleOperator(operators[key]);
            updateDisplay();
        }
        
        else if (key === 'Enter' || key === '=') {
            if (operation && previousOperand) {
                compute();
                resetDisplay = true;
                updateDisplay();
            }
            event.preventDefault();
        }
        
        else if (key === '.' || key === ',') {
            inputDecimal();
            updateDisplay();
        }
        
        else if (key === 'Escape') {
            clear();
            updateDisplay();
        }
        
        else if (key === 'Backspace') {
            if (currentOperand.length > 1) {
                currentOperand = currentOperand.slice(0, -1);
            } else {
                currentOperand = '0';
            }
            updateDisplay();
        }
    });
    
    updateDisplay();
