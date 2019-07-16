const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  _id: String,
  name: String,
  blockchain: {
    lastUpdated: Date,
    currentHeight: Number,
    blockTime: Number
  }
}, { _id: false })

const Coin = mongoose.model('Coin', schema)

module.exports = Coin
