<template>
  <v-container fill-height>
    <component
      :is="isLoading ? null : 'spaceList'"
      :eventId="eventId"
      :currentSpaceId="spaceId"
      class="pt-0"
    />
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
    },
    spaceId() {
      return this.$route.params.spaceId
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('event', ['getEvent']),
    ...mapActions('space', ['getSpaceListByEventId']),
    init() {
      this.getEvent(this.eventId)
      this.getSpaceListByEventId(this.eventId)
      this.isLoading = false
    }
  }
}
</script>
