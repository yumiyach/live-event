<template>
  <div>
    <template v-if="boothList.length">
      <v-carousel
        v-model="currentBoothId"
        height="calc(100vh - 220px)"
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(booth, i) in boothList" :key="i">
          <v-layout wrap>
            <v-layout
              justify-center
              align-center
              wrap
              :style="{
                height: 'calc(100vh - 220px)'
              }"
            >
              <v-img :src="booth.data.image" style="height:100%" />
            </v-layout>
          </v-layout>
        </v-carousel-item>
      </v-carousel>
      <v-container style="margin-bottom:112px">
        <boothHeader :boothId="boothList[currentBoothId].id" />
        <v-content>
          <v-tabs v-model="tab" grow>
            <v-tab class="title">頒布物</v-tab>
            <v-tab class="title">コメント</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <itemList :boothId="boothList[currentBoothId].id" />
            </v-tab-item>

            <v-tab-item>
              <commentList :boothId="boothList[currentBoothId].id" />
            </v-tab-item>
          </v-tabs-items>
        </v-content>
      </v-container>

      <v-footer fixed class="pa-0" color="#ffffff88">
        <v-content class="pa-0">
          <v-layout justify-center>
            <v-slide-group
              v-model="currentBoothId"
              class="pa-4"
              mandatory
              center-active
            >
              <v-slide-item
                v-for="(booth, i) in boothList"
                :key="i"
                v-slot:default="{ active, toggle }"
              >
                <v-card class="mx-4" height="80" width="80" @click="toggle">
                  <v-img :src="booth.data.image" aspect-ratio="1">
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
                      <v-col class="text-center">{{ booth.data.name }}</v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-layout>
        </v-content>
      </v-footer>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import boothHeader from '@/components/boothList/boothHeader'
import itemList from '@/components/boothList/itemList'
import commentList from '@/components/boothList/commentList'

export default {
  components: { boothHeader, itemList, commentList },
  props: {
    eventId: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      currentBoothId: 0,
      tab: 0
    }
  },
  computed: {
    ...mapGetters('booth', ['boothListByEventId']),
    boothList() {
      return this.boothListByEventId(this.eventId)
    }
  },
  watch: {
    currentBoothId() {
      window.scrollTo(0, 0)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$router.history.current.hash) {
        this.currentBoothId = parseInt(
          this.$router.history.current.hash.replace('#', '')
        )
      }
    }
  }
}
</script>
