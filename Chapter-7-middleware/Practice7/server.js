// requirements and another constants
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const htmlPath = path.join(__dirname, "public", "html");
const cssPath = path.join(__dirname, "public", "css");
const { logger } = require("./middleware/logEvents");
const cors = require("cors");

// Cross Origin Resource Sharing

app.use(logger);

const whiteList = ["http://127.0.0.1:5500", "https://www.google.com", "http://localhost:3500/"];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
 
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
app.use(express.static(path.join(__dirname, "/public")));

// for serving json files

app.use(express.json());

// for handling urlencoded data

app.use(express.urlencoded({ extended: false }))

// app.all

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(htmlPath, "404.html"));
    } else if (req.accepts("json")) {
        res.json({ "error": "404 Not Found"});
    } else if (req.accepts("txt")) {
        res.type("txt").send("404 Not Found");
    }
});

// app listener

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});