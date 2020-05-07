<template>
  <div>
    <v-app-bar fixed app class="justify-center">
      <v-layout class="ma-auto align-center">
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-spacer />
        <v-toolbar-title class="logo" style="font-size:24px">{{
          eventData.name
        }}</v-toolbar-title>
        <v-spacer />
        <v-btn
          fab
          depressed
          outlined
          x-small
          color="primary"
          @click="eventInfomationVisible = true"
        >
          <v-icon>mdi-information-variant</v-icon>
        </v-btn>
        <v-dialog v-model="eventInfomationVisible" max-width="1000px">
          <v-card>
            <v-layout wrap>
              <v-layout
                justify-center
                align-center
                wrap
                :style="{
                  height: 'calc(100vh - 220px)'
                }"
              >
                <v-img :src="eventData.headerImageUrl" style="height:100%" />
              </v-layout>
            </v-layout>
            <v-card-title class="d-flex">
              <span class="mr-3">{{ eventData.name }}</span>
              <div class="ml-auto">
                <v-btn
                  class="mx-1"
                  fab
                  dark
                  x-small
                  color="#55acee"
                  @click="
                    share(
                      'twitter',
                      '#' +
                        eventData.name +
                        ' ' +
                        (inSession
                          ? '開催中！'
                          : until !== '終了'
                          ? '開催まで' + until + '！'
                          : '【過去イベント】')
                    )
                  "
                >
                  <v-icon dark>mdi-twitter</v-icon>
                </v-btn>
                <v-btn
                  small
                  v-if="eventData.userId === userId"
                  color="primary"
                  :to="`/event/${eventId}/edit`"
                  >イベント編集</v-btn
                >
              </div>
            </v-card-title>
            <v-card-text>
              <v-layout align-center class="mb-2" wrap>
                <v-chip small class="mr-2" color="primary">主催</v-chip>
                <userItem v-if="eventData.userId" :userId="eventData.userId" />
              </v-layout>
              <v-layout align-center wrap>
                <v-chip small class="mr-2" color="primary">日時</v-chip>
                <v-chip
                  v-if="inSession"
                  label
                  outlined
                  x-small
                  class="mr-2"
                  color="primary"
                  >開催中</v-chip
                >
                <v-chip v-else-if="until" label outlined x-small class="mr-2">{{
                  until
                }}</v-chip>
                <div class="mr-2">{{ date }}</div>
              </v-layout>
            </v-card-text>
            <v-card-text>
              <v-chip
                v-for="(tag, index) in eventData.tagList"
                :key="index"
                class="mr-3"
                x-small=""
              >
                #{{ tag }}
              </v-chip>
            </v-card-text>
            <v-card-text>{{ eventData.description }}</v-card-text>
            <v-card-actions>
              <v-btn v-if="!myBooth" large color="primary" @click="addBooth"
                >サークル参加</v-btn
              >
              <v-btn
                v-else
                large
                color="primary"
                :to="`/event/${eventId}/${myBooth.id}/edit`"
                >ブースを編集</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn depressed @click="eventInfomationVisible = false"
                >閉じる</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary fixed>
      <drawer-menu />
    </v-navigation-drawer>
  </div>
</template>

<script>
import drawerMenu from '~/components/navBar/drawerMenu'
import userItem from '~/components/userItem'
import share from '~/components/mixins/share'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  mixins: [share],
  components: { drawerMenu, userItem },
  data: () => ({
    eventInfomationVisible: true,
    drawer: false,
    today: new Date()
  }),
  computed: {
    ...mapState('account', ['isLogin', 'userId']),
    ...mapGetters('event', ['eventById']),
    ...mapGetters('booth', ['boothListByEventId']),
    eventId() {
      return this.$route.params.eventId
    },
    eventData() {
      return this.eventById(this.eventId).data
    },
    myBooth() {
      const boothList = this.boothListByEventId(this.eventId)
      return boothList.find(item => item.data.userId === this.userId)
    },
    date() {
      if (!this.eventData.startDate || !this.eventData.endDate) {
        return ''
      }
      return (
        this.eventData.startDate.getFullYear() +
        '/' +
        ('00' + (this.eventData.startDate.getMonth() + 1)).slice(-2) +
        '/' +
        ('00' + this.eventData.startDate.getDate()).slice(-2) +
        ' ' +
        ('00' + this.eventData.startDate.getHours()).slice(-2) +
        ':' +
        ('00' + this.eventData.startDate.getMinutes()).slice(-2) +
        '～' +
        ('00' + this.eventData.endDate.getHours()).slice(-2) +
        ':' +
        ('00' + this.eventData.endDate.getMinutes()).slice(-2)
      )
    },
    inSession() {
      if (!this.eventData.startDate || !this.eventData.endDate) {
        return false
      }
      const today = this.today.getTime()
      const startDate = this.eventData.startDate.getTime()
      const endDate = this.eventData.endDate.getTime()
      if (startDate < today && today < endDate) {
        return true
      } else {
        return false
      }
    },
    until() {
      if (!this.eventData.startDate || !this.eventData.endDate) {
        return false
      }
      const today = this.today.getTime()
      const startDate = this.eventData.startDate.getTime()
      const endDate = this.eventData.endDate.getTime()
      if (today < startDate) {
        const until = startDate - today
        if (24 * 60 * 60 * 1000 < until) {
          return 'あと' + parseInt(until / (24 * 60 * 60 * 1000)) + '日'
        }
        if (60 * 60 * 1000 < until) {
          return 'あと' + parseInt(until / (60 * 60 * 1000)) + '時間'
        }
        return 'あと' + parseInt(until / (60 * 1000)) + '分'
      } else {
        return '終了'
      }
    }
  },
  methods: {
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
