// The game is about creating a word from the letters provided.
// After the user is happy with their word, they'll submit it.
const word = []

// This function is referenced by name in createBoard.js
const getLocation = function() {
    event.preventDefault();
    const letter = event.target;
    // Every letter is in a column which is in a row, 
    // and each row/col has a val attribute with its index
    const location = {
        col: parseInt(letter.parentElement.getAttribute("val")),
        row: parseInt(letter.parentElement.parentElement.getAttribute("val"))
    };
    // If they click on a letter they've already selected,
    // Clear the selection up to that point.
    if(word.indexOf(location) != -1) {
        word = word.splice(0, word.indexOf(location));
    } else { // Otherwise, add the letter they clicked on to the word
        word.push(letter)
    }
    console.log(letter.textContent);
    console.log(location);
}

