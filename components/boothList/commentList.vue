<template>
  <v-list three-line>
    <v-list-item v-if="sessionState===0">
      <v-list-item-content>
        <div>
          <v-text-field label="名前"></v-text-field>
          <v-textarea name="input-7-1" label="メッセージ" rows="3"></v-textarea>
        </div>
        <v-btn depressed small color="primary">投稿</v-btn>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="sessionState===1">
      <v-list-item-content>イベントが終了しているため、新規コメントは投稿できません。</v-list-item-content>
    </v-list-item>
    <v-list-item v-if="sessionState===-1">
      <v-list-item-content>イベント開催期間中のみコメントが投稿できます。</v-list-item-content>
    </v-list-item>
    <v-divider/>
    <template v-if="sessionState===0|sessionState===1">
      <div v-for="(item, i) in commentList" :key="i">
        <v-list-item>
          <v-list-item-content>
            <p class="mb-2">{{ item.data.comment }}</p>
            <v-list-item-subtitle class="d-flex">
              <div class="mr-2">{{ item.data.user.name }}</div>
              <div class="shrink ml-auto">
                {{ item.data.date.getFullYear() }}/{{
                item.data.date.getMonth() + 1
                }}/{{ item.data.date.getDate() }}
                {{ item.data.date.getHours() }}:{{
                item.data.date.getMinutes()
                }}:{{ item.data.date.getSeconds() }}
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider/>
      </div>
      <v-list-item v-if="commentList.length">
        <v-list-item-content>
          <p class="mb-2">メッセージは以上です</p>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    boothId: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
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
  }
}
</script>
