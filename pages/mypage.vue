<template>
  <v-container>
    <v-content>
      <v-card
        :color="this.$vuetify.theme.themes.light.back"
        flat
        class="my-3 mx-auto"
        max-width="876"
      >
        <v-card-title class="display-1 accent--text">
          <v-icon large left color="accent">mdi-account</v-icon>マイページ
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" lg="6">
              <v-card>
                <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2"/>
                <v-list three-line class="py-0">
                  <v-divider/>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="d-flex align-center mb-2">
                        <v-chip v-if="true" small color="primary">準備完了</v-chip>
                        <v-chip v-else small color="default">準備中</v-chip>
                        <span class="ml-2 title primary--text">イベント</span>
                      </v-list-item-title>
                      <v-list-item-subtitle class="d-flex align-center mb-4">
                        <v-chip v-if="true" x-small color="primary">あと1日</v-chip>
                        <v-chip v-else x-small color="accent">本日開催</v-chip>
                        <v-chip v-if="false" x-small color="default">過去のイベント</v-chip>
                        <v-flex shrink class="ml-2">開催日 2020/01/01</v-flex>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>説明説明説明説明説明説明説明説明説明</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-card-actions>
                  <v-btn class="mx-1" dark small color="#55acee">
                    <v-icon dark left>mdi-twitter</v-icon>ツイッターで宣伝する
                  </v-btn>
                  <v-spacer/>
                  <v-btn small color="accent">編集</v-btn>
                  <v-btn small color="error">削除</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {},
  head() {
    return {
      title: 'マイページ'
    }
  },
  computed: {
    ...mapState('account', ['userId'])
  },
  created() {
    this.onLogout(() => {
      this.$router.push('/')
    })
  },
  methods: {
    ...mapActions('account', ['onLogout'])
  }
}
</script>