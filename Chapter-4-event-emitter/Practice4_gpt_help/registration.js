// User registration programm

// Requirements

const EventEmitter = require("events");

// Main class
class RegistrationCLI extends EventEmitter  {
    constructor() {
        super();
        this.registeredUsers = [];
    }

    start() {
        console.log("Registration CLI");
        console.log("----------------");
        console.log("Available commands:");
        console.log("Type register <username> <password> for register a new user");
        console.log("Type login <username> <password>");
        console.log("Type list for seeing all registered users");
        console.log("Type exit for exit the CLI");

    process.stdin.on("data", (data) => {
        const input = data.toString().trim();

        if (input.startsWith("register")) {
            const username = input.split(" ")[1];
            const password = input.split(" ")[2];
            if (username && password) {
                this.registerUser(username, password);
            } else {
                console.log("Invalid command. Please, write: register <username> <password>");
            }
        } else if (input.startsWith("login")) {
            const username = input.split(" ")[1];
            const password  = input.split(" ")[2];
            if (username && password) {
                this.logIn(username, password);
            } else {
                console.log("Invalid command. Please, write: login <username> <password>");
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
        
        let usernameExist = false;

        for (let i = 0; i < this.registeredUsers.length; i++) {
            if (this.registeredUsers[i][0] === username) {
                usernameExist = true;
                break;
            }
        }

        if (usernameExist) {
            console.log("This username already exist");
        }

        else {
            let newUser = [username, password]
            this.registeredUsers.push(newUser);
            console.log(`New user registered: \nUsername: ${username}\tPassword: ${password}`);
            
        }
               
        this.emit("userRegistered", username, password);
        
    }

    logIn(username, password) {
        let userExist = false;

        for (let i = 0; i < this.registerUser.length; i++) {
            if (this.registeredUsers[i][0] === username && this.registeredUsers[i][1] === password) {
                userExist = true;
            } 
        } 

        if (userExist) {
            console.log("You have been successfully logged in");
        } else if (!userExist) {
            console.log("Specified user does not exist. Please, check if your username and password are written correctly.");
        }

        this.emit("userLoggedIn", username, password);

        // console.log(`User \"${username}\" has been successfully logged in.`);
    }

    listRegisteredUsers() {
        console.log("Registered users: ");
        if (this.registeredUsers.length > 0) {
            for (let i = 0; i < this.registeredUsers.length; i++) {
                console.log(`${i+1}.`, "Username: ", this.registeredUsers[i][0]);
            }
        }
    }
        
    exitCLI() {
        process.stdin.removeAllListeners("data");
        console.log("Exiting CLI...");
        process.exit(0);
    }
};

// Main programm

const registrationCLI = new RegistrationCLI();

registrationCLI.on("userRegistered", (username, password) => {
    // console.log(`New user registered: \nUsername: ${username}\tPassword: ${password}`);
});

registrationCLI.on("userLoggedIn", (username, password) => {
    // console.log(`New user logged in: \nUsername: ${username}\tPassword:${password}`);
})

registrationCLI.start();



