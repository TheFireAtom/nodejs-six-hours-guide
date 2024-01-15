// requirements and another constants
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const htmlPath = path.join(__dirname, "public", "html");
const { logger } = require("./middleware/logEvents");
const errorLogger = require("./middleware/logErrors");
const cors = require("cors");

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
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

// build-in middlewares (.use) 

// for handling urlencoded data
app.use(express.urlencoded({ extended: false }))
// for serving json files
app.use(express.json());
// for serving static files (like css and etc.)
app.use(express.static(path.join(__dirname, "/public")));
// for serving static files in subdir directory
app.use("/subdir", express.static(path.join(__dirname, "public")));

// routing
app.use("/subdir", require("./routes/subdir"));
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

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

// error logger 

app.use(errorLogger);

// app listener

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});