<template>
  <v-layout wrap>
    <v-flex
      md8
    >
      <v-card>
        <v-card-title class="headline">
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
        <v-card-title class="headline">
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
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      coinId: this.$route.params.id
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
    })
  },
  head() {
    return {
      title: this.coin.name || 'Coin'
    }
  }
}
</script>
