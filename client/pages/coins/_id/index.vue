<template>
  <v-layout wrap>
    <v-flex
      md8
    >
      <v-card>
        <v-card-title class="display-3">
          {{ coin.name }}
        </v-card-title>
        <v-card-text>
          <p>{{ coin.description }}</p>
        </v-card-text>
        <v-list
          v-if="coin.links && coin.links.length"
        >
          <v-subheader>
            Useful Links
          </v-subheader>
          <template v-for="(item) in coin.links">
            <v-list-tile
              :key="item.url"
              avatar
              :href="item.url"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" />
                <v-list-tile-sub-title v-html="item.description" />
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex
      md4
    >
      <v-card>
        <v-card-title class="display-1">
          Blockchain Data
        </v-card-title>
        <v-card-text v-if="coin.blockchain">
          <p>Recorded Height: {{ coin.blockchain.currentHeight }}</p>
          <p>Block Time: {{ coin.blockchain.blockTime }}s</p>
          <p>Last Updated: {{ coin.blockchain.lastUpdated }}</p>
        </v-card-text>
        <v-card-text v-else>
          <p>Unfortunately, we don't have a source of data for this coin's blockchain. If you can help please get in touch!</p>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex
      v-if="nextHardFork"
      md12
    >
      <v-card>
        <v-card-title class="display-1">
          Upcoming Hardfork: {{ nextHardFork.name }} ({{ nextHardFork.blockHeight }})
        </v-card-title>
        <v-card-text>
          <v-layout wrap>
            <v-flex md12>
              <v-layout wrap>
                <v-flex md4>
                  <h3 class="text-md-center display-1">
                    <strong>Time Remaining</strong> <br /> {{ timeRemaining(nextHardFork) }}
                  </h3>
                  <br/>
                </v-flex>
                <v-flex md4>
                  <h3 class="text-md-center display-1">
                    <strong>Blocks Remaining</strong> <br /> {{ Math.floor(blocksRemaining(nextHardFork)) }}
                  </h3>
                  <br/>
                </v-flex>
                <v-flex md4>
                  <h3 class="text-md-center display-1">
                    <strong>Estimated Fork Time</strong> <br /> {{ estimatedForkDateTime(nextHardFork) }}
                  </h3>
                  <br/>
                </v-flex>
                <v-flex>
                  <br />
                  <v-divider/>
                  <br />
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md6>
              <h5 class="title">
                Upgrade Advice
              </h5>
              <h6 class="subheading">
                For Miners
              </h6>
              <p v-html="nextHardFork.advice.miners" />
              <h6 class="subheading">
                For Wallet Owners
              </h6>
              <p v-html="nextHardFork.advice.walletOwners" />
            </v-flex>
            <v-flex md6>
              <v-list
                v-if="nextHardFork.links && nextHardFork.links.length"
              >
                <v-subheader>
                  Useful Links
                </v-subheader>
                <template v-for="(item) in nextHardFork.links">
                  <v-list-tile
                    :key="item.url"
                    avatar
                    :href="item.url"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.title" />
                      <v-list-tile-sub-title v-html="item.description" />
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import countdown from 'countdown'

export default {
  data() {
    return {
      coinId: this.$route.params.id,
      now: Date.now()
    }
  },
  computed: {
    ...mapState({
      coin(state) {
        return state.coins.find(coin => coin._id === this.coinId)
      },
      forks(state) {
        return state.forks.filter(fork => fork.coinId === this.coinId)
      }
    }),
    upcomingForks() {
      if (!(this.forks && this.forks.length)) {
        return null
      }

      const upcoming = this.forks.filter(fork => fork.blockHeight > this.coin.blockchain.currentHeight)

      return upcoming.sort((a, b) => a.blockHeight - b.blockHeight)
    },
    nextHardFork() {
      if (!(this.upcomingForks && this.upcomingForks.length)) {
        return null
      }

      return this.upcomingForks[0]
    },
    currentEstimatedHeight() {
      const lastUpdate = moment(this.coin.blockchain.lastUpdated)
      const now = moment(this.now)

      const diff = moment.duration(now.diff(lastUpdate))

      return this.coin.blockchain.currentHeight + (diff.asSeconds() / this.coin.blockchain.blockTime)
    },
    blocksRemaining() {
      return fork => fork.blockHeight - this.currentEstimatedHeight
    },
    timeRemaining() {
      return (fork) => {
        const forkDate = this.estimatedForkDateTime(fork)
        return countdown(moment().valueOf(), forkDate.valueOf()).toString()
      }
    },
    estimatedForkDateTime(fork) {
      return (fork) => {
        const duration = moment.duration(this.blocksRemaining(fork) * this.coin.blockchain.blockTime, 'seconds')
        return moment().add(duration)
      }
    }
  },
  head() {
    return {
      title: this.coin.name + ' Hardfork Countdown' || 'Coin'
    }
  },
  mounted() {
    setInterval(() => {
      this.now = Date.now()
    }, 1000)
  }
}
</script>
