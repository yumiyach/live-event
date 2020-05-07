<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-list>
        <v-list-item v-if="sessionState === 0 && isLogin">
          <v-list-item-content>
            <div>
              <v-form ref="form" lazy-validation @submit.prevent>
                <v-textarea
                  v-model="commentText"
                  label="コメント"
                  rows="3"
                  :rules="[
                    v => !!v || 'コメント文は必須です',
                    v =>
                      (v && Array.from(v).length <= 1000) ||
                      'コメントは1000文字以内にしてください。'
                  ]"
                ></v-textarea>
              </v-form>
            </div>
            <v-btn depressed color="primary" :loading="isLoading" @click="post"
              >投稿</v-btn
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="sessionState === 0 && !isLogin">
          <v-list-item-content>
            <v-row>
              <v-col class="text-center" cols="12">
                コメントを投稿するにはログインが必要です。
              </v-col>
              <v-col class="text-center" cols="12">
                <v-btn
                  color="primary"
                  @click="$refs.loginDialog.visible = true"
                >
                  <v-icon left>mdi-login</v-icon>ログイン
                </v-btn>
              </v-col>
            </v-row>
            <loginDialog ref="loginDialog" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="sessionState === 1">
          <v-list-item-content
            >イベントが終了しているため、新規コメントは投稿できません。</v-list-item-content
          >
        </v-list-item>
        <v-list-item v-if="sessionState === -1">
          <v-list-item-content
            >イベント開催期間中のみコメントが投稿できます。</v-list-item-content
          >
        </v-list-item>
        <v-divider />
      </v-list>
    </v-col>
    <v-col cols="12" md="6">
      <v-list three-line>
        <template v-if="(sessionState === 0) | (sessionState === 1)">
          <div v-for="(item, i) in commentList" :key="i">
            <v-list-item>
              <v-list-item-content>
                <p class="mb-2">{{ item.data.comment }}</p>
                <v-list-item-subtitle class="d-flex align-end">
                  <userItem class="mr-2" :userId="item.data.userId"/>
                  <div class="shrink ml-auto">
                    {{ item.data.createdAt.getFullYear() }}/{{
                      item.data.createdAt.getMonth() + 1
                    }}/{{ item.data.createdAt.getDate() }}
                    {{ item.data.createdAt.getHours() }}:{{
                      item.data.createdAt.getMinutes()
                    }}:{{ item.data.createdAt.getSeconds() }}
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
          </div>
          <v-list-item>
            <v-list-item-content v-if="commentList.length">
              <p class="mb-2">コメントは以上です</p>
            </v-list-item-content>
            <v-list-item-content v-else-if="sessionState === 0 && isLogin">
              <p class="mb-2">コメントを投稿しましょう！</p>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import loginDialog from '~/components/navBar/loginDialog'
import userItem from '~/components/userItem'

export default {
  components: { loginDialog ,userItem},
  props: {
    boothId: {
      type: String,
      required: false,
      default: null
    }
  },
  data: () => ({
    isLoading: false,
    commentText: ''
  }),
  computed: {
    ...mapState('account', ['isLogin']),
    ...mapGetters('comment', ['commentListByBoothId']),
    ...mapGetters('booth', ['boothById']),
    ...mapGetters('event', ['eventById']),
    boothData() {
      return this.boothById(this.boothId).data
    },
    eventData() {
      return this.eventById(this.boothData.eventId).data
    },
    sessionState() {
      if (!this.eventData.startDate || !this.eventData.endDate) {
        return false
      }
      const today = new Date().getTime()
      const startDate = this.eventData.startDate.getTime()
      const endDate = this.eventData.endDate.getTime()
      if (startDate < today && today < endDate) {
        return 0
      } else if (today < startDate) {
        return -1
      }
      return 1
    },
    commentList() {
      return this.commentListByBoothId(this.boothId)
    }
  },
  methods: {
    ...mapActions('comment', ['createComment']),
    async post() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        await this.createComment({
          comment: this.commentText,
          boothId: this.boothId,
          eventId: this.boothData.eventId
        })
        this.$refs.form.reset()
        this.isLoading = false
      }
    }
  }
}
</script>
