import moment from 'moment'

export const state = () => ({
  coins: [],
  forks: [],
  time: Math.floor(Date.now() / 1000)
})

export const mutations = {
  setCoins(state, coins) {
    state.coins = coins
  },
  setForks(state, forks) {
    state.forks = forks
  },
  setTime(state, time) {
    state.time = time
  }
}

export const getters = {
  coins(state) {
    return state.coins.map((coin) => {
      if (coin.blockchain && coin.blockchain.currentHeight) {
        const lastUpdate = moment(coin.blockchain.lastUpdated)
        const now = moment.unix(state.time)
        const diff = moment.duration(now.diff(lastUpdate))

        coin.estimatedHeight = coin.blockchain.currentHeight + (diff.asSeconds() / coin.blockchain.blockTime)
        coin.estimatedHeightWhole = Math.floor(coin.estimatedHeight)
      }

      return coin
    })
  },
  coinsById(state, getters) {
    return getters.coins.reduce((coinsById, coin) => ({ ...coinsById, [coin._id]: coin }), {})
  },
  forks(state, getters) {
    return state.forks.map((fork) => {
      const newFork = {
        ...fork
      }

      const coin = getters.coinsById[fork.coinId]
      newFork.coin = coin
      if (coin.estimatedHeight) {
        newFork.blocksRemaining = newFork.blockHeight - coin.estimatedHeight
        newFork.blocksRemainingWhole = newFork.blockHeight - coin.estimatedHeightWhole

        newFork.secondsToFork = newFork.blocksRemaining * coin.blockchain.blockTime
      }

      return newFork
    })
  },
  upcomingForks(state, getters) {
    return getters.forks.filter(fork => fork.secondsToFork && fork.secondsToFork > 0).sort((a, b) => a.secondsToFork - b.secondsToFork)
  }
}

export const actions = {
  async fetchCoins({ commit, dispatch }) {
    const coins = await this.$axios.$get('/coins')

    commit('setCoins', coins)
  },
  async fetchForks({ commit, dispatch }) {
    const forks = await this.$axios.$get('/forks')

    commit('setForks', forks)
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchCoins')
    await dispatch('fetchForks')
  },
  updateTime({ commit }) {
    commit('setTime', Math.floor(Date.now() / 1000))
  }
}
