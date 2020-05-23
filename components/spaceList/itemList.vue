<template>
  <v-row>
    <v-col v-for="(item, i) in spaceData.itemList" :key="i" cols="12" md="6">
      <v-card>
        <v-row class="ma-0">
          <v-col class="pa-0" cols="12" sm="6">
            <v-img
              style="height:100%"
              :src="item.imageUrl ? item.imageUrl : require('~/assets/images/no_image.png')"
              aspect-ratio="0.707"
            />
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" style="display: flex;flex-direction: column;">
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-actions v-if="item.sampleUrl">
              <v-btn :href="item.sampleUrl" target="_blank" small outlined>サンプルはこちら</v-btn>
            </v-card-actions>
            <v-card-subtitle>{{item.description}}</v-card-subtitle>
            <v-card-actions v-if="sessionState===0||sessionState===1||isMySpace" class="mt-auto">
              <v-btn
                v-for="(link, k) in item.linkList"
                :key="k"
                :href="link.url"
                target="_blank"
                color="primary"
                outlined
              >{{ link.text }}</v-btn>
            </v-card-actions>
            <v-card-subtitle v-else class="mt-auto">通販リンクはイベント開始後に表示されます。</v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    spaceId: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapGetters('event', ['eventById']),
    ...mapGetters('space', ['spaceById']),
    ...mapState('account', ['userId']),
    spaceData() {
      return this.spaceById(this.spaceId).data
    },
    eventData() {
      return this.eventById(this.spaceData.eventId).data
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
    },
    isMySpace() {
      return this.userId === this.spaceData.userId
    }
  }
}
</script>
