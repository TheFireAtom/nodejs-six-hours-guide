const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/file1(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "subdir", "file1.html"));
});

router.get("/file2(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "subdir", "file2.html"));
});

module.exports = router;