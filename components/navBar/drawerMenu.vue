<template>
  <div>
    <v-list>
      <v-list-item v-if="!isLogin">
        <v-btn block color="primary" @click="$refs.loginDialog.visible = true">
          <v-icon left>mdi-login</v-icon>ログイン
        </v-btn>
        <loginDialog ref="loginDialog"/>
      </v-list-item>
      <v-list-item v-else>
        <v-list-item-avatar>
          <v-img :src="loginUser.photoURL"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ loginUser.displayName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list>
      <v-divider/>
      <v-list-item @click="onPressCreateEvent">
        <v-list-item-title>イベント作成</v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list-item href="https://trello.com/b/PdniZKBA/" target="_blank">
        <v-list-item-title>不具合と更新予定の一覧表</v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list-item
        href="https://docs.google.com/forms/d/e/1FAIpQLSdnW0_HoPtNdZJrk-QBvawTE_yGD_5MI_ENmZnQOJF3fSjSnA/viewform"
        target="_blank"
      >
        <v-list-item-title>お問い合わせ</v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list-item nuxt to="/">
        <v-list-item-title>トップページ</v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list-item href="https://marshmallow-qa.com/matoi_yumiya" target="_blank">
        <v-list-item-title>マシュマロ</v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-list>

    <v-list v-if="isLogin">
      <v-divider/>
      <v-list-item @click="$refs.logoutDialog.visible = true">
        <v-list-item-action>
          <v-icon left>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-title>ログアウト</v-list-item-title>
      </v-list-item>
      <v-divider/>
      <logoutDialog ref="logoutDialog"/>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import loginDialog from '~/components/navBar/loginDialog'
import logoutDialog from '~/components/navBar/logoutDialog'

export default {
  components: { loginDialog, logoutDialog },
  computed: {
    ...mapState('account', ['isLogin', 'loginUser'])
  },
  methods: {
    onPressCreateEvent() {
      if (this.isLogin) {
        this.$router.push(`/event/create`)
      } else {
        this.$refs.loginDialog.open(`/event/create`)
      }
    }
  }
}
</script>
