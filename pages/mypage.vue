<template>
  <v-container>
    <v-content>
      <v-card
        :color="this.$vuetify.theme.themes.light.back"
        flat
        class="my-3 mx-auto"
        max-width="876"
      >
        <v-card-title class="display-1 accent--text">
          <v-icon large left color="accent">mdi-account</v-icon>マイページ
        </v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions class="justify-center pb-4">
          <v-btn x-large color="accent" to="/sort/create">新しくソートを作る</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {},
  head() {
    return {
      title: 'マイページ'
    }
  },
  computed: {
    ...mapState('account', ['userId'])
  },
  created() {
    this.onLogout(() => {
      this.$router.push('/')
    })
  },
  methods: {
    ...mapActions('account', ['onLogout'])
  }
}
</script>