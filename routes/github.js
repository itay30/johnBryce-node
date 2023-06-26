const express = require("express");
const githubRouter = express.Router();

githubRouter.get("/");

githubRouter.get("/callback");

module.exports = githubRouter;
