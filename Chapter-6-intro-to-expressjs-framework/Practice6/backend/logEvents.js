// logEvents module

// Requirements
//(npm libraries)
const { format, utcToZonedTime } = require("date-fns");
const { v4: uuid } = require("uuid");
// (nodejs libraries)
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

// Main function for output event (info)
const logEvents = async (message, logName) => {
    const dateTime = format(new Date(), `dd-MM-yyyy\thh:mm:ss`);
    const logInfo = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "logs"), { recursive: false });
        }
    
        await fsPromises.appendFile(path.join(__dirname, "logs", logName), logInfo)
    } catch (err) {
        console.error("Error has occured: ", err);
    }

}

// Test
// const message = "ENOENT: no such file or directory";
// const logName = "logName";

// logEvents(message, logName);

// Export
module.exports = logEvents;