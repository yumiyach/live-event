<template>
  <v-container fill-height class="pt-0">
    <component :is="isLoading ? null : 'boothList'" :eventId="eventId"/>
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
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('event', ['getEvent']),
    ...mapActions('booth', ['getBoothListByEventId']),
    init() {
      this.getEvent(this.eventId)
      this.getBoothListByEventId(this.eventId)
      this.isLoading = false
    }
  }
}
</script>
