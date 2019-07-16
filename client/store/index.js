export const state = () => ({
  coins: [],
  forks: []
})

export const mutations = {
  setCoins(state, coins) {
    state.coins = coins
  },
  setForks(state, forks) {
    state.forks = forks
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
  }
}
