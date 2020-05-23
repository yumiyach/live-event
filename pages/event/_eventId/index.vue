<template>
  <v-container fill-height class="pt-0">
    <component :is="isLoading ? null : 'spaceList'" :eventId="eventId"/>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import spaceList from '~/components/spaceList'

export default {
  layout: 'event',
  components: { spaceList },
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
    ...mapActions('space', ['getSpaceListByEventId']),
    async init() {
      await this.getEvent(this.eventId)
      await this.getSpaceListByEventId(this.eventId)
      this.isLoading = false
    }
  }
}
</script>
