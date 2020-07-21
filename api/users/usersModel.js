const db = require("../../data/dbConfig");
const bcrypt = require("bcryptjs");

module.exports = {
    getByName,
    add,
    getAll
};

function getAll () {
    return db("user").select("id", "name", "about");
}

function getByName (name) {
    return db("user").where({name});
}

function add (userData) {
    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync(userData.password, salt);
    
    return db("user").insert(
        {
            name: userData.name,
            password: hashedPassword,
            about: userData.about || null
        },
        ["id"]
    );
}