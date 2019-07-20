<template>
  <v-app dark>
    <v-toolbar
      fixed
      app
    >
      <v-toolbar-title>HardForks.info</v-toolbar-title>
      <v-toolbar-items>
        <v-btn
          v-if="$route.path !== '/'"
          to="/"
          nuxt
          flat
        >
          Home
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
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
  }
}
</script>
