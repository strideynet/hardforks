<template>
  <v-layout
    row
    justify-center
    align-center
    wrap
  >
    <v-flex
      xs12
      md8
    >
      <v-card>
        <v-card-title class="headline">
          Welcome HardForks.info
        </v-card-title>
        <v-card-text>
          <p>This is a rudimentary, soon to be improved, site for tracking BlockChain hardforks :)</p>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex
      xs12
      md8
    >
      <v-card>
        <v-card-title class="headline">
          Coins Tracked
        </v-card-title>
        <v-list two-line>
          <template v-for="(coin) in coins">
            <v-list-tile
              :key="coin._id"
              @click="$router.push({ path: `/coins/${coin._id}` })"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ coin.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ coin.description }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      coins: state => state.coins
    })
  }
}
</script>
