<template>
  <div>
    <v-container>
      <v-content>
        <v-card
          :color="this.$vuetify.theme.themes.light.back"
          flat
          class="my-3 mx-auto"
          max-width="876"
        >
          <v-card-title
            class="logo justify-center pb-6 primary--text"
            style="line-height: 1;"
            :style="{fontSize:$vuetify.breakpoint.smAndDown?'32px':'60px'}"
          >ライブイベント</v-card-title>
          <v-card-text class="text-center pb-6">ネットを使ってリモートライブ！</v-card-text>
          <v-card-actions class="pb-6">
            <v-spacer/>
            <v-btn x-large color="primary">
              <v-icon left>mdi-twitter</v-icon>ツイートする
            </v-btn>
            <v-spacer/>
          </v-card-actions>
        </v-card>

        <v-row>
          <v-col v-for="(event, index) in eventList" :key="index" cols="12" md="6">
            <eventItem :eventId="event.id"/>
          </v-col>
        </v-row>
      </v-content>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import eventItem from '~/components/eventItem'

export default {
  components: { eventItem },
  computed: {
    ...mapState('event', ['eventList'])
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('event', ['getRecentlyEventList']),
    async init() {
      this.getRecentlyEventList(this.userId)
    }
  }
}
</script>