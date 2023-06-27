const UserSymbol = require("../../models/userSymbolModel");

exports.addSymbol = async (req, res, next) => {
  try {
    const userSymbol = new UserSymbol(req.db);
    await userSymbol.add({ userId: 124, symbol: req.body.symbol });
    res.send("Success!!!!");
  } catch (error) {
    next(error);
  }
};
