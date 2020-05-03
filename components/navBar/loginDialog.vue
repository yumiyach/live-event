<template>
  <v-dialog v-show="isLogin" v-model="visible" width="400" color="white">
    <v-card>
      <v-card-title primary-title style="position:sticky;top:0;z-index:1;">ログイン/新規登録</v-card-title>
      <v-card-text>
        <p>イベントの作成にはログインまたは新規登録が必要です。</p>
        <v-btn class="mb-2" block dark color="#55acee" @click="login('twitter')">
          <v-icon left>mdi mdi-twitter</v-icon>Twitter
        </v-btn>
        <!--
        <v-btn class="mb-2" block dark color="#385185" @click="login('facebook')">
          <v-icon left>mdi mdi-facebook</v-icon>Facebook
        </v-btn>
        <v-btn class="mb-2" block dark color="#dc4e41" @click="login('google')">
          <v-icon left>mdi mdi-google</v-icon>Google
        </v-btn>
        -->
        <p class="caption">※ポップアップを許可してください。</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    visible: false,
    jumpTo: null
  }),
  computed: {
    ...mapState('account', ['isLogin'])
  },
  watch: {
    visible(val) {
      if (!val) {
        this.jumpTo = ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('account', ['login', 'onLogin']),
    open(jumpTo) {
      this.visible = true
      this.jumpTo = jumpTo
    },
    init() {
      this.onLogin(() => {
        this.visible = false
        if (this.jumpTo) {
          this.$router.push(this.jumpTo)
        }
      })
    }
  }
}
</script>
