<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-toolbar-title>HardForks.info</v-toolbar-title> &nbsp;
      <v-toolbar-items>
        <v-btn
          v-if="$route.path !== '/'"
          to="/"
          nuxt
          text
        >
          Home
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container
        grid-list-md
      >
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      app
    >
      <span>&copy; 2019 Noah Stride</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.$vuetify.theme.dark = true
    this.$store.dispatch('nuxtServerInit')
    setInterval(() => {
      this.$store.dispatch('nuxtServerInit')
    }, 1000 * 60)
    setInterval(() => {
      this.$store.dispatch('updateTime')
    }, 1000)
  }
}
</script>
