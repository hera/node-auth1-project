require("dotenv").config();

const express = require("express");
const authRouter = require("./api/auth/authRouter");
const usersRouter = require("./api/users/usersRouter");

const PORT = process.env.PORT || 5000;
const server = express();

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);


server.listen(PORT, () => "Server is listening...");