const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const port = 3000;
const host = "localhost";
const config = require("config");

const usersRouter = require("./routes/users");
const guestsRouter = require("./routes/guests");
const githubRouter = require("./routes/github");

const { middleware: sqlConnection } = require("./middlewares/sqlConnection");
const notFound = require("./middlewares/notFound");
const error = require("./middlewares/error");
const auth = require("./middlewares/auth");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sqlConnection);

app.use(
  session({
    // store: sessionStore,
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
    },
  })
);

app.use(auth.initialize());
app.use(auth.session());

app.use("/", usersRouter);
app.use("/", guestsRouter);
app.use("/github", githubRouter);

app.use(notFound);
app.use(error);

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`);
});
