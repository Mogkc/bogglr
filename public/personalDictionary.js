let personalDictionary;

const openPersonalDictionary = function () {
    document.getElementById("dictionary").setAttribute("style", "display:block");
}

const updatePersonalDictionary = function () {
    delimitedWords = document.getElementById("dict").value;
    personalDictionary = delimitedWords.split(/[^A-Z]+|$/i)
        .map(elem => elem.toLowerCase())
        .filter(elem => elem);
    // So the user can go back to the backend's dictionary
    if (personalDictionary.length < 1)
        personalDictionary = undefined;
    closePersonalDictionary();
}

// Due to needing to reference a variable that doesn't exist up to this file,
// closePersonalDictionary is located in submit.js