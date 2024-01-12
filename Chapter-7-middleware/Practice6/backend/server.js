// server with expressjs

// requirements and another constants
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const frontendPath = "/home/thefireatom/Documents/Coding_Projects/nodejs-six-hours-guide/Chapter-6-intro-to-expressjs-framework/Practice6/frontend";

// main files
app.get("^/$|/main(.html)?", (req, res) => {
    res.sendFile(path.join(frontendPath, "html", "main.html"));
});

app.get("/page1(.html)?", (req, res) => {
    res.sendFile(path.join(frontendPath, "html", "page1.html"));
});

app.get("/page2(.html)?", (req, res) => {
    res.sendFile(path.join(frontendPath, "html", "page2.html"));
});

// additional files
app.get("/new-page(.html)?", (req, res) => {
    res.sendFile("./html/new-page.html", { root: frontendPath});
});

app.get("/old-page(.html)?", (req, res) => {
    res.redirect(301, "/new-page.html");
});

// route handlers
app.get("/hello(.html)?", (req, res, next) => {
    console.log("Hello World!");
    next();
}, (req, res) => {
    res.send("Next");
});

// chaining route handlers
const one = (req, res, next) => {
    console.log("one");
    next();
}

const two = (req, res, next) => {
    console.log("two");
    next();
}

const three = (req, res, next) => {
    console.log("three");
    res.send("Counted to three");
}

app.get("/chain(.html)?", [one, two, three]);

// non-existent direcories check
// app.get("/*", (req, res) => {
//     res.status(404).sendFile(path.join(frontendPath, "html", "404.html"));
// });

// app.get("/*", (req, res) => {
//     res.status(404).sendFile("./html/404.html", { root: frontendPath });
// });

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});

// console.log(path.join(frontendPath, "html", "main.html"));
