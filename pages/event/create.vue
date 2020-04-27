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
          <v-icon large left color="accent">mdi-account</v-icon>イベント作成
        </v-card-title>
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
                    <v-list-item-name
                      >テキスト入力でタグを新規作成します。</v-list-item-name
                    >
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
                  <v-icon small right @click="parent.selectItem(item)"
                    >mdi-close</v-icon
                  >
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
            <v-img :src="imageUrl" />
            <v-file-input
              :rules="imageRules"
              @change="onFilePicked"
              accept="image/*"
              label="トップ画像"
            ></v-file-input>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4 mx-auto" style="max-width:600px">
          <v-btn
            x-large
            style="width:100%"
            color="accent"
            @click="submit"
            :loading="loading"
          >
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
  head() {
    return {
      name: 'マイページ'
    }
  },
  data: () => ({
    name: '',
    description: '',
    tagListItem: ['版権', 'オリジナル'],
    tagList: [],
    loading: false,
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
        !value || value.size < 2000000 || '画像サイズは2MBいかにしてください。'
    ]
  }),
  computed: {
    ...mapState('account', ['userId'])
  },
  created() {
    this.onLogout(() => {
      this.$router.push('/')
    })
  },
  methods: {
    ...mapActions('account', ['onLogout']),
    ...mapActions('event', ['createEvent']),
    onFilePicked(e) {
      console.log(e)
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
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const eventData = {
          concluded: {
            name: this.name,
            description: this.description,
            tagList: this.tagList
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
