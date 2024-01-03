const { Command } = require("commander")
const program = new Command ();
const { add, subtract, multiply, divide} = require("./math-functions");

program
    .description("command for performing elementary calculations")
    .version("1.0.0")
    .command("math")
    .arguments("<arg1> [arg2]")
    .option("-a, --add", "summation of two numbers")
    .option("-sub, --subtract", "subtraction of two numbers")
    .option("-mult, --multiply", "multiplication of two numbers")
    .option("-div, --divide", "division of two numbers")
    .action((arg1, arg2, options) => {
        arg1Num = Number(arg1);
        arg2Num = Number(arg2);
        if (options.add) console.log(add(arg1Num, arg2Num));
        else if (options.subtract) console.log(subtract(arg1Num, arg2Num));
        else if (options.multiply) console.log(multiply(arg1Num, arg2Num));
        else if (options.divide) console.log(divide(arg1Num, arg2Num));
    });

program.parse();