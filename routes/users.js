const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/dashboard");

usersRouter.get("/logout");

usersRouter.post("/symbol");

module.exports = usersRouter;
