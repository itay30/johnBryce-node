const mysql = require("mysql2");
const util = require("util");
const config = require("config");

const pool = mysql.createPool({
  host: config.get("mysql.host"),
  user: config.get("mysql.user"),
  password: config.get("mysql.password"),
  database: config.get("mysql.database"),
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
});

pool.query = util.promisify(pool.query);

const db = (req, res, next) => {
  req.db = pool;
  next();
};

module.exports = db;
