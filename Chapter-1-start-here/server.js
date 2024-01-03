// NodeJS basics

// console.log("Hello World!!!");  // output "Hello world" in console

// console.log(global);    // global variable in console (information about global value)

const os = require("os");   // importing OS module with require
const path = require("path");    // path module
const { add, subtract, multiply, divide } = require("./math");  // requiring custom module

console.log(add(2, 4)); 
console.log(subtract(2, 4));
console.log(multiply(2, 4));
console.log(divide(2, 4));

// console.log(os.type()); //  info about type of os (Windows/Linux/MacOS)
// console.log(os.version());  // info about version of os (name and some version numbers)
// console.log(os.homedir());  //  home (main) firectory of os

// console.log(__dirname); // shows path of working directory
// console.log(__filename);    // shows path of working directory with main file (server.js) included

// console.log(path.dirname(__dirname));   // directory of arg file
// console.log(path.basename(__dirname));  // file name (with its extension)
// console.log(path.extname(__dirname));   //  extension name only

// console.log(path.parse(__filename));    //  all info about current file path