const minWordLength = 1;

const submit = function () {
    // Submit the word
    if (word.length < minWordLength) return;
    wordToServer(word, displayResult);
    // Then clear it and let the player start making another
}

const wordToServer = function (submitted, callback) {
    // When there's a backend, this will check he word's veracity
    const veracity = true; // Hard coded for now
    // After recieving a response from the server, it will complete the callback.
    callback(submitted, veracity);
}

const displayResult = (submitted, isValid) => {
    const text = submitted.reduce((acc, curr) => acc + curr.content, "");
    const result = document.createElement("li");
    if (!isValid) {
        result.textContent = `Sorry, ${text} isn't in our dictionary`;
    } else {
        result.textContent = `Good Job! Click to see the definition: `;
        const linkToDictionary = document.createElement("a");
        linkToDictionary.setAttribute("href", `https://www.dictionary.com/browse/${text}`);
        linkToDictionary.setAttribute("target", "_blank");
        linkToDictionary.textContent = text;
        result.append(linkToDictionary);
        // Then add a 'remove from list' button
        const remove = document.createElement("button");
        remove.setAttribute("class", "remove btn btn-danger");
        remove.setAttribute("onclick", "removeResult()");
        result.append(remove);
    }
    document.getElementById("results").append(result);
    word = [];
    displayGamestate();
}

const removeResult = function () {
    event.preventDefault();
    event.target.parentElement.remove();
}

const finished = function () {
    // Tells the server that the player is finished.
    // Then locks the board from further gameplay
    word = [new Letter(1000, 1000, "You finished! Refresh to start a new game.")];
    document.getElementById("word_functions").remove();
    displayGamestate();
}