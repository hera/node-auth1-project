const express = require("express");
const user = require("../users/usersModel");
const { checkUserDataProvided, checkUserNameUnique } = require("./authMiddleware");

const router = express.Router();

router.post("/register", checkUserDataProvided, checkUserNameUnique, (req, res) => {
    user.add({
        name: req.body.name,
        password: req.body.password,
        about: req.body.about
    })
    .then(id => {
        res.send(id[0]);
    })
    .catch(error => {
        res.status(500).json({
            error: "Server error. Could not register a user.",
            description: error
        });
    });
});

router.post("/login", (req, res) => {
    res.status(501).send("Not implemented");
});

router.get("/logout", (req, res) => {
    res.status(501).send("Not implemented");
});

module.exports = router;