const express = require("express");
const user = require("../users/usersModel");
const bcrypt = require("bcryptjs");
const { checkUserDataProvided, checkUserNameUnique } = require("./authMiddleware");
const session = require("express-session");

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

router.post("/login", checkUserDataProvided, (req, res) => {
    const credentials = req.body;

    user.getByName(credentials.name)
        .then(users => {
            if (users && bcrypt.compareSync(credentials.password, users[0].password)) {
                req.session.name = credentials.name;
                req.session.isLoggedIn = true;
                res.status(200).json({
                    success: `Welcome, ${credentials.name}`
                })
            } else {
                res.status(401).json({
                    error: "Access denied",
                    description: "Please enter correct name and password."
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not login.",
                description: error
            });
        });
});

router.get("/logout", (req, res) => {
    req.session && req.session.destroy(error => {
        if (error) {
            res.status(500).json({
                error: "Server error",
                description: "Cannot access session"
            });
        } else {
            res.status(200).json({
                success: "You've successfully logged out."
            });
        }
    });
});

module.exports = router;