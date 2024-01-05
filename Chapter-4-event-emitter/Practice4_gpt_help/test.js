const EventEmitter = require('events');

class RegistrationCLI extends EventEmitter {
  constructor() {
    super();
    this.registeredUsers = [];
  }

  start() {
    console.log('Registration CLI');
    console.log('----------------');
    console.log('Available commands:');
    console.log('register <username> - Register a new user');
    console.log('list - List all registered users');
    console.log('exit - Exit the CLI');

    process.stdin.on('data', (data) => {
      const input = data.toString().trim();

      if (input.startsWith('register')) {
        const username = input.split(' ')[1];
        if (username) {
          this.registerUser(username);
        } else {
          console.log('Invalid command. Usage: register <username>');
        }
      } else if (input === 'list') {
        this.listRegisteredUsers();
      } else if (input === 'exit') {
        this.exitCLI();
      } else {
        console.log('Invalid command. Please type one of the available commands.');
      }
    });
  }

  registerUser(username) {
    this.registeredUsers.push(username);

    this.emit('userRegistered', username);

    console.log(`User ${username} successfully registered.`);
  }

  listRegisteredUsers() {
    console.log('Registered Users:');
    this.registeredUsers.forEach((username) => {
      console.log(`- ${username}`);
    });
  }

  exitCLI() {
    process.stdin.removeAllListeners('data');
    console.log('Exiting CLI...');
    process.exit(0);
  }
}

// Example usage:
const registrationCLI = new RegistrationCLI();

registrationCLI.on('userRegistered', (username) => {
  console.log(`New user registered: ${username}`);
});

registrationCLI.start();