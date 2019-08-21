// The game is about creating a word from the letters provided.
// After the user is happy with their word, they'll submit it.
let word = []

// This function is referenced by name in createBoard.js
const getLocation = function () {
    event.preventDefault();
    // Every letter is in a column which is in a row, 
    // and each row/col has a val attribute with its index
    const letter = new Letter(
        parseInt(event.target.parentElement.getAttribute("val")), //col
        parseInt(event.target.parentElement.parentElement.getAttribute("val")), //row
        event.target.textContent //content
    );
    // If they click on a letter they've already selected,
    // Remove that point and any that follows from their word
    if (!shortenWord(letter)) {
        // Otherwise, try to add the letter they clicked on to the word
        if (isValid(letter)) {
            word.push(letter);
            // And show that the letter's been selected
            event.target.setAttribute("class", "tile btn btn-success");
        } else {
            alert("Please select a letter closer to your previous choice");
        }
    }
    displayWord();
}

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

const shortenWord = function (cutoff) {
    // Returns true if shortened, false if not
    let shortening = false, newLength;
    word.forEach((letter, i) => {
        if (letter.equals(cutoff)) {
            shortening = true;
            newLength = i;
        }
        if (shortening) {
            // Col is one greater when grabbing from the dom because
            // there's a centering buffer
            const buttonHoldingLetter = document.getElementById("game_board")
                .children[letter.row]
                .children[letter.col + 1]
                .children[0];
            // Show that the button is no longer selected
            buttonHoldingLetter.setAttribute("class", "tile btn btn-info");
        }
    });
    if (shortening) {
        word = word.splice(0, newLength);
    }
    return shortening;
}

const displayWord = function () {
    current = document.getElementById("current");
    let disp = "";
    word.forEach(letter => {
        disp += letter.content;
    });
    current.textContent = disp;
}