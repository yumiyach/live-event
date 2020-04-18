<template>
  <div>
    <v-app-bar dense color="#fff">
      <v-btn text small color="primary" to="/">TOP</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title
        class="font-weight-black"
        :style="{color:$vuetify.theme.currentTheme.primary}"
      >{{eventData.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab depressed outlined x-small color="primary" @click="eventInfomationVisible=true">
        <v-icon>mdi-information-variant</v-icon>
      </v-btn>
    </v-app-bar>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    eventInfomationVisible: false
  }),
  computed: {
    ...mapGetters('event', ['eventById']),
    eventId() {
      return this.$route.params.eventId
    },
    eventData() {
      return this.eventById(this.eventId).data
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('event', ['getEvent']),
    init() {
      this.getEvent(this.eventId)
      if (this.$router.history.current.hash) {
        this.model = parseInt(
          this.$router.history.current.hash.replace('#', '')
        )
      }
    }
  }
}
</script>
