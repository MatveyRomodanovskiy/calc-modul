export class Calculator {
    constructor() {
        this.currentValue = 0;
        this.actions = [
            { label: '+', operation: 'add' },
            { label: '-', operation: 'subtract' },
            { label: '*', operation: 'multiply' },
            { label: '/', operation: 'divide' },
            { label: '=', operation: 'calculate' },  // Кнопка = добавлена
            { label: 'C', operation: 'reset' }
    ];

    }
// Метод для возвращения всех кнопок
getActions() {
    return this.actions;
}

    setCurrentValue(newValue) {
        this.currentValue = newValue;
    }

    add(value) {
        this.currentValue += value;
    }

    subtract(value) {
        this.currentValue -= value;
    }

    multiply(value) {
        this.currentValue *= value;
    }

    divide(value) {
        if (value === 0) {
            throw new Error('Division by zero is not allowed.');
        }
        this.currentValue /= value;
    }

    reset() {
        this.currentValue = 0;
    }

    getResult() {
        return this.currentValue;
    }

}
