<template>
  <v-app light>
    <navBar/>
    <nuxt/>
  </v-app>
</template>

<script>
import navBar from '~/components/navBar'

export default {
  components: { navBar }
}
</script>
