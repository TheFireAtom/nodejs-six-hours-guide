// const fs = require("fs");
// const path = require("path");
// const { loginVar, passwordVar } = require("./myReadline");

const dataArray = [
    {
        id: 0,
        login: "test",
        password: "object"
    }
];

function idGenerator() {
    for (let i = 0; i < dataArray.length; i++) {
        dataArray.forEach((dataArray, i) => {
            if (dataArray[i].id == dataArray.length) {
                return dataArray.length();
            }
        });
    }
}

function loginCheck(dataArray, login) {
    for (let i = 0; i < dataArray.length; i++) {
        dataArray.forEach((dataArray, i) => {
            if ((dataArray[i].login === login) && (dataArray[i].login.toLowerCase() === login)) {
                console.log("Specified login already exist");
                return true;
            }
            else {
                return false;
            }
        });
    }
}

function newUser(login, password) {
    if (loginCheck(dArr)) {
        const data = {
            id: idGenerator(),
            login: login,
            password: password
        };
        // dataArray.append(data);
        return data;
    }
}

module.exports = { dataArray, newUser, loginCheck };