const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/main(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "main.html"));
});
router.get("/page1(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "page1.html"));
});
router.get("/page2(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "page2.html"));
});
router.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "new-page.html"));
});
router.get("/404(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "404.html"));
});
router.get("/old-page(.html)?", (req, res) => {
    res.redirect(301, "new-page.html");
});

module.exports = router;
