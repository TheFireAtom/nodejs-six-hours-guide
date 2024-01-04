// const fs = require("fs");
// const path = require("path");
const { loginVar, passwordVar } = require("./myReadline");

const dataArray = [
    {
        id: 0,
        login: "test",
        password: "object"
    }
];

function idGenerator() {
    for (let i = 0; i < dataArray.length(); i++) {
        dataArray.forEach((dataArray, i) => {
            if (dataArray[i].id == dataArray.length()) {
                return dataArray.length();
            }
        });
    }
}

function loginCheck() {
    for (let i = 0; i < dataArray.length(); i++) {
        dataArray.forEach((dataArray, i) => {
            if ((dataArray[i].login === loginVar) && (dataArray[i].login.toLowerCase() === loginVar)) {
                console.log("Specified login already exist");
                return true;
            }
            else {
                return false;
            }
        });
    }
}

function newUser() {
    if (loginCheck) {
        const data = {
            id: idGenerator(),
            login: loginVar,
            password: passwordVar
        };
        // dataArray.append(data);
        return data;
    }
}

module.exports = { dataArray, newUser };