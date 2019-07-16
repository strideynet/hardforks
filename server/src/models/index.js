const config = require('config')
const debug = require('debug')('hardfork:db')
const mongoose = require('mongoose')

const Coin = require('./coin')
const Fork = require('./fork')

const connect = async () => {
  debug('attempting to connect to mongo')
  await mongoose.connect(config.get('db.connectionString'))
  debug('successfully connected')
}

module.exports = {
  Coin,
  Fork,
  connect
}
