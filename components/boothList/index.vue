<template>
  <v-row>
    <template v-if="boothList.length">
      <v-carousel
        v-model="currentBoothIndex"
        height="calc(100vh - 220px)"
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
        style="margin: 0 -12px;"
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
        <boothHeader :boothId="boothId" />
        <v-content>
          <v-tabs v-model="tab" grow>
            <v-tab class="title">頒布物</v-tab>
            <v-tab class="title">コメント</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <itemList :boothId="boothId" />
            </v-tab-item>

            <v-tab-item>
              <commentList :boothId="boothId" />
            </v-tab-item>
          </v-tabs-items>
        </v-content>
      </v-container>

      <v-footer fixed class="pa-0" color="#ffffff88">
        <v-content class="pa-0">
          <v-layout justify-center>
            <v-slide-group
              v-model="currentBoothIndex"
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
    <template v-else>
      <v-content>
        <v-row align="center" justify="center">
          <v-card>
            <v-card-title>まだブースがありません。</v-card-title>
            <v-card-text
              >ブースを作成して、イベントを盛り上げましょう！</v-card-text
            >
            <v-card-actions class="justify-center">
              <v-btn large color="primary" @click="addBooth"
                >ブースを作成する</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-row>
      </v-content>
      <loginDialog ref="loginDialog" />
    </template>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import loginDialog from '~/components/navBar/loginDialog'
import boothHeader from '@/components/boothList/boothHeader'
import itemList from '@/components/boothList/itemList'
import commentList from '@/components/boothList/commentList'

export default {
  components: { boothHeader, itemList, commentList, loginDialog },
  props: {
    eventId: {
      type: String,
      required: false,
      default: null
    },
    currentBoothId: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      currentBoothIndex: 0,
      boothId: null,
      tab: 0
    }
  },
  computed: {
    ...mapGetters('booth', ['boothListByEventId']),
    ...mapState('account', ['isLogin']),
    boothList() {
      return this.boothListByEventId(this.eventId)
    }
  },
  watch: {
    currentBoothIndex(val) {
      this.boothId = this.boothList[val].id
      history.replaceState('','',`/event/${this.eventId}/${this.boothId}`)
      window.scrollTo(0, 0)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.currentBoothId) {
        const index = this.boothList.findIndex(item => item.id == this.currentBoothId)
        if (index && index !== -1) {
          this.currentBoothIndex = index
          this.boothId = this.currentBoothId
        }
      }
    },
    addBooth() {
      if (this.isLogin) {
        this.$router.push(`/event/${this.eventId}/addBooth`)
      } else {
        this.$refs.loginDialog.open(`/event/${this.eventId}/addBooth`)
      }
    }
  }
}
</script>
