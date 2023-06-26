const express = require("express");
const guestsRouter = express.Router();

const welcome = (req, res) => {
    res.send("welcome")
}

guestsRouter.get("/welcome", welcome);

module.exports = guestsRouter;
