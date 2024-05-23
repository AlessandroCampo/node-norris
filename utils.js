const fs = require('fs');
const path = require('path');
const jsonFileName = 'norrisDb.json';



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

console.log(readFile(jsonFileName))


module.exports = {
    writeInFile,
    readFile,
    jsonFileName
};