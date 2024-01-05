const EventEmitter = require("events");


class RegistrationCLI extends EventEmitter  {
    constructor() {
        super();
        this.registeredUsers = [[]];
    }

    start() {
        console.log("Registration CLI");
        console.log("----------------");
        console.log("Available commands");
        console.log("Type register <username> <password> for register a new user");
        console.log("Type login <username> <password>");
        console.log("Type list for seeing all registered users");
        console.log("Type exit for exit the CLI");

    process.stdin.on("data", (data) => {
        const input = data.toString().trim();

        if (input.startsWith("register")) {
            const username = input.split(" ")[1];
            const password = input[2];
            if (username && password) {
                this.registerUser(username, password);
            } else {
                console.log("Invalid command. Please, write: register <username> <password>");
            }
        } else if (input === "list") {
            this.listRegisteredUsers();
        } else if (input === "exit") {
            this.exitCLI();
        } else {
            console.log("Invalid command. Please, write one of the available commands.");
        }
    });
    }

    registerUser(username, password) {
        for (let i = 0; i < this.registeredUsers.length; i++) {
            let iMax = 0;
                if (i > iMax) {
                    iMax = i;
                }
            
            this.registeredUsers[iMax][0] = login;
            this.registeredUsers[iMax][0] = password;
        
        }
    }
};
