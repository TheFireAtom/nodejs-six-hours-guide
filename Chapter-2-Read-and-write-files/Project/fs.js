// File management CLI

// required variables
const fs = require("fs").promises;
const { createReadStream, createWriteStream} = require("fs");
const path = require("path");
const { Command } = require("commander");
const program = new Command();

// Main program (async/await)

program
    .description("Program for file management.")
    .version("1.0.0")

program.command("file")
    .description("Command for short files.")
    .argument("<directory>", "file directory")
    .argument("<file name>", "file name")
    .argument("[text]", "text input\tP.S if you want to write text with space in the third argument, replace spacing with \
    underscores \"_\"")
    .option("-w, --write", "writing new file")
    .option("-r, --read", "reading file")
    .option("-a, --append", "appending file")
    .option("-d, --delete", "deleting file")
    .option("-rn, --rename", "renaming file")
    .option("-mkd, --createDirectory", "creating new directory")
    .option("-rmd, --removeDirectory", "removing new directory")
    .option("-p, --pipe", "move data from one file to another\tP.S use directory argument to specify file that you want \
    to read and second arg to specify file what you want to write")
    .action(async (directory, fileName, text, options) => {
        const filePath = path.join(directory, fileName);
       
        try {
            await fs.access(directory);

            if (text) {
                var finalText = text.replace(/_/g, " ");
            }
            
            if (options.write) {
                if (!text) {
                    console.log("Please provide text to append to the file");
                    return;
                }
                await fs.writeFile(filePath, finalText, "utf8");
                console.log("Writing completed");
            } else if (options.read) {
                const fileContent = await fs.readFile(filePath, "utf8");
                console.log("File content:", fileContent);
            } else if (options.append) {
                if (!text) {
                    console.log("Please provide text to append to the file");
                    return;
                }
                await fs.appendFile(filePath, finalText, "utf8");
                console.log("Appending completed");
            } else if (options.delete) {
                await fs.unlink(filePath);
                console.log("File deleted");
            } else if (options.rename) {
                const newFilePath = path.join(directory, finalText);
                await fs.rename(filePath, newFilePath);
                console.log("File renamed");
            } else if (options.createDirectory) {
                await fs.mkdir(filePath)
                console.log("Directory created");
            } else if (options.removeDirectory) {
                await fs.rmdir(filePath)
                console.log("Directory removed");
            } else if (options.pipe) {
                const readPath = directory;
                const writePath = fileName;
                const rs = await createReadStream(readPath, {encoding:  "utf8"});
                const ws = await createWriteStream(writePath, {encoding:  "utf8"});
                rs.pipe(ws);
                rs.on("end", () => {
                    console.log("Data has been successfully piped");
                });
                rs.on("error", (err) => {
                    console.error("An error occured while piping", err);
                });
            } 
            else {
                console.error("No operation specified.");
            }
        } catch (error) {
            console.error("File does not exist:", error);
        }
    });

program.parse();

// legacy code (doesnt work btw)

// .action((options, arg1, arg2, arg3) => {
//     if (options.write) {
//         fs.writeFile(path.join(arg1, arg2), arg3, "utf8", (err) => {
//             if (err) throw err;
//             console.log("Writing completed");
//         });
//     }

//     else if (options.read) {
//         fs.readFile(path.join(arg1, arg2), "utf8", (err) => {
//             if (err) throw err;
//             console.log("Reading completed");
//         });
//     }

//     else if (options.append) {
//         fs.appendFile(path.join(arg1, arg2), arg3, "utf8", (err) => {
//             if (err) throw err;
//             console.log("Appending completed");
//         });
//     }

//     else if (options.delete) {
//         fs.unlink(path.join(arg1, arg2), "utf8", (err) => {
//             if (err) throw err;
//             console.log("Deleting completed");
//         });
//     }

//     else if (options.rename) {
//         fs.unlink(path.join(arg1, arg2), "utf8", (err) => {
//             if (err) throw err;
//             console.log("Deleting completed");
//         });
//     }

//     process.on("uncaughtException", err => {
//         console.error(`There was an uncaught error: ${err}`);
//         process.exit(1);
//     });

// });