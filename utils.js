const fs = require('fs');
const path = require('path');
const jsonFileName = 'norrisDb.json';
const chuckApiEndpoint = 'https://api.chucknorris.io/jokes/random';



const getPath = function (filename) {
    return path.join(__dirname, filename);
}

const readFile = function (filename) {
    const filePath = getPath(filename);
    const fileData = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileData)
}


const writeInFile = function (filename, data) {
    const filePath = getPath(filename);
    const existingData = readFile(filename)
    const newData = [...existingData, data]
    const stringifiedData = JSON.stringify(newData);
    fs.writeFileSync(filePath, stringifiedData);
};

const addQuoteIfNotContainedAlready = function (quote) {
    const existingQuotes = readFile(jsonFileName);
    if (!quote || existingQuotes.some(q => q == quote)) return false
    writeInFile(jsonFileName, quote)
    return true
}

const getARandomNorrisQuote = async function () {
    try {
        const response = await fetch(chuckApiEndpoint)
        const data = await response.json()
        return data.value
    } catch (err) {
        console.error(err)
        return false
    }
}

const getUniqueQuote = async function () {
    let quote;
    let isNewQuote = false;

    while (!isNewQuote) {
        quote = await getARandomNorrisQuote();
        if (!quote) {
            return false;
        }
        isNewQuote = addQuoteIfNotContainedAlready(quote);
    }

    return quote;
};

console.log(readFile(jsonFileName))


module.exports = {
    getUniqueQuote
};