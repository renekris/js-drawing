const gridContainer = document.getElementById('grid-container')
let currentColor = '255, 0, 0,';
let currentOpacity = '1';

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
        cell.addEventListener('pointerover', e => colorGridCell(e));
    });
}

// Have to use rgba, as opacity property slows things down.
function colorGridCell(e) {
    e.target.style.backgroundColor = `rgba(${currentColor} ${currentOpacity})`
}

function resetGrid() {
    gridContainer.innerHTML = '';
    drawGrid();
}



function drawGrid() {
    createGrid(100, 100);
    addGridListener();
}

const resetButton = document.querySelector('#reset button');
resetButton.addEventListener('click', () => resetGrid());

const opacityRange = document.getElementById('opacity');
opacityRange.addEventListener('click', e => {
    currentOpacity = e.target.value / 10;
    console.log(currentOpacity);
} )


drawGrid()
