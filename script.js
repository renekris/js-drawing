const gridContainer = document.getElementById('grid-container')

function createGrid(gridX, gridY){
    for (let y = 0; y < gridY; y++) {
        const divRow = document.createElement('div');
        for (let x = 0; x < gridX; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            divRow.append(cell);
        }
        divRow.className = 'grid-row';
        gridContainer.append(divRow);
    }
}

function addGridListener() {
    const gridCells = document.getElementsByClassName('grid-cell');
    Array.from(gridCells).forEach(cell => {
        cell.addEventListener('pointerover', e => colorGridCell(e), { once: true });
    });
}

function colorGridCell(e) {

    console.dir(e.target.style.backgroundColor = 'black');
}

createGrid(100, 100);
addGridListener();
