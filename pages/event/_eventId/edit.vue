<template>
  <v-container>
    <v-content>
      <v-card
        :color="this.$vuetify.theme.themes.light.back"
        flat
        class="my-3 mx-auto"
        max-width="876"
      >
        <v-card-title class="display-1 accent--text">イベント編集</v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation @submit.prevent>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="30"
              class="mb-3"
              label="イベントの名前"
              outlined
            ></v-text-field>
            <v-combobox
              v-model="tagList"
              :items="tagListItem"
              :search-input.sync="search"
              :delimiters="[' ', '　', '\n']"
              hide-selected
              hint="最大5個。テキスト入力で新規タグを作成します。"
              label="タグ"
              multiple
              persistent-hint
              small-chips
              class="mb-3"
              color="primary"
              :rules="tagRules"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-name>テキスト入力でタグを新規作成します。</v-list-item-name>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  outlined
                  color="primary"
                  class="mr-2 my-1"
                >
                  <v-icon small left>mdi-tag-outline</v-icon>
                  {{ item }}
                  <v-icon small right @click="parent.selectItem(item)">mdi-close</v-icon>
                </v-chip>
              </template>
              <template v-slot:item="{ index, item }">
                <template v-if="item">
                  <v-chip outlined color="primary">
                    <v-icon small left>mdi-tag-outline</v-icon>
                    {{ item }}
                  </v-chip>
                </template>
                <template v-else>人気のタグ</template>
              </template>
            </v-combobox>
            <v-textarea
              v-model="description"
              :rules="[
                v =>
                  Array.from(v).length <= 500 ||
                  'イベントの説明文は500文字以内にしてください。'
              ]"
              outlined
              label="イベントの説明文"
              :counter="500"
            ></v-textarea>
            <v-img v-if="imageUrl" :src="imageUrl"/>
            <v-file-input :rules="imageRules" @change="onFilePicked" accept="image/*" label="トップ画像"></v-file-input>
            <v-row>
              <v-col cols="12" sm="4">
                <v-menu
                  ref="startDateVisible"
                  v-model="startDateVisible"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startDateFormatted"
                      label="開催日"
                      hint="YYYY/MM/DD で入力してください"
                      persistent-hint
                      @blur="startDate = parseDate(startDateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" locale="jp" no-title :min="today">
                    <v-layout justify-end>
                      <v-btn color="primary" @click="startDateVisible=false">確定</v-btn>
                    </v-layout>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" sm="4">
                <v-text-field v-model="startTime" label="開始時刻" type="time" :clearable="false"></v-text-field>
              </v-col>
              <v-col cols="6" sm="4">
                <v-text-field v-model="endTime" label="終了時刻" type="time" :clearable="false"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4 mx-auto">
          <v-btn large :to="`/event/${eventId}`">キャンセル</v-btn>
          <v-spacer/>
          <v-btn large color="error" @click="deleteThisEvent">イベント削除</v-btn>
          <v-btn x-large color="accent" @click="submit">
            <v-icon left>mdi-check</v-icon>編集
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog v-model="isLoading" persistent max-width="290">
        <v-card>
          <v-card-title class="justify-center">処理中...</v-card-title>
          <v-card-text>
            <p class="text-center">
              <v-progress-circular
                class="mx-auto"
                :size="70"
                :width="7"
                color="accent"
                indeterminate
              ></v-progress-circular>
            </p>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-content>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {},
  data: vm => ({
    name: '',
    description: '',
    tagListItem: ['版権', 'オリジナル'],
    tagList: [],
    isLoading: false,
    search: null,
    imageUrl: '',
    imageFile: '',
    nameRules: [
      v => !!v || 'イベント名は必須です。',
      v =>
        (v && Array.from(v).length <= 30) ||
        'イベント名は30文字以内にしてください。'
    ],
    tagRules: [
      v => {
        for (const tag of v) {
          if (tag.match(/[\.\~\*\/\[\]]/g)) {
            return '「.~*/[]」を含むことはできません。'
          }
          if (20 < Array.from(tag).length) {
            return 'タグは20文字以内にしてください。'
          }
        }
        return true
      }
    ],
    imageRules: [
      value =>
        (value && value.size < 2000000) ||
        !value ||
        '画像サイズは2MBいかにしてください。'
    ],
    today: '2020-01-01',
    startDate: '2020-01-01',
    startDateFormatted: '2020/01/01',
    startDateVisible: false,
    startTime: '10:00:00',
    endTime: '16:00:00'
  }),
  computed: {
    ...mapState('account', ['userId']),
    eventId() {
      return this.$route.params.eventId
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
    ...mapActions('event', ['getEvent', 'updateEvent', 'deleteEvent']),
    async init() {
      this.onLogout(() => {
        this.$router.push('/')
      })
      const today = new Date()
      this.startDate =
        today.getFullYear() +
        '-' +
        ('00' + (today.getMonth() + 1)).slice(-2) +
        '-' +
        ('00' + today.getDate()).slice(-2)
      this.today = this.startDate
      this.startDateFormatted = this.formatDate(this.startDate)
      const event = await this.getEvent(this.eventId)
      this.name = event.data.name
      this.description = event.data.name
      this.tagList = event.data.tagList
      this.imageUrl = event.data.imageUrl
      this.startDate =
        event.data.startDate.getFullYear() +
        '-' +
        ('00' + (event.data.startDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('00' + event.data.startDate.getDate()).slice(-2)
      this.startDateFormatted = this.formatDate(this.startDate)

      this.startTime =
        ('00' + event.data.startDate.getHours()).slice(-2) +
        ':' +
        ('00' + event.data.startDate.getMinutes()).slice(-2) +
        ':00'
      this.endTime =
        ('00' + event.data.endDate.getHours()).slice(-2) +
        ':' +
        ('00' + event.data.endDate.getMinutes()).slice(-2) +
        ':00'
    },
    onFilePicked(e) {
      this.imageUrl = ''
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
        this.startDate = ''
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
    tagToken() {
      const tagToken = {}
      for (const tag of this.tagList) {
        tagToken[tag] = true
      }
      return tagToken
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        const eventData = {
          eventId: this.eventId,
          concluded: {
            name: this.name,
            description: this.description,
            tagToken: this.tagToken(),
            tagList: this.tagList,
            startDate: new Date(this.startDate + ' ' + this.startTime),
            endDate: new Date(this.startDate + ' ' + this.endTime)
          }
        }
        if (this.imageFile) {
          eventData.imageFile = this.imageFile
        }
        const event = await this.updateEvent(eventData)
        this.isLoading = false
        this.$router.push('/event/' + event.id)
      }
    },
    async deleteThisEvent() {
      if (window.confirm('削除しますか？')) {
        this.isLoading = true
        const event = await this.deleteEvent(this.eventId)
        this.isLoading = false
        this.$router.push('/')
      }
    }
  }
}
</script>
