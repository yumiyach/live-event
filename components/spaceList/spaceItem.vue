<template>
  <v-card class="mx-4" height="80" width="80">
    <v-img :src="spaceData.headerImageUrl" aspect-ratio="1">
      <v-row
        class="fill-height caption"
        align="center"
        justify="center"
        :style="{
          backgroundColor: '#000',
          opacity: active ? 0 : 0.6,
          color: '#fff'
        }"
      >
        <v-col class="text-center">{{userData.displayName}}</v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    spaceId: {
      type: String,
      required: false,
      default: null
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters('space', ['spaceById']),
    ...mapGetters('user', ['userById']),
    spaceData() {
      return this.spaceById(this.spaceId).data
    },
    userData() {
      return this.userById(this.spaceData.userId).data
    }
  }
}
</script>