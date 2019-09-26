let personalDictionary;

const openPersonalDictionary = function () {
    document.getElementById("dictionary").setAttribute("style", "display:block");
}

const updatePersonalDictionary = function () {
    delimitedWords = document.getElementById("dict").value;
    personalDictionary = delimitedWords.split(/[^A-Z]+/i).map(elem => elem.toLowerCase());
    console.log(personalDictionary)
    closePersonalDictionary();
}

const closePersonalDictionary = function () {
    document.getElementById("dictionary").setAttribute("style", "display:none");
}