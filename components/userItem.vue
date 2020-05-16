<template>
  <v-layout justify-space-between align-center>
    <v-avatar size="24px" class="mr-2">
      <img
        class="user-icon"
        alt
        :src="userData.photoURL"
        :style="{ borderColor: $vuetify.theme.themes.light.primary }"
      >
    </v-avatar>
    <v-flex>
      <template v-if="this.userData.providerId === 'twitter.com'">
        <a :href="'https://twitter.com/intent/user?user_id=' + this.userData.uid" target="_blank">
          {{
          userData.displayName
          }}
        </a>
      </template>
      <template v-else-if="userData.providerId === 'google.com'">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ userData.displayName }}</span>
          </template>
          <v-card class="pa-2">{{userData.email}}</v-card>
        </v-menu>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    userId: {
      type: String,
      required: false,
      default: null
    }
  },
  data: () => ({
    showEmail: false
  }),
  computed: {
    ...mapGetters('user', ['userById']),
    userData() {
      return this.userById(this.userId).data
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('user', ['getUser']),
    async init() {
      const user = await this.getUser(this.userId)
    }
  }
}
</script>