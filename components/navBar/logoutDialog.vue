<template>
  <v-dialog v-show="isLogin" v-model="visible" width="240" color="white">
    <v-card>
      <v-card-title primary-title style="position:sticky;top:0;z-index:1;">ログアウト</v-card-title>
      <v-card-text>
        <p>ログアウトしますか？</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="visible = false">キャンセル</v-btn>
        <v-spacer/>
        <v-btn color="primary" @click="doLogout" :loading="isLoading">ログアウト</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    visible: false,
    isLoading: false
  }),
  computed: {
    ...mapState('account', ['isLogin'])
  },
  methods: {
    ...mapActions('account', ['logout']),
    async doLogout() {
      this.isLoading = true
      await this.logout()
      this.$router.push('/')
      this.visible = false
      this.isLoading = false
    }
  }
}
</script>
