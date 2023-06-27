const express = require("express");
const app = express();
const port = 3000;
const host = "localhost";
const usersRouter = require("./routes/users");
const guestsRouter = require("./routes/guests");
const githubRouter = require("./routes/github");
// const config = require("config");

const notFound = require("./middlewears/notFound");
const error = require("./middlewears/error");

// app.use("")

// const port = config.get('mysql.port');

app.use(express.urlencoded({extended: false}));

app.use("/", usersRouter);
app.use("/", guestsRouter);
app.use("/github", githubRouter);

app.use(notFound);
app.use(error);


app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`);
});
