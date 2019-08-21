const board = document.getElementById("game_board");
// Don't let maxCol be greater than 12.
let row = false, col = false, maxCol = 8;

// This is added to the beginning and end of rows to help with centering
const addBufferColumn = function () {
    const buffer = document.createElement("div");
    buffer.setAttribute("class", `col-sm-${Math.floor((12-maxCol)/2)}`);
    row.append(buffer);
}

const addRow = function () {
    if(row) addBufferColumn(); // To cap the previous row
    const next_row = document.createElement("div")
    next_row.setAttribute("class", "row pb-sm-1");
    next_row.setAttribute("val", `${board.children.length}`);
    board.append(next_row);
    row = next_row;
    // And start the new row with a buffer column
    addBufferColumn();
}

const addColumn = function (element) {
    if (!row || row.children.length > maxCol) {
        addRow();
    }
    const next_column = document.createElement("div");
    next_column.setAttribute("class", "col-md-1");
    next_column.setAttribute("val", `${row.children.length-1}`); // -1 to ignore buffer
    next_column.append(element);
    row.append(next_column);
    col = next_column;
}

const addGameTile = function (letter) {
    const tile = document.createElement("button");
    tile.setAttribute("class", "tile btn btn-info");
    // getLocation is a function in onButtonPress.js
    tile.setAttribute("onclick", "getLocation()")
    tile.textContent = letter;
    addColumn(tile);
}

for(let i = 0; i < 32; i++) {
    let char = Math.floor(Math.random() * 26);
    addGameTile(String.fromCharCode(65 + char));
}