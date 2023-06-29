const mongoose = require('mongoose');

const SymbolValueSchema = new mongoose.Schema({
    symbol: String,
    value: Number,
    timestamp: Date,
});

const Symbol = mongoose.model('Symbol', SymbolValueSchema);

module.exports = Symbol;