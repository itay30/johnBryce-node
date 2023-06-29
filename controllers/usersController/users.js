const Symbol = require("../../models/mongo/symbol-value");
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

exports.dashboard = async (req, res, next) => {
  try {
    const userSymbol = new UserSymbol(req.db);
    const userSymbols = await userSymbol.findByUserId({
      userId:123,
    });
    console.log(userSymbols);
    const promises = [];
    console.log(Symbol.findOne({ symbol: userSymbol.symbol }));
    userSymbols.forEach((userSymbol) =>
      promises.push(
        Symbol.findOne({ symbol: userSymbol.symbol })
          .sort({ createdAt: -1 })
          .limit(1)
      )
    );
    const symbolValues = await Promise.all(promises);

    res.render("/dashboard", {
      userSymbols,
      symbolValues,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
