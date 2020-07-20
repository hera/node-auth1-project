require("dotenv").config();

const express = require("express");
const authRouter = require("./api/auth/authRouter");
const usersRouter = require("./api/users/usersRouter");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const db = require("./data/dbConfig");
const { loginRequired } = require("./api/auth/authMiddleware");

const server = express();


const PORT = process.env.PORT || 5000;
const sessionConfig = {
    name: "pink",
    saveUninitialized: true,
    resave: false,
    secret: process.env.SESSION_SECRET || "sharing a brat",
    cookie: {
        secure: false,
        httpOnly: true,
        expires: 60 * 60 * 1000 // 1 hour
    },
    store: new knexSessionStore({
        knex: db,
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 60 * 60 * 1000, // time to check and remove expired sessions from database
    }),
};


server.use(session(sessionConfig));
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", loginRequired, usersRouter);


server.listen(PORT, () => "Server is listening...");