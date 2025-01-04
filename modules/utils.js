export function parseInput(input) {
    if (input === '' || input === null) {
        return 0;  // Если поле пустое или null, возвращаем 0
    }
    const number = parseFloat(input);
    if (isNaN(number)) {
        throw new Error('Invalid input. Please enter a valid number.');
    }
    return number;
}

export function isDuplicate (objectWithPrimitives, newElement){
return objectWithPrimitives.some(el =>
    Object.keys(el).every(key => el[key] === newElement[key])
);
}