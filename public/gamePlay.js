// The game is about creating a word from the letters provided.
// After the user is happy with their word, they'll submit it.
let word = [];
let minWordLength = document.getElementById("word-length-slider").value;

// The player has to choose a letter with a distance of 1 from their 
const isValid = function (letter) {
    if (word.length == 0) return true;
    const prev = word[word.length - 1];
    if (
        Math.abs(letter.col - prev.col) <= 1 &&
        Math.abs(letter.row - prev.row) <= 1
    ) return true;
    // Otherwise
    return false;
}

document.getElementById("word-length-slider").oninput = function() {
    const len = this.value;
    minWordLength = len;
    document.getElementById("min-length-disp").textContent = len;
    displayGamestate();
}

const removingLetters = function (letterClicked) {
    // If letterClicked is in the word, shorten the word
    //by removing it and all following letters. Otherwise, return false
    let shortening = false;
    let newLength;
    word.forEach((letter, i) => {
        if (letter.row === letterClicked.row && letter.col === letterClicked.col) {
            shortening = true;
            newLength = i;
        }
    });
    if (shortening) {
        word = word.splice(0, newLength);
    }
    return shortening;
}

// This function is referenced by name in createBoard.js
const getLocation = function () {
    event.preventDefault();
    // Every letter is in a column which is in a row, 
    // and each row/col has a val attribute with its index
    const letter = board[parseInt(event.target.parentElement.parentElement.getAttribute("val"))][parseInt(event.target.parentElement.getAttribute("val"))]
    // If they click on a letter they've already selected,
    // Remove that point and any that follows from their word
    if (!removingLetters(letter)) {
        // Otherwise, try to add the letter they clicked on to the word
        if (isValid(letter)) {
            word.push(letter);
        }
    }
    displayGamestate();
}

const displayGamestate = function () {
    // Update the board buttons
    board.forEach((row, rowIndex) => {
        row.forEach((letter, columnIndex) => {
            const elementHoldingLetter = document.getElementById("game_board")
                .children[rowIndex]
                .children[columnIndex + 1] // +1 for buffer column
                .children[0];
            const inWord = word.reduce((acc, curr) => acc || curr.row === letter.row && curr.col === letter.col, false);
            if (inWord) { // Show player what's in the word
                elementHoldingLetter.setAttribute("class", "tile btn btn-success");
            } else if (isValid(letter)) { // Show player what they can add to the word
                elementHoldingLetter.setAttribute("class", "tile btn btn-info");
            } else { // Show that these tiles can't be interacted with
                elementHoldingLetter.setAttribute("class", "tile btn btn-light");
            }
        })
    });
    // Display whether the word is valid to submit
    document.getElementById("submit").setAttribute("class", 
    word.length < minWordLength ? "btn" : "btn btn-info");
    // And update the current word
    const current = document.getElementById("current");
    if (word.length === 0) {
        current.textContent = "Click on a letter to start a word!";
    } else {
        let disp = "Current String: ";
        word.forEach(letter => {
            if (letter.content.length > 10)
                disp = "";
            disp += letter.content;
        });
        current.textContent = disp;
    }
}
