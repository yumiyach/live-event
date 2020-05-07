<template>
  <v-row>
    <v-col v-for="(item, i) in boothData.itemList" :key="i" cols="12" md="6">
      <v-card>
        <v-row class="ma-0">
          <v-col class="pa-0" cols="12" sm="6">
            <v-img style="height:100%" :src="item.imageUrl ? item.imageUrl : require('~/assets/images/no_image.png')" aspect-ratio="0.707"/>
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" style="display: flex;flex-direction: column;">
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-subtitle>{{item.description}}</v-card-subtitle>
            <v-card-actions v-if="sessionState===0||sessionState===1" class="mt-auto">
              <v-btn
                v-for="(link, k) in item.linkList"
                :key="k"
                :href="link.url"
                target="_blank"
                small
                outlined
              >{{ link.text }}</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
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
    ...mapGetters('event', ['eventById']),
    ...mapGetters('booth', ['boothById']),
    boothData() {
      return this.boothById(this.boothId).data
    },
    eventData() {
      return this.eventById(this.boothData.eventId).data
    },
    sessionState() {
      if (!this.eventData.startDate || !this.eventData.endDate) {
        return false
      }
      const today = new Date().getTime()
      const startDate = this.eventData.startDate.getTime()
      const endDate = this.eventData.endDate.getTime()
      if (startDate < today && today < endDate) {
        return 0
      } else if (today < startDate) {
        return -1
      }
      return 1
    }
  }
}
</script>
