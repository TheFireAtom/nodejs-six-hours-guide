const { Command } = require("commander");
const program = new Command();
const os = require("os");
const { parse, dirname, basename, extname } = require("path");


program
    .name("info")
    .description("cli for outputing some info about current OS and directory")
    .version("1.0.0")

program.command("os")
    .description("information about current OS")
    .option("-t, --type", "OS type")
    .option("-v, --version", "OS version")
    .option("-hd, --homedir", "OS home directory")
    .action((options) => {
        if (options.type) console.log(os.type());
        else if (options.version) console.log(os.version());
        else if (options.homedir) console.log(os.homedir());
    });

program.command("cdir")
    .description("information about current directory or file")
    .option("-dp, --dirpath", "current directory path")
    .option("-fp, --filepath", "currnet file path")
    .option("-bn, --basename", "name of the current file with extension")
    .option("-en, --extname", "extension name")
    .action((options) => {
        switch (true) {
            case options.dirpath:
                console.log(__dirname);
                break;
            case options.filepath:
                console.log(__filename);
                break;
            case options.basename:
                console.log(basename(__filename));
                break;
            case options.extname:
                console.log(extname(__filename));
                break;
            default:
                console.log("No valid option specified.");
        }
    });
    
program.parse();
    

