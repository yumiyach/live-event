<template>
  <v-container>
    <boothList :eventId="eventId" style="margin: 0 -12px;"/>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import boothList from '~/components/boothList'

export default {
  layout: 'event',
  components: { boothList },
  data: () => ({
    eventInfomationVisible: false
  }),
  computed: {
    eventId() {
      return this.$route.params.eventId
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('event', ['getEvent']),
    init() {
      this.getEvent(this.eventId)
    }
  }
}
</script>
