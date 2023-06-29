const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const mysql = require("mysql2");
const util = require("util");
const config = require("config");

const symbolSchema = new mongoose.Schema({
  symbol: String,
  timestamp: Date,
  value: Number,
});

const Symbol = mongoose.model("Symbol", symbolSchema);

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
pool.execute = util.promisify(pool.execute);

scrape = async (symbolName) => {
  const html = await axios(
    `https://www.google.com/finance/quote/${symbolName}-USD`
  );
  const $ = cheerio.load(html.data);
  const value = $(".YMlKec.fxKbKc").text().replace(",", "");

  const symbol = new Symbol({
    symbol: symbolName,
    timestamp: Date.now(),
    value: value,
  });

  await symbol.save();
};

const loop = async () => {
  const symbols = await pool.execute(`
        select distinct symbol from users_symbols 
    `);
  const promises = symbols.map(({ symbol }) => scrape(symbol));
  await Promise.allSettled(promises);
  setTimeout(loop, 10000);
};

// hint
// const instance = new SomeModel(modelData);
// await instance.save();

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mymongo");

    loop();
  } catch (error) {
    console.log(error);
  }
})();
