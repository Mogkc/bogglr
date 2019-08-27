const generateBoard = function (rows, cols) {
    const virtualBoard = [];
    for (let row = 0; row < rows; row++) {
        virtualBoard.push([]);
        for (let col = 0; col < cols; col++) {
            virtualBoard[row].push(new Letter(
                row,
                col,
                randomlyGenerateLetter()
            ));
        }
    }
    return virtualBoard;
}

const randomlyGenerateLetter = function () {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}