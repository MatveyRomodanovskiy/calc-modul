export function updateDisplay(value) {
    const displayElement = document.getElementById('input');
    displayElement.value = value;
}

export function getInputValue() {
    const inputElement = document.getElementById('input');
    return inputElement.value;
}

export function clearInput() {
    const inputElement = document.getElementById('input');
    inputElement.value = '';
}


