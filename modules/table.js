export function createTable(containerId, header) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    const table = document.createElement('table');
    table.id = 'results-table';
    table.classList.add('results-table');

    const thead = document.createElement('thead');
    const headerRow = createRow(header, 'th');
    thead.classList.add('results-header');
    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');
    tbody.classList.add('results-body');

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}

export function updateTable(rowItems) {
    const table = document.getElementById('results-table');
    if (!table) {
        console.error('Table not found.');
        return;
    }

    const thead = table.querySelector('thead');
    const headerCount = thead.querySelectorAll('th').length;

    if (rowItems.length !== headerCount) {
        console.error('Row items count does not match table header count.');
        return;
    }

    const tbody = table.querySelector('tbody');
    const row = createRow(rowItems);
    tbody.appendChild(row);
}

export function clearTable() {
    const table = document.getElementById('results-table');
    const newTbody = document.createElement('tbody');
    table.replaceChild(newTbody, table.querySelector('tbody'));
}

function createRow(items, cellType = 'td') {
    const row = document.createElement('tr');
    items.forEach(item => {
        const cell = document.createElement(cellType);
        cell.textContent = item;
        row.appendChild(cell);
    });
    return row;
}
