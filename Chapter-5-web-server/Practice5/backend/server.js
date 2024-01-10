// Main server

// nodejs requirements
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

// other requirements 
const { EventEmitter } = require("events");
const logEvents = require("./logEvents");
const eventEmitter = new EventEmitter();

// server, server info and server listener
const PORT = 3000;
const frontDir = "/home/thefireatom/Documents/Coding_Projects/nodejs-six-hours-guide/Chapter-5-web-server/Practice5/frontend";
// const frontDirHTML = "/home/thefireatom/Documents/Coding_Projects/nodejs-six-hours-guide/Chapter-5-web-server/Practice5/frontend/html";
// const frontDirCSS = "/home/thefireatom/Documents/Coding_Projects/nodejs-six-hours-guide/Chapter-5-web-server/Practice5/frontend/css";
// const filePath = path.join(__dirname, fileName());
const server = http.createServer((req, res) => {

    eventEmitter.emit("logs", `${req.url}${req.method}`, "logName.txt");

    // eventEmitter.on("log", (message, logName) => logEvents(message, logName));

    let filePath;
    
    if (req.url.endsWith(".css")) {
        filePath = path.join(frontDir, "/css/global.css");
    } else {
        filePath = path.join(frontDir, req.url === "/" ? `/html/main.html` : req.url);
    }

    // const filePath = path.join(frontDir, req.url === "/" ? `/html/main.html` : req.url);
    const extName = path.extname(filePath).toLowerCase();
    let contentType;
    switch (extName) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".jpeg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".gif":
            contentType = "image/gif";
            break;
        default:
            contentType = "text/html";
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { "Content-Type": contentType });
            console.error("Error has occured: ", err);
            eventEmitter.emit("log", `${err.code}: ${err.message}`, "errLog.txt");
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": contentType});
            res.end(content, "utf8");
        }
    });

});

server.listen(PORT, () => {
    console.log(`Server is currently running at: http://localhost:${PORT}/`);
});