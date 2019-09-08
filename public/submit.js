let foundWords = [];

const foundValidWord = function () {
    for (let i = 0; i < foundWords.length; i++) {
        if (foundWords[i].valid)
            return true;
    }
    return false;
}

const submit = function () {
    // Submit the word if long enough
    if (word.length < minWordLength) return;
    wordToServer(word);
    // Then empty the current word and show the board
    word = [];
    displayGamestate();
}

const wordToServer = function (submitted) {
    const text = submitted.reduce((acc, curr) => acc + curr.content, "");
    // Until word checking is implemented, we assume it's valid
    foundWords.push({ text: text, valid: true });
    displayResults();

    // This is what wordchecking will look like
    /* axios.get("/isValid", { params { word: word } }, res => {
        foundWords.push({ text: text, valid: res.data });
        displayResults();
    }
    */
}

const removeResult = function () {
    event.preventDefault();
    const textToRemove = event.target.parentElement.children[0].textContent;
    for (let i = 0; i < foundWords.length; i++) {
        if (textToRemove === foundWords[i].text) {
            foundWords.splice(i, 1);
            break;
        }
    }
    displayResults();
}

const displayResults = function () {
    // Clear the results area
    const results = document.getElementById("results");
    results.innerHTML = "";

    foundWords.forEach(word => {
        const result = document.createElement("li");
        if (word.valid) {
            result.textContent = `Good Job! Click to see the definition: `;
            const linkToDictionary = document.createElement("a");
            linkToDictionary.setAttribute("href", `https://www.dictionary.com/browse/${word.text}`);
            linkToDictionary.setAttribute("target", "_blank");
            linkToDictionary.textContent = word.text;
            result.append(linkToDictionary);
            // Then add a 'remove from list' button
            const remove = document.createElement("button");
            remove.setAttribute("class", "remove btn btn-danger");
            remove.setAttribute("onclick", "removeResult()");
            result.append(remove);
        } else {
            result.textContent = `Sorry, ${word.text} isn't in our dictionary`;
        }
        // Add the result to the list
        results.append(result);
    });
    if (foundValidWord())
        document.getElementById("done").setAttribute("class", "btn btn-info");
    else document.getElementById("done").setAttribute("class", "btn");
}

const finished = function () {
    if (foundWords.length < 1) {
        return;
    }
    // Tells the server that the player is finished.
    // Then locks the board from further gameplay
    word = [{ content: "You finished! Refresh to start a new game." }];
    displayGamestate();
    document.getElementById("submit").setAttribute("class", "btn");
    document.getElementById("done").setAttribute("class", "btn");
}