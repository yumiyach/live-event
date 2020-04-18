<template>
  <v-row>
    <v-col v-for="(item, i) in boothData.itemList" :key="i" cols="12" sm="6" lg="4">
      <v-card>
        <v-row class="ma-0">
          <v-col class="pa-0">
            <v-img style="height:100%" :src="item.image" aspect-ratio="0.707"/>
          </v-col>
          <v-col class="pa-0" style="display: flex;flex-direction: column;">
            <v-card-title v-text="item.name"></v-card-title>
            <v-card-subtitle v-text="item.description"></v-card-subtitle>
            <v-card-actions class="mt-auto">
              <v-btn
                v-for="(link, k) in item.linkList"
                :key="k"
                :href="link.url"
                target="_blank"
                small
                outlined
              >{{ link.text }}</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    boothId: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapGetters('booth', ['boothById']),
    boothData() {
      return this.boothById(this.boothId).data
    }
  }
}
</script>
