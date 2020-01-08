<template>
  <v-row
    wrap
  >
    <v-col
      xs="12"
      md="8"
      class="pt-0"
    >
      <v-row wrap>
        <v-col md="12">
          <v-card>
            <v-card-title>
              Welcome to HardForks.info
            </v-card-title>
            <v-card-text>
              <p>This is a rudimentary, soon to be improved, site for tracking BlockChain hardforks :)</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          v-for="(fork) in upcomingForks"
          :key="fork._id"
          md="12"
        >
          <ForkCard :fork="fork" />
        </v-col>
      </v-row>
    </v-col>
    <v-col
      xs="12"
      md="4"
    >
      <v-card>
        <v-card-title class="headline">
          Coins Tracked
        </v-card-title>
        <v-list two-line>
          <v-list-item v-for="(coin) in coins" :key="coin._id" nuxt :to="`/coins/${coin._id}`">
            <v-list-item-content>
              <v-list-item-title v-text="coin.name" />
              <v-list-item-subtitle v-text="coin.description" />
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">
                  mdi-information
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ForkCard from '../components/fork-card'
export default {
  components: {
    ForkCard
  },
  computed: {
    ...mapState({
      coins: state => state.coins
    }),
    ...mapGetters(['upcomingForks'])
  }
}
</script>
