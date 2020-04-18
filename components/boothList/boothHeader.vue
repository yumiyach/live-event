<template>
  <v-row class="mx-0 mt-4 align-center">
    <v-layout class="display-1 mb-4" align-center>
      <v-chip v-if="boothData.isOnline" class="ma-2" color="primary">在席中</v-chip>
      <v-chip v-else class="ma-2" color="default">離席中</v-chip>
      {{ boothData.name }}
    </v-layout>
    <div class="ml-auto mb-4">
      <v-btn class="mx-1" fab dark small color="#55acee">
        <v-icon dark>mdi-twitter</v-icon>
      </v-btn>
      <v-btn fab dark small color="primary">
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
    boothData() {
      return this.boothById(this.boothId).data
    }
  }
}
</script>
