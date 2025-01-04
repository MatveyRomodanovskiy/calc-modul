
export function createTable(containerId, header) {
    const container = document.getElementById(containerId);

    const table = document.createElement('table');
    table.id = 'results-table';

    // Создаем заголовок таблицы
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    console.log(header);
    header.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    // Создаем тело таблицы
    const tbody = document.createElement('tbody');

    // Добавляем заголовок и тело таблицы
    table.appendChild(thead);
    table.appendChild(tbody);

    container.appendChild(table);
}
export function updateTable(rowItems) {
    const table = document.getElementById('results-table');
    const tbody = table.querySelector('tbody');
    const row = document.createElement('tr');

    rowItems.forEach(item => {
        const itemCell = document.createElement('td');
        itemCell.textContent = item;
        row.appendChild(itemCell);
    })
    tbody.appendChild(row);
}

export function clearTable() {
    const tbody = document.getElementById('results-table').querySelector('tbody');

    // Удаляем все дочерние элементы tbody
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}