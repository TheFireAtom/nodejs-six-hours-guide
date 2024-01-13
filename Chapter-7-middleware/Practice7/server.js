// requirements and another constants
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const htmlPath = path.join(__dirname, "public", "html");
const cssPath = path.join(__dirname, "public", "css");

// get methods
app.get("^/$|/main(.html)?", (req, res) => {
    res.sendFile(path.join(htmlPath, "main.html"));
});

app.get("/page1(.html)?", (req, res) => {
    res.sendFile(path.join(htmlPath, "page1.html"));
});

app.get("/page2(.html)?", (req, res) => {
    res.sendFile(path.join(htmlPath, "page2.html"));
});

app.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(htmlPath, "new-page.html"));
});

app.get("/404(.html)?", (req, res) => {
    res.sendFile(path.join(htmlPath, "404.html"));
});

app.get("/old-page(.html)?", (req, res) => {
    res.redirect(301, "new-page.html");
});

// build-in middlewares (.use) 
// for serving static files (like css and etc.)
app.use(express.static(path.join(cssPath, "global.css")));

// for serving json files

app.use(express.json());

// for handling urlencoded data

// app listener

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});