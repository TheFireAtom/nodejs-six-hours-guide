const fsPromises = require("fs.Promises").promises;
const fs = require("fs");
const path = require("path");
const { login, password } = require("./myReadline");

const filePath = path.join(__dirname, "data.txt");

const myFile = async () => {
    try {
        if (!fs.existsSync(filePath)) {
            await fs.Promises.writeFile(filePath, `\n${login}\n${password}\n`, { encoding:"utf8" });
            console.log("Data has been successfully written in a new file.");
        }

        else if (fs.existsSync(filePath)) {
            await fs.Promises.appendFile(filePath, `\n${login}\n${password}\n`, { encoding:"utf8" });
            console.log("Data has been successfully written in a file.");
        }

    } catch (err) {
        console.error("Some error has occured", err);
    }
}

module.exports = myFile;



