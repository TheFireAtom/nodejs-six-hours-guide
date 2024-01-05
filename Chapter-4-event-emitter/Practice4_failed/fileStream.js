const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");
// const { loginVar, passwordVar } = require("./myReadline");
const { dataArray, newUser, loginCheck } = require("./json")

const filePath = path.join(__dirname, "data.json");

const dataArrayStr = JSON.stringify(dataArray);

const myFile = async (login, password) => {
    try {
        if (!fs.existsSync(filePath)) {
            await fsPromises.writeFile(filePath, dataArrayStr, { encoding:"utf8" });
            console.log("Data has been successfully written in a new file.");
        }

        else if (fs.existsSync(filePath)) {
            if (loginCheck(dataArray, login)) {
                await fsPromises.appendFile(filePath, newUser(login, password), { encoding:"utf8" });
                console.log("Data has been successfully written in a file.");
            } else {
                console.log("Specified login already exist");
            }
            
        }

    } catch (err) {
        console.error("Some error has occured", err);
    }
}

module.exports = myFile;
