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
    check(word);
    // Then empty the current word and show the board
    word = [];
    displayGamestate();
}

const check = function (submitted) {
    const text = submitted.reduce((acc, curr) => acc + curr.content, "");
    if (personalDictionary) {
        let valid = -1 === personalDictionary.indexOf(text.toLowerCase()) ? false : true;
        foundWords.push({ text: text, valid: valid });
        displayResults();
    } else { // Without a personal dictionary, check with the one on the server
        axios.get(`/api/isWord/${text}`).then(res => {
            foundWords.push({ text: text, valid: res.data.valid });
            displayResults();
        });
    }
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
        } else {
            result.textContent = `Sorry, ${word.text} isn't in our dictionary`;
        }
        // Then add a 'remove from list' button
        const remove = document.createElement("button");
        remove.setAttribute("class", "remove btn btn-danger");
        remove.setAttribute("onclick", "removeResult()");
        result.append(remove);
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