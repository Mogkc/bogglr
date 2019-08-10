const board = document.getElementById("game_board");
let row = false, col = false, maxCol = 8;

const addRow = function () {
    const next_row = document.createElement("div")
    next_row.setAttribute("class", "row");
    next_row.setAttribute("val", `${board.children.length}`);
    board.append(next_row);
    row = next_row;
}

const addColumn = function (element) {
    if(!row || row.children.length == maxCol) {
        addRow();
    }
    const next_column = document.createElement("div");
    next_column.setAttribute("class", "col-md-1");
    next_column.setAttribute("val", `${row.children.length}`);
    next_column.append(element);
    row.append(next_column);
    col = next_column;
}

const addGameTile = function (letter) {
    const tile = document.createElement("button");
    tile.setAttribute("class", "tile");
    tile.setAttribute("val", letter);
    // getLocation is a function in onButtonPress.js
    tile.setAttribute("onclick", "getLocation()")
    tile.textContent = letter;
    addColumn(tile);
}