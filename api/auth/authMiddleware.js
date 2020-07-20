const user = require("../users/usersModel");

module.exports = {
    checkUserDataProvided,
    checkUserNameUnique
};

function checkUserNameUnique (req, res, next) {
    if (!req.body.name) return false;

    user.getByName(req.body.name)
        .then(users => {
            if (users.length) {
                res.status(400).json({
                    error: "User exists.",
                    description: "Please provide a unique user name."
                });
            } else {
                next();
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not get a user.",
                description: error
            });
        });
}

function checkUserDataProvided (req, res, next) {
    if (req.body.name && req.body.password) {
        next();
    } else {
        res.status(400).json({
            error: "Bad request.",
            description: "Please provide valid name and password."
        });
    }
}