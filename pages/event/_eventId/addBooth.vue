<template>
  <v-container>
    <v-content>
      <v-card
        :color="this.$vuetify.theme.themes.light.back"
        flat
        class="my-3 mx-auto"
        max-width="876"
      >
        <v-card-title class="display-1 accent--text">
          <v-icon large left color="accent">mdi-account</v-icon>『{{
            eventData.name
          }}』に出展する
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation @submit.prevent>
            <v-file-input :rules="imageRules" @change="onFilePicked" accept="image/*" label="ヘッダー画像"></v-file-input>
            <h2>頒布物一覧</h2>
            <v-row>
              <v-col
                v-for="(item, i) in itemList"
                :key="i"
                cols="12"
                sm="6"
                lg="4"
              >
                <v-card>
                  <v-row class="ma-0">
                    <v-col class="pa-0">
                      <v-img
                        style="height:100%"
                        :src="item.image"
                        aspect-ratio="0.707"
                      />
                    </v-col>
                    <v-col
                      class="pa-0"
                      style="display: flex;flex-direction: column;"
                    >
                      <v-card-title v-text="item.name"></v-card-title>
                      <v-card-subtitle
                        v-text="item.description"
                      ></v-card-subtitle>
                      <v-card-actions class="mt-auto">
                        <v-btn
                          v-for="(link, k) in item.linkList"
                          :key="k"
                          :href="link.url"
                          target="_blank"
                          small
                          outlined
                          >{{ link.text }}</v-btn
                        >
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="30"
          class="mb-3"
          label="欲しいものリストURL"
          outlined
        ></v-text-field>
        <v-card-actions class="pa-4 mx-auto" style="max-width:600px">
          <v-btn
            x-large
            style="width:100%"
            color="accent"
            @click="submit"
            :loading="isLoading"
          >
            <v-icon left>mdi-check</v-icon>出展する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {},
  head() {
    return {
      name: 'マイページ'
    }
  },
  data: () => ({
    isLoading: false,
    headerImage: null,
    itemList: [],
    wishListUrl: null
  }),
  computed: {
    ...mapGetters('event', ['eventById']),
    ...mapState('account', ['userId']),
    eventId() {
      return this.$route.params.eventId
    },
    eventData() {
      return this.eventById(this.eventId).data
    }
  },
  watch: {
    startDate(val) {
      this.startDateFormatted = this.formatDate(this.startDate)
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('account', ['onLogout']),
    ...mapActions('event', ['createEvent', 'getEvent']),
    init() {
      this.onLogout(() => {
        this.$router.push('/')
      })

      this.getEvent(this.eventId)
    },
    onFilePicked(e) {
      const file = e
      if (file !== undefined) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = file
        })
      } else {
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${year}/${month}/${day}`
    },
    parseDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        const eventData = {
          concluded: {
            name: this.name,
            description: this.description,
            tagList: this.tagList,
            startDate: new Date(this.startDate + ' ' + this.startTime),
            endDate: new Date(this.startDate + ' ' + this.endTime)
          },
          imageFile: this.imageFile
        }
        const event = await this.createEvent(eventData)
        this.$router.push('/event/' + event.id)
      }
    }
  }
}
</script>
