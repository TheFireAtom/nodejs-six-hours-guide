const { program } = require("commander");
const fs = require("fs").promises;
const path = require("path");

program
  .description("Program for file management.")
  .version("1.0.0");

program
  .command("file")
  .description("Command for working with files.")
  .argument("<directory>", "file directory")
  .argument("<file name>", "file name")
  .argument("[text]", "text input")
  .option("-w, --write", "writing new file")
  .option("-r, --read", "reading file")
  .option("-a, --append", "appending file")
  .option("-d, --delete", "deleting file")
  .option("-rn, --rename <new name>", "renaming file")
  .action(async (directory, fileName, text, options) => {
    const filePath = path.join(directory, fileName);
    if (await fs.existsSync(filePath)) {
      if (options.write) {
        if (!text) {
          console.log("Please provide text to write to the file");
          return;
        }
        await fs.writeFile(filePath, text, "utf8");
        console.log("Writing completed");
      } else if (options.read) {
        const fileContent = await fs.readFile(filePath, "utf8");
        console.log("File content:", fileContent);
      } else if (options.append) {
        if (!text) {
          console.log("Please provide text to append to the file");
          return;
        }
        await fs.appendFile(filePath, text, "utf8");
        console.log("Appending completed");
      } else if (options.delete) {
        await fs.unlink(filePath);
        console.log("File deleted");
      } else if (options.rename) {
        const newFilePath = path.join(directory, options.rename);
        await fs.rename(filePath, newFilePath);
        console.log("Renaming completed");
      } else {
        console.error("No operation specified.");
      }
    } else {
      console.log("File does not exist");
    }
  });

program.parse(process.argv);