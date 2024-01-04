const readline = require("readline");
// const { myFile } = require("./fileStream");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// const choise = rl.question("Welcome to registration service. Please, enter a number of option that \
// you would like to choose:\n 1. Register.\n 2. Log In. ", (choise) => {
//     if (choise === 1) {
        
//     }
// });

    let loginVar = rl.question("Please, enter your login: ", (login) => {
        return login;
    });

    let passwordVar = rl.question("Please, enter your password: ", (password) => {
        return password;
    });

module.exports = { loginVar, passwordVar };