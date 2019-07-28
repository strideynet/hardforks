const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  _id: String,
  blockHeight: Number,
  coinId: String,
  name: String,
  advice: {
    miners: String,
    walletOwners: String
  },
  links: [
    {
      name: String,
      description: String,
      url: String
    }
  ]
}, { _id: false })

const Fork = mongoose.model('Fork', schema)

module.exports = Fork
