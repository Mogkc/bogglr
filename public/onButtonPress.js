// The game is about creating a word from the letters provided.
// After the user is happy with their word, they'll submit it.
let word = []

class Letter {
    constructor(row, col, content) {
        this.row = row;
        this.col = col;
        this.content = content;
    }

    equals(obj) {
        return obj.row === this.row && obj.col === this.col;
    }
}

// This function is referenced by name in createBoard.js
const getLocation = function () {
    event.preventDefault();
    // Every letter is in a column which is in a row, 
    // and each row/col has a val attribute with its index
    const letter = new Letter(
        parseInt(event.target.parentElement.getAttribute("val")), //row
        parseInt(event.target.parentElement.parentElement.getAttribute("val")), //col
        event.target.textContent //content
    );
    // If they click on a letter they've already selected,
    // Remove that point and any that follows from their word
    let upto;
    word.forEach((other, i) => {
        if (letter.equals(other)) {
            upto = i;
        }
    });
    if (upto != undefined) {
        word = word.splice(0, upto);
    } else {
        // Otherwise, add the letter they clicked on to the word
        word.push(letter);
    }
    displayWord();
}

const displayWord = function () {
    current = document.getElementById("current");
    let disp = "";
    word.forEach(letter => {
        disp += letter.content;
    });
    current.textContent = disp;
}