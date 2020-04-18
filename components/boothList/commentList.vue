<template>
  <v-list three-line>
    <v-list-item>
      <v-list-item-content>
        <div>
          <v-text-field label="名前"></v-text-field>
          <v-textarea name="input-7-1" label="メッセージ" rows="3"></v-textarea>
        </div>
        <v-btn depressed small color="primary">投稿</v-btn>
      </v-list-item-content>
    </v-list-item>
    <v-divider/>
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
    <v-list-item>
      <v-list-item-content>
        <p class="mb-2">メッセージは以上です</p>
      </v-list-item-content>
    </v-list-item>
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
    commentList() {
      return this.commentListByBoothId(this.boothId)
    }
  }
}
</script>
