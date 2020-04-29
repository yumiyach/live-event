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
      <template v-if="userPageUrl">
        <a :href="userPageUrl" target="_blank">
          {{
          userData.displayName
          }}
        </a>
      </template>
      <template v-else>{{ userData.displayName }}</template>
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
  computed: {
    ...mapGetters('user', ['userById']),
    userData() {
      return this.userById(this.userId).data
    },
    userPageUrl() {
      if (this.userData.providerId === 'twitter.com') {
        return 'https://twitter.com/intent/user?user_id=' + this.userData.uid
      } else {
        return false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('user', ['getUser']),
    async init() {
      const user = await this.getUser(this.userId)
      console.log(user)
    }
  }
}
</script>