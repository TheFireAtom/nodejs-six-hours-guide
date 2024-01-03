const fs = require("fs");
const path = require("path");

// With path

// const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), { encoding: "utf8" });
// const ws = fs.createWriteStream(path.join(__dirname, "files", "new-lorem.txt"));

// Without path

const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" });
const ws = fs.createWriteStream("./files/new-lorem.txt");

// rs.on("data", (dataChunk) => {
//     ws.write(dataChunk);
// });

rs.pipe(ws);