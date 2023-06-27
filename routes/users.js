const express = require("express");
const usersRouter = express.Router();
const validator = require("../middlewears/validator");
const { symbolValidator } = require("../controllers/usersController/usersValidators")

usersRouter.get("/dashboard");

usersRouter.get("/logout");

usersRouter.post("/symbol", validator(symbolValidator));

module.exports = usersRouter;
