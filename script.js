const gridContainer = document.getElementById('grid-container')
let primaryMouseButtonDown = false;
let currentColor = '255, 0, 0,';
let currentOpacity = '1';

document.addEventListener("mousedown", setPrimaryButtonState);
document.addEventListener("mousemove", setPrimaryButtonState);
document.addEventListener("mouseup", setPrimaryButtonState);

// Can only draw when m1 held down
function setPrimaryButtonState(e) {
  let flags = e.buttons !== undefined ? e.buttons : e.which;
  primaryMouseButtonDown = (flags & 1) === 1;
}

function createGrid(gridX, gridY){
    for (let y = 0; y < gridY; y++) {
        const divRow = document.createElement('div');
        for (let x = 0; x < gridX; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell cell-outline';
            divRow.append(cell);
        }
        divRow.className = 'grid-row';
        gridContainer.append(divRow);
    }
}

function addGridListener() {
    const gridCells = document.getElementsByClassName('grid-cell');
    Array.from(gridCells).forEach(cell => {
        cell.addEventListener('pointerrawupdate', e => colorGridCell(e));
    });
}

// Have to use rgba, as opacity property slows things down.
function colorGridCell(e) {
    if (primaryMouseButtonDown) {
        e.target.style.backgroundColor = `rgba(${currentColor} ${currentOpacity})`
    }
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

const opacityInput = document.getElementById('opacity');
opacityInput.addEventListener('click', e => {
    currentOpacity = e.target.value / 10;
    console.log(currentOpacity);
} )

const outlineInput = document.getElementById('outline');
outlineInput.addEventListener('click', () => {
    const cells = document.getElementsByClassName('grid-cell');
    Array.from(cells).forEach(cell => {
        cell.classList.toggle('cell-outline');
    })
})

drawGrid()
