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
        <v-dialog v-model="eventInfomationVisible" max-width="300">
          <v-card>
            <v-card-title>{{eventData.name}}</v-card-title>
            <v-card-text>
              <p>{{eventData.description}}</p>
            </v-card-text>
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
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { drawerMenu },
  data: () => ({
    eventInfomationVisible: false,
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
