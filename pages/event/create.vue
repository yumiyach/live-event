<template>
  <v-container>
    <v-content>
      <v-card
        :color="this.$vuetify.theme.themes.light.back"
        flat
        class="my-3 mx-auto"
        max-width="876"
      >
        <v-card-title class="display-1 accent--text">イベント作成</v-card-title>
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
                    <v-list-item-title>テキスト入力でタグを新規作成します。</v-list-item-title>
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
            <v-img v-if="headerImageUrl" :src="headerImageUrl" aspect-ratio="2"/>
            <v-file-input
              :rules="imageRules"
              @change="onFilePicked"
              accept="image/*"
              label="ヘッダー画像"
            ></v-file-input>
            <v-row>
              <v-col cols="6" sm="4">
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
                      <v-btn color="primary" @click="startDateVisible = false">確定</v-btn>
                    </v-layout>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" sm="2">
                <v-text-field v-model="startTime" label="開始時刻" type="time" :clearable="false"></v-text-field>
              </v-col>
              <v-col cols="6" sm="4">
                <v-menu
                  ref="endDateVisible"
                  v-model="endDateVisible"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="endDateFormatted"
                      label="終了日"
                      hint="YYYY/MM/DD で入力してください"
                      persistent-hint
                      @blur="endDate = parseDate(endDateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="endDate" locale="jp" no-title :min="today">
                    <v-layout justify-end>
                      <v-btn color="primary" @click="endDateVisible = false">確定</v-btn>
                    </v-layout>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" sm="2">
                <v-text-field v-model="endTime" label="終了時刻" type="time" :clearable="false"></v-text-field>
              </v-col>
            </v-row>
            <v-switch v-model="isPrivate" label="イベント一覧に表示させない"></v-switch>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4 mx-auto" style="max-width:600px">
          <v-btn x-large style="width:100%" color="accent" @click="submit" :loading="loading">
            <v-icon left>mdi-check</v-icon>投稿する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {},
  data: () => ({
    name: '',
    description: '',
    tagListItem: ['版権', 'オリジナル'],
    tagList: [],
    loading: false,
    search: null,
    headerImageUrl: '',
    headerImageFile: false,
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
      value => typeof value === 'object' || 'ヘッダー画像は必須です。',
      value =>
        (value && value.size < 2000000) || '画像サイズは2MBいかにしてください。'
    ],
    today: '2020-01-01',
    startDate: '2020-01-01',
    startDateFormatted: '2020/01/01',
    startDateVisible: false,
    endDate: '2020-01-01',
    endDateFormatted: '2020/01/01',
    endDateVisible: false,
    startTime: '10:00:00',
    endTime: '16:00:00',
    isPrivate: false
  }),
  computed: {
    ...mapState('account', ['userId'])
  },
  watch: {
    startDate(val) {
      this.startDateFormatted = this.formatDate(this.startDate)
    },
    endDate(val) {
      this.endDateFormatted = this.formatDate(this.endDate)
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('account', ['onLogout']),
    ...mapActions('event', ['createEvent']),
    init() {
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
      this.endDate =
        today.getFullYear() +
        '-' +
        ('00' + (today.getMonth() + 1)).slice(-2) +
        '-' +
        ('00' + today.getDate()).slice(-2)
      this.today = this.startDate
      this.startDateFormatted = this.formatDate(this.startDate)
      this.endDateFormatted = this.formatDate(this.endDate)
    },
    onFilePicked(e) {
      const file = e
      if (file !== undefined) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.headerImageUrl = fr.result
          this.headerImageFile = file
        })
      } else {
        this.headerImageFile = ''
        this.headerImageUrl = ''
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
        this.loading = true
        const eventData = {
          concluded: {
            name: this.name,
            description: this.description,
            tagList: this.tagList,
            isPrivate: this.isPrivate,
            startDate: new Date(this.startDate + ' ' + this.startTime),
            endDate: new Date(this.endDate + ' ' + this.endTime)
          },
          headerImageFile: this.headerImageFile
        }
        const event = await this.createEvent(eventData)
        this.$router.push('/event/' + event.id)
      }
    }
  }
}
</script>
