const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../../data/employees.json");
const data = {};
data.employees = require(filePath);

router.route("/")
    .get((req, res) => {
        res.json(data.employees);
    })

    .post((req, res) => {
        const newEmployee = {
            "id": data.employees.length + 1,
            "firstname": "the",
            "lastname": "fire"
        }

        // if (!data.employees || !Array.isArray(data.employees)) {
        //     data.employees = [];
        // }

        data.employees.push(newEmployee);

        fs.writeFileSync(filePath, JSON.stringify(data.employees, null, 2));

        res.json(newEmployee);
    })

    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.firstname
        });
    })

    .delete((req, res) => {
        res.json({ "id": req.body.id });
    });

router.route("/:id")
    .get((req, res) => {
        res.json({ "id": req.params.id });
    })

    .delete((req, res) => {
        const nowId = req.params.id;
        data.employees.splice(nowId, 1);
    });

module.exports = router;