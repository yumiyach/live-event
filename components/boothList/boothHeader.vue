<template>
  <v-row class="mx-0 mt-4 align-center">
    <v-layout class="display-1 mb-4" align-center>
      <v-chip v-if="boothData.isOnline" class="ma-2" color="primary">在席中</v-chip>
      <v-chip v-else class="ma-2" color="default">離席中</v-chip>
      {{userData.displayName}}
    </v-layout>
    <div class="ml-auto mb-4">
      <v-btn
        class="mx-1"
        fab
        dark
        small
        color="#55acee"
        :href="'https://twitter.com/intent/user?user_id=' + userData.uid"
        target="_blank"
      >
        <v-icon dark>mdi-twitter</v-icon>
      </v-btn>
      <v-btn
        v-if="boothData.wishListUrl"
        fab
        dark
        small
        color="primary"
        :href="boothData.wishListUrl"
        target="_blank"
      >
        <v-icon dark>mdi-gift</v-icon>
      </v-btn>
    </div>
  </v-row>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    boothId: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapGetters('booth', ['boothById']),
    ...mapGetters('user', ['userById']),
    boothData() {
      return this.boothById(this.boothId).data
    },
    userData() {
      return this.userById(this.boothData.userId).data
    }
  }
}
</script>
