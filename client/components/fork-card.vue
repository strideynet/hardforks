<template>
  <v-card>
    <v-card-title>
      {{ fork.coin.name }}: {{ fork.name }} at height {{ fork.blockHeight }}
    </v-card-title>
    <v-card-text>
      <v-row wrap>
        <v-col md="12">
          <v-row wrap>
            <v-col md="12">
              <h3 class="text-md-center display-1">
                <strong>Estimated Fork Time</strong> <br> {{ estimatedForkTime }}
              </h3>
            </v-col>
            <v-col md="6">
              <h3 class="text-md-center display-1">
                <strong>Blocks Remaining</strong> <br> {{ fork.blocksRemainingWhole }}
              </h3>
            </v-col>
            <v-col md="6">
              <h3 class="text-md-center display-1">
                <strong>Time Remaining</strong> <br> {{ countdownTime }}
              </h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="6">
          <h3 class="title">
            Upgrade Advice
          </h3>
          <h4>
            For Miners
          </h4>
          <p v-html="fork.advice.miners" />
          <h4>
            For Wallet Owners
          </h4>
          <p v-html="fork.advice.walletOwners" />
        </v-col>
        <v-col md="6">
          <v-list v-if="fork.links && fork.links.length" two-line>
            <v-list-item v-for="(link) in fork.links" :key="link.url" :href="link.url">
              <v-list-item-content>
                <v-list-item-title v-text="link.title" />
                <v-list-item-subtitle v-text="link.description" />
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
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
import countdown from 'countdown'

const countdownUnits = countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS
export default {
  props: {
    fork: {
      type: Object,
      required: true
    }
  },
  computed: {
    estimatedForkTime() {
      if (!this.fork.secondsToFork) {
        return ''
      }

      return moment().add(this.fork.secondsToFork, 'seconds').format('dddd, MMMM Do YYYY, h:mm:ss a')
    },
    countdownTime() {
      return countdown(moment().valueOf(), moment().add(this.fork.secondsToFork, 'seconds').valueOf(), countdownUnits, 3).toString()
    }
  }
}
</script>
