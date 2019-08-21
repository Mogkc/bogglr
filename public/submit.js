const minWordLength = 1;

const submit = function () {
    if(word.length < minWordLength) return;
    sendToServer(word, (word, veracity) => {
        const text = word.reduce((acc, curr) => acc + curr.content, "");
        const result = document.createElement("li");
        if (!veracity) {
            result.textContent = `Sorry, ${text} isn't in our dictionary`;
        } else {
            result.textContent = `Good Job! Click to see the definition: `;
            const linkToDictionary = document.createElement("a");
            linkToDictionary.setAttribute("href", `https://www.dictionary.com/browse/${text}`);
            linkToDictionary.setAttribute("target", "_blank");
            linkToDictionary.textContent = text;
            result.append(linkToDictionary);
        }
        document.getElementById("results").append(result);
    });
}

const sendToServer = function (word, callback) {
    // When there's a backend, this will check he word's veracity
    const veracity = true; // Hard coded for now
    // After recieving a response from the server, it will complete the callback.
    callback(word, veracity)
}