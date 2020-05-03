<template>
  <v-card>
    <v-img :src="eventData.imageUrl" aspect-ratio="2"/>
    <v-list three-line class="py-0">
      <v-divider/>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="d-flex align-center mb-2">
            <span class="ml-2 title primary--text">{{eventData.name}}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="d-flex align-center mb-4">
            <v-chip v-if="inSession" x-small color="primary">開催中</v-chip>
            <v-chip v-else-if="until" x-small color="accent">{{until}}</v-chip>
            <v-flex shrink class="ml-2">開催日 {{date}}</v-flex>
          </v-list-item-subtitle>
          <v-list-item-subtitle>{{eventData.description}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    eventId: {
      type: String,
      required: false,
      default: null
    }
  },
  data: () => ({
    today: new Date()
  }),
  computed: {
    ...mapGetters('event', ['eventById']),
    eventData() {
      return this.eventById(this.eventId).data
    },
    date() {
      if (!this.eventData.startDate || !this.eventData.endDate) {
        return ''
      }
      return (
        this.eventData.startDate.getFullYear() +
        '/' +
        ('00' + (this.eventData.startDate.getMonth() + 1)).slice(-2) +
        '/' +
        ('00' + this.eventData.startDate.getDate()).slice(-2) +
        ' ' +
        ('00' + this.eventData.startDate.getHours()).slice(-2) +
        ':' +
        ('00' + this.eventData.startDate.getMinutes()).slice(-2) +
        '～' +
        ('00' + this.eventData.endDate.getHours()).slice(-2) +
        ':' +
        ('00' + this.eventData.endDate.getMinutes()).slice(-2)
      )
    },
    inSession() {
      if (!this.eventData.startDate || !this.eventData.endDate) {
        return false
      }
      const today = this.today.getTime()
      const startDate = this.eventData.startDate.getTime()
      const endDate = this.eventData.endDate.getTime()
      if (startDate < today && today < endDate) {
        return true
      } else {
        return false
      }
    },
    until() {
      if (!this.eventData.startDate || !this.eventData.endDate) {
        return false
      }
      const today = this.today.getTime()
      const startDate = this.eventData.startDate.getTime()
      const endDate = this.eventData.endDate.getTime()
      if (today < startDate) {
        const until = startDate - today
        if (24 * 60 * 60 * 1000 < until) {
          return 'あと' + parseInt(until / (24 * 60 * 60 * 1000)) + '日'
        }
        if (60 * 60 * 1000 < until) {
          return 'あと' + parseInt(until / (60 * 60 * 1000)) + '時間'
        }
        return 'あと' + parseInt(until / (60 * 1000)) + '分'
      } else {
        return '終了'
      }
    }
  }
}
</script>