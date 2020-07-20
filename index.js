require("dotenv").config();

const express = require("express");
const authRouter = require("./api/auth/authRouter");
const usersRouter = require("./api/users/usersRouter");
const session = require("express-session");


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
    }
};


server.use(session(sessionConfig));
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);


server.listen(PORT, () => "Server is listening...");