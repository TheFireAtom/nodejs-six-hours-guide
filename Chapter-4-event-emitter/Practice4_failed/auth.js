// Main emitter function

// Needed requirements

// const fs = require("fs");
// const fsPromises = require("fs").promises;
// const path = require("path");
// const process = require("process");
// const { dataArray, newUser, loginCheck } = require("./json");
const { loginVar, passwordVar } = require("./myReadline");
const myFile = require("./fileStream");

// Main programm

console.log("Welcome to registration service. Please, enter login and a password. \
If you dont have it, register by entering new login and a new password ");

// myAunth function

const myAunth = async (login, password) => {
    try {;
        myFile(login, password);
    } catch (err) {
        console.error("Error has occured: ", err);
    }
}

myAunth(loginVar, passwordVar);
