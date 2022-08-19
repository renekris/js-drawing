const gridContainer = document.getElementById('grid-container')
let primaryMouseButtonDown = false;
let currentColor = '255, 0, 0,';
let currentOpacity = '1';
let gridX = 50;
let gridY = 50;


document.addEventListener("mousedown", setPrimaryButtonState);
document.addEventListener("mousemove", setPrimaryButtonState);
document.addEventListener("mouseup", setPrimaryButtonState);

// Can only draw when m1 held down
function setPrimaryButtonState(e) {
    let flags = e.buttons !== undefined ? e.buttons : e.which;
    primaryMouseButtonDown = (flags & 1) === 1;
}

function createGrid(gX, gY){
    for (let y = 0; y < gY; y++) {
        const divRow = document.createElement('div');
        for (let x = 0; x < gX; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            divRow.append(cell);
            if (outlineInput.checked) {
                cell.classList.add('cell-outline');
            } else {
                cell.classList.remove('cell-outline');
            }
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

const btnRed = document.getElementById('btn-red');
const btnGreen = document.getElementById('btn-green');
const btnBlue = document.getElementById('btn-blue');
const btnWhite = document.getElementById('btn-white');
const btnBlack = document.getElementById('btn-black');

btnRed.addEventListener('click', () => currentColor = '255, 0, 0,');
btnGreen.addEventListener('click', () => currentColor = '0, 255, 0,');
btnBlue.addEventListener('click', () => currentColor = '0, 0, 255,');
btnWhite.addEventListener('click', () => currentColor = '255, 255, 255,');
btnBlack.addEventListener('click', () => currentColor = '0, 0, 0,');


function resetGrid() {
    gridContainer.innerHTML = '';
    drawGrid();
}

function drawGrid() {
    createGrid(gridX, gridY);
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
outlineInput.addEventListener('click', e => {
    const cells = document.getElementsByClassName('grid-cell');
    Array.from(cells).forEach(cell => {
        cell.classList.toggle('cell-outline');
    })
})


const gridSizingX = document.getElementById('grid-x');
const gridSizingY = document.getElementById('grid-y');

gridSizingX.addEventListener('change', e => gridX = e.target.value);
gridSizingY.addEventListener('change', e => gridY = e.target.value);

drawGrid()
