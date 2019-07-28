const cors = require('cors')
const debug = require('debug')('hardfork:entry')
const express = require('express')
const models = require('./models')

const app = express()

app.use(cors())

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  }

app.get('/coins', asyncMiddleware(async (req, res) => {
  const coins = await models.Coin.find({})

  res.json(coins)
}))

app.get('/forks', asyncMiddleware(async (req, res) => {
  const forks = await models.Fork.find({})

  res.json(forks)
}))

app.get('/coins/:coinId', asyncMiddleware(async (req, res) => {
  const coin = await models.Coin.findOne({
    _id: req.params.coinId
  })

  if (!coin) return res.statusCode(404)

  const forks = await models.Fork.find({
    coinId: req.params.coinId
  })

  res.json(forks)
}))

models.connect().then(() => {
  app.listen(3001, () => {
    debug('listening on 3001')
  })
}).catch(err => {
  debug('failed to connect to db \n %s', err)
  process.exit(1)
})
