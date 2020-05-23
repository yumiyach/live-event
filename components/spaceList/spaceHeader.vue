<template>
  <v-row class="mx-0 mb-4 align-center">
    <v-col class="display-1" cols="12">{{ userData.displayName }}のスペース</v-col>
    <v-col
      class="d-flex pt-0"
      align-center
      cols="12"
      style="flex-wrap: wrap; justify-content: space-between;"
    >
      <userItem :userId="spaceData.userId" />
      <div class="ml-auto">
        <v-btn
          class="mx-1"
          fab
          dark
          small
          color="#55acee"
          @click="
            share(
              'twitter',
              userData.displayName + 'のスペース #' + eventData.name
            )
          "
        >
          <v-icon dark>mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          v-if="spaceData.wishListUrl"
          class="mx-1"
          fab
          dark
          small
          color="primary"
          :href="spaceData.wishListUrl"
          target="_blank"
        >
          <v-icon dark>mdi-gift</v-icon>
        </v-btn>
        <v-btn
          v-if="isMySpace"
          class="mx-1"
          dark
          color="primary"
          :to="`/event/${spaceData.eventId}/${spaceId}/edit`"
          >スペースを編集</v-btn
        >
      </div>
    </v-col>
    <v-col class="pt-0" cols="12">
      <v-chip
        v-for="(tag, index) in spaceData.tagList"
        :key="index"
        class="mr-3"
      >
        #{{ tag }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import share from '~/components/mixins/share'
import userItem from '~/components/userItem'

export default {
  mixins: [share],
  components: { userItem },
  props: {
    spaceId: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapGetters('space', ['spaceById']),
    ...mapGetters('event', ['eventById']),
    ...mapGetters('user', ['userById']),
    ...mapState('account', ['userId']),
    spaceData() {
      return this.spaceById(this.spaceId).data
    },
    eventData() {
      return this.eventById(this.spaceData.eventId).data
    },
    userData() {
      return this.userById(this.spaceData.userId).data
    },
    isMySpace() {
      return this.userId === this.spaceData.userId
    }
  }
}
</script>
