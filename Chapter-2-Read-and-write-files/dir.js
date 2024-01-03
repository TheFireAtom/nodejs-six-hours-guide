const fs = require("fs");

// Create directory

if (!fs.existsSync("./new")) {
    fs.mkdir("./new", (err) => {
        if (err) throw err;
        console.log("Directory created");
    });
}

// Remove directory

if (fs.existsSync("./new")) {
    fs.rmdir("./new", (err) => {
        if (err) throw err;
        console.log("Directory removed");
    });
}