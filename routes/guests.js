const express = require("express");
const guestsRouter = express.Router();

const welcome  = (req, res, next) => {
    res.render('users/welcome')
}

guestsRouter.get("/welcome", welcome);

module.exports = guestsRouter;
