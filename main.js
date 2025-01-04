import { Calculator } from './modules/calculator.js';
import { parseInput } from './modules/utils.js';
import { createTable, updateTable, clearTable } from './modules/table.js';
import { createButtons } from './modules/buttons.js';
import { updateDisplay, getInputValue, clearInput } from './modules/ui.js';
import {TABLE_HEADER} from "./modules/constants.js";
import {isDuplicate} from "./modules/utils.js";

const calculator = new Calculator();
const calculations = [];
let currentValue = 0;
let pendingOperation = null; // Сохраненное действие для выполнения

function executeOperation() {
    if (pendingOperation === null) return; // Если операция не выбрана, ничего не делаем

    try {
        calculator.setCurrentValue(currentValue);
        const secondValue = parseInput(getInputValue());
        calculator[pendingOperation](secondValue); // Выполняем сохраненное действие
        const result = calculator.getResult();
        // Обновляем таблицу
        const calculatedElement = [pendingOperation, `${currentValue}, ${secondValue}`, result];
        if(isDuplicate(calculations, calculatedElement)) {
            calculations.push(calculatedElement);
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

function handleOperation(operation) {
    if (operation === 'calculate') {
        // Выполняем сохраненное действие
        executeOperation();
    } else if (pendingOperation !== null) {
        // Если уже есть сохраненное действие, выполняем его
        executeOperation();
        pendingOperation = operation; // Сохраняем новое действие
    } else {
        // Устанавливаем новое действие
        pendingOperation = operation;
        currentValue = parseInput(getInputValue()) || currentValue; // Если введено число, обновляем первый операнд
        // clearInput();
        // updateDisplay(`Waiting for second operand for ${operation}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createTable('output-container', TABLE_HEADER);

    createButtons('button-container', calculator.getActions(), (operation) => {
        if (operation === 'reset') {
            calculator.reset();
            currentValue = 0;
            pendingOperation = null;
            updateDisplay(0);
            clearTable();
            clearInput();
            calculations.length = 0;
        } else {
            handleOperation(operation);
        }
    });
});