const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents")
const EventEmitter = require("events");
class Emitter extends EventEmitter { };
// initialize object 
const myEmitter = new Emitter();






// myEventEmitter.on("log", (msg) => logEvents(msg));
//     myEmitter.emit("log", "Log event emitted!");
