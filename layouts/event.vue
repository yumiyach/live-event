<template>
  <v-app light>
    <navBar/>
    <nuxt/>
  </v-app>
</template>

<script>
import navBar from '~/components/navBar/event'

export default {
  components: { navBar }
}
</script>
