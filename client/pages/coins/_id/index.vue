<template>
  <v-row wrap>
    <v-col
      md="8"
      class="pt-0"
    >
      <v-row>
        <v-col md="12">
          <v-card>
            <v-card-title class="display-3">
              {{ coin.name }}
            </v-card-title>
            <v-card-text>
              <p>{{ coin.description }}</p>
            </v-card-text>
            <v-list v-if="coin.links && coin.links.length" two-line>
              <v-subheader>Useful Links</v-subheader>
              <v-list-item v-for="(link) in coin.links" :key="link.url" :href="link.url">
                <v-list-item-content>
                  <v-list-item-title v-text="link.title" />
                  <v-list-item-subtitle v-text="link.description" />
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col md="12" v-for="(fork) in upcomingForks" :key="fork._id">
          <ForkCard :fork="fork" />
        </v-col>
      </v-row>
    </v-col>
    <v-col
      md="4"
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
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import ForkCard from '../../../components/fork-card.vue'
export default {
  components: {
    ForkCard
  },
  data() {
    return {
      coinId: this.$route.params.id
    }
  },
  computed: {
    ...mapState({
      coin(state) {
        return state.coins.find(coin => coin._id === this.coinId)
      }
    }),
    upcomingForks() {
      return this.$store.getters.upcomingForks.filter(fork => fork.coinId === this.coinId)
    }
  },
  head() {
    return {
      title: this.coin.name + ' Hardfork Countdown' || 'Coin'
    }
  }
}
</script>
