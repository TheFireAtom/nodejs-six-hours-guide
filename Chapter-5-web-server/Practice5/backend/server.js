// Main server

// nodejs requirements
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

// other requirements 
const { EventEmitter } = require("events");

// main class creation
const eventEmitter = new EventEmitter();
const PORT = 3000;
const server = http.createServer((req, res) => {

})

