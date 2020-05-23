<template>
  <v-content>
    <template v-if="spaceList.length">
      <div style="margin: 0 -12px;">
        <v-carousel
          v-model="currentSpaceIndex"
          height="calc(100vh - 220px)"
          hide-delimiter-background
          hide-delimiters
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(space, i) in spaceList" :key="i">
            <v-layout wrap>
              <v-layout
                justify-center
                align-center
                wrap
                :style="{
                  height: 'calc(100vh - 220px)'
                }"
              >
                <v-img :src="space.data.headerImageUrl" style="height:100%"/>
              </v-layout>
            </v-layout>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div style="margin-bottom:112px">
        <spaceHeader :spaceId="spaceList[currentSpaceIndex].id"/>
        <v-tabs v-model="tab" grow>
          <v-tab class="title">頒布物</v-tab>
          <v-tab class="title">チャット</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <itemList :spaceId="spaceList[currentSpaceIndex].id"/>
          </v-tab-item>

          <v-tab-item>
            <commentList :spaceId="spaceList[currentSpaceIndex].id"/>
          </v-tab-item>
        </v-tabs-items>
      </div>
      <v-footer fixed class="pa-0" color="#ffffff88">
        <v-content class="pa-0">
          <v-layout justify-center>
            <v-slide-group v-model="currentSpaceIndex" class="pa-4" mandatory center-active>
              <v-slide-item
                v-for="(space, i) in spaceList"
                :key="i"
                v-slot:default="{ active, toggle }"
              >
                <div @click="toggle">
                  <spaceItem :spaceId="space.id" :active="active"/>
                </div>
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
            <v-card-title>まだスペースがありません。</v-card-title>
            <v-card-text>スペースを作成して、イベントを盛り上げましょう！</v-card-text>
            <v-card-actions class="justify-center">
              <v-btn large color="primary" @click="addSpace">サークル参加する</v-btn>
              <loginDialog ref="loginDialog"/>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-content>
    </template>
  </v-content>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import loginDialog from '~/components/navBar/loginDialog'
import spaceHeader from '@/components/spaceList/spaceHeader'
import itemList from '@/components/spaceList/itemList'
import commentList from '@/components/spaceList/commentList'
import spaceItem from '@/components/spaceList/spaceItem'

export default {
  components: { spaceHeader, itemList, commentList, loginDialog, spaceItem },
  props: {
    eventId: {
      type: String,
      required: false,
      default: null
    },
    currentSpaceId: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      currentSpaceIndex: 0,
      spaceId: null,
      tab: 0
    }
  },
  computed: {
    ...mapGetters('space', ['spaceListByEventId']),
    ...mapState('account', ['isLogin']),
    spaceList() {
      return this.spaceListByEventId(this.eventId)
    }
  },
  watch: {
    currentSpaceIndex(val) {
      this.spaceId = this.spaceList[val].id
      history.replaceState('', '', `/event/${this.eventId}/${this.spaceId}`)
      window.scrollTo(0, 0)
    },
    spaceList(spaceList) {
      if (this.currentSpaceId && !this.currentSpaceIndex) {
        const index = spaceList.findIndex(
          item => item.id == this.currentSpaceId
        )
        if (index !== -1) {
          this.currentSpaceIndex = index
          this.spaceId = this.currentSpaceId
        }
      }
    }
  },
  methods: {
    addSpace() {
      if (this.isLogin) {
        this.$router.push(`/event/${this.eventId}/addSpace`)
      } else {
        this.$refs.loginDialog.open(`/event/${this.eventId}/addSpace`)
      }
    }
  }
}
</script>
