<template>
  <div>
    <v-app-bar fixed app class="justify-center">
      <v-layout class="ma-auto align-center">
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-spacer/>
        <v-toolbar-title class="logo" style="font-size:24px" @click="$router.push('/')">ライブイベント</v-toolbar-title>
        <v-spacer/>
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
    ...mapState('account', ['isLogin'])
  }
}
</script>
