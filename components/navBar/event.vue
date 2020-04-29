<template>
  <div>
    <v-app-bar fixed app class="justify-center">
      <v-layout class="ma-auto align-center">
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-spacer/>
        <v-toolbar-title class="logo" style="font-size:24px">{{eventData.name}}</v-toolbar-title>
        <v-spacer/>
        <v-btn fab depressed outlined x-small color="primary" @click="eventInfomationVisible=true">
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
                <v-img :src="eventData.imageUrl" style="height:100%"/>
              </v-layout>
            </v-layout>
            <v-card-title>{{eventData.name}}</v-card-title>
            <v-card-text class="d-flex align-center">
              <v-chip class="mr-2" color="primary">主催者</v-chip>
              <userItem v-if="eventData.userId" :userId="eventData.userId"/>
            </v-card-text>
            <v-card-text>{{eventData.description}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed @click="eventInfomationVisible = false">閉じる</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary fixed>
      <drawer-menu/>
    </v-navigation-drawer>
  </div>
</template>

<script>
import drawerMenu from '~/components/navBar/drawerMenu'
import userItem from '~/components/userItem'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { drawerMenu, userItem },
  data: () => ({
    eventInfomationVisible: true,
    drawer: false
  }),
  computed: {
    ...mapState('account', ['isLogin', 'loginUser']),
    ...mapGetters('event', ['eventById']),
    eventId() {
      return this.$route.params.eventId
    },
    eventData() {
      return this.eventById(this.eventId).data
    }
  },
  methods: {
    submitSearch(validate) {
      if (validate) {
        this.$router.push('/search/tag/' + encodeURIComponent(this.search))
        this.searchMenuVisible = false
      }
    }
  }
}
</script>
