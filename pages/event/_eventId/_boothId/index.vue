<template>
  <v-container fill-height>
    <component :is="isLoading ? null : 'boothList'" :eventId="eventId" :currentBoothId="boothId"/>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import boothList from '~/components/boothList'

export default {
  layout: 'event',
  components: { boothList },
  data: () => ({
    isLoading: true
  }),
  computed: {
    eventId() {
      return this.$route.params.eventId
    },
    boothId() {
      return this.$route.params.boothId
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('event', ['getEvent']),
    init() {
      this.getEvent(this.eventId)
      this.isLoading = false
    }
  }
}
</script>
