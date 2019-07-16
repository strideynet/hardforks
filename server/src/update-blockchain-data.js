const axios = require('axios')
const debug = require('debug')('hardfork:update-blockchain-data')
const models = require('./models')

const fetchBlockchainData = {
  beam: async () => {
    const res = await axios.get('https://mainnet-explorer.beam.mw/explorer/status/')

    if (!res.data || !res.data.height) {
      debug('[beam] expected data not returned')
      debug(res.data)
      return null
    }

    return {
      currentHeight: res.data.height
    }
  }
}

models.connect().catch(err => {
  debug('connecting to db failed \n %s', err)
  process.exit(1)
}).then(async () => {
  const coins = await models.Coin.find({})

  for (const coin of coins) {
    debug('[%s] updating...', coin._id)
    if (fetchBlockchainData[coin._id]) {
      const blockchainData = await fetchBlockchainData[coin._id]()

      //check update is needed
      if ( blockchainData &&
        (!coin.blockchain ||
        !coin.blockchain.currentHeight ||
        coin.blockchain.currentHeight !== blockchainData.currentHeight))
      {
        coin.blockchain.currentHeight = blockchainData.currentHeight
        coin.blockchain.lastUpdated = (new Date()).toJSON()
        coin.markModified('blockchain.lastUpdated')

        await coin.save()
        debug('[%s] finished updating', coin._id)
      } else {
        debug('[%s] no update required', coin._id)
      }
    }
  }
}).catch(err => {
  debug('updating blockchain data failed \n %s', err)
  process.exit(1)
}).then(() => {
  process.exit(0)
})
