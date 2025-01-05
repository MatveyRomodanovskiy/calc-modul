import { Calculator } from './modules/calculator.js';
import { parseInput } from './modules/utils.js';
import { createTable, updateTable, clearTable } from './modules/table.js';
import { createButtons } from './modules/buttons.js';
import { updateDisplay, getInputValue, clearInput } from './modules/ui.js';
import { TABLE_HEADER } from './modules/constants.js';

const calculator = new Calculator();
const calculationsSet = new Set(); // Хранит уникальные расчеты
let currentValue = 0;
let pendingOperation = null; // Сохраненное действие для выполнения

/**
 *
 */
function executeOperation() {
    if (pendingOperation === null) return;

    try {
        calculator.setCurrentValue(currentValue);
        const secondValue = parseInput(getInputValue());
        calculator[pendingOperation](secondValue);
        const result = calculator.getResult();

        // Формируем уникальный ключ и добавляем в Set
        const calculatedElement = [pendingOperation, `${currentValue}, ${secondValue}`, result];
        const elementKey = JSON.stringify(calculatedElement);

        if (!calculationsSet.has(elementKey)) {
            calculationsSet.add(elementKey);
            updateTable(calculatedElement);
        }

        // Обновляем состояние
        currentValue = result;
        pendingOperation = null;
        updateDisplay(result);
    } catch (error) {
        alert(error.message);
        clearInput();
    }
}

/**
 * Обрабатывает выбор новой операции или выполнение текущей.
 * @param {string} operation Название операции
 */
function processOperation(operation) {
    if (pendingOperation !== null) {
        executeOperation();
    }
    pendingOperation = operation;
    currentValue = parseInput(getInputValue()) || currentValue;
}

/**
 * Обрабатывает нажатие кнопок операций.
 * @param {string} operation Название операции
 */
function handleOperation(operation) {
    if (operation === 'calculate') {
        executeOperation();
    } else if (operation === 'reset') {
        calculator.reset();
        currentValue = 0;
        pendingOperation = null;
        updateDisplay(0);
        clearTable();
        clearInput();
        calculationsSet.clear();
    } else {
        processOperation(operation);
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    createTable('output-container', TABLE_HEADER);

    createButtons('button-container', calculator.getActions(), (operation) => {
        handleOperation(operation);
    });
});
