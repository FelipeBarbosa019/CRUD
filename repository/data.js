const fs = require("fs")
let users = []

readFile();

function readFile (){
    const fileJson = fs.readFileSync (__dirname + "/data.json")
    users = JSON.parse(fileJson) 
}

function writeFile (dataUsers){
    fs.writeFile(__dirname + "/data.json", JSON.stringify(dataUsers), ()=>console.log("Lista atualizada"))
}

module.exports = {writeFile, users}