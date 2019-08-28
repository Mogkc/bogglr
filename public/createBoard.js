const createGameboard = function (virtualBoard) {
    const board_front = document.getElementById("game_board");
    virtualBoard.forEach((row, rInd) => {
        // Create a row in the dom
        const _r = document.createElement("div")
        _r.setAttribute("class", "row pb-sm-1");
        _r.setAttribute("val", `${rInd}`);
        // Add a buffer column
        buffer = document.createElement("div");
        buffer.setAttribute("class", `col-sm-${Math.floor((12 - virtualBoard[0].length) / 2)}`);
        _r.append(buffer);
        // Then populate the row's columns
        row.forEach((col, cInd) => {
            // Create the column in the dom
            const _c = document.createElement("div");
            _c.setAttribute("class", "col-md-1");
            _c.setAttribute("val", `${cInd}`);
            // Create a tile that reacts on click
            const tile = document.createElement("button");
            tile.setAttribute("class", "tile btn btn-info");
            tile.setAttribute("onclick", "getLocation()");
            tile.textContent = col.content;
            _c.append(tile);
            _r.append(_c);
        });
        // And add the complete row to the dom
        board_front.append(_r);
    });
    displayGamestate();
}

const board = generateBoard(5, 5);
createGameboard(board);