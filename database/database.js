const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stockbargainhunter', {
  useMongoClient: true
});

let stocksSchema = mongoose.Schema({
  stock: String
});

let Stocks = mongoose.model('stock', stocksSchema);

const retrieve = () => {
  return Stocks.find().limit(20).exec();
}

const save = (stock) => {
  const formattedStock = stock.toUpperCase();
  const query = { stock: formattedStock };
  const update = { stock: formattedStock };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  return Stocks.findOneAndUpdate(query, update, options);
}

const deleteStock = (stock) => {
  return Stocks.deleteOne({ stock }).exec();
}

module.exports = {
  retrieve,
  save,
  deleteStock
}