const { v4: uuidv4 } = require("uuid");
const { format } = require("date-fns");

const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = async (message, logName) => {
    const time = `${format(new Date(), "ddmmyyyy\tHH:mm:ss")}`
    const logItem = `${time}\t${uuidv4()}\t${message}\n`;
    
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
        }

        await fsPromises.appendFile(path.join(__dirname, "..", "logs", logName), logItem);
    } catch (err) {
        console.error("Error has occured: ", err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
    console.log(`${req.method}\t${req.path}`);
    next();
}

module.exports = { logEvents, logger }

