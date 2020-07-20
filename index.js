require("dotenv").config();

const express = require("express");

const PORT = process.env.PORT || 5000;
const server = express();


server.listen(PORT, () => "Server is listening...");