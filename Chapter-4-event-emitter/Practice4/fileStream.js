const fsPromises = require("fs.Promises").promises;
const fs = require("fs");
const path = require("path");
// const { loginVar, passwordVar } = require("./myReadline");
const { dataArray, newUser } = require("./json")

const filePath = path.join(__dirname, "data.json");

const dataArrayStr = JSON.stringify(dataArray);

const myFile = async () => {
    try {
        if (!fs.existsSync(filePath)) {
            await fsPromises.writeFile(filePath, dataArrayStr, { encoding:"utf8" });
            console.log("Data has been successfully written in a new file.");
        }

        else if (fs.existsSync(filePath)) {
            // const dataArrayParsed = JSON.parse(dataArray);
            // dataArrayParsed.push(newUser());
            await fsPromises.appendFile(filePath, newUser(), { encoding:"utf8" });
            console.log("Data has been successfully written in a file.");
        }

    } catch (err) {
        console.error("Some error has occured", err);
    }
}

module.exports = myFile;
