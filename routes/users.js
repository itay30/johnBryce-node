const express = require("express");
const usersRouter = express.Router();
const validator = require("../middlewears/validator");
const controller = require("../controllers/usersController/users");

const {
  symbolValidator,
} = require("../controllers/usersController/usersValidators");

usersRouter.get("/dashboard");

usersRouter.get("/logout");

usersRouter.post("/symbol", validator(symbolValidator), controller.addSymbol);

module.exports = usersRouter;
