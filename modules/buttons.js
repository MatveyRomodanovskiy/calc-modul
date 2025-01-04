export function createButtons(containerId, buttonData, onButtonClick) {
    const container = document.getElementById(containerId);
    buttonData.forEach(button => {
        console.log(button.operation);
        const buttonElement = document.createElement('button');
        buttonElement.textContent = button.label;
        buttonElement.addEventListener('click', () => onButtonClick(button.operation));
        container.appendChild(buttonElement);
    });
}