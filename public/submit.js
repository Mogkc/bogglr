const submit = function () {
    // Submit the word if long enough
    if (word.length < minWordLength) return;
    wordToServer(word, displayResult);
}

const wordToServer = function (submitted, callback) {
    // When there's a backend, this will check the word's veracity
    const isValid = true; // Hard coded for now
    // After recieving a response from the server, it will complete the callback.
    callback(submitted, isValid);
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

        // When there's a valid word, let them say done
        document.getElementById("done").setAttribute("class", "btn btn-info");
    }
    document.getElementById("results").append(result);
    word = [];
    displayGamestate();
}

const removeResult = function () {
    event.preventDefault();
    const numResults = event.target.parentElement.parentElement.children.length;
    const doneBtn = document.getElementById("done");
    if (numResults == 1) // Removing the last result
        doneBtn.setAttribute("class", "btn");
    event.target.parentElement.remove();
}

const finished = function () {
    if (document.getElementById("results").children.length < 1) {
        return;
    }
    // Tells the server that the player is finished.
    // Then locks the board from further gameplay
    word = [new Letter(1000, 1000, "You finished! Refresh to start a new game.")];
    displayGamestate();
    document.getElementById("submit").setAttribute("class", "btn");
    document.getElementById("done").setAttribute("class", "btn");

}