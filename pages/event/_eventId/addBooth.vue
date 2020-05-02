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
          <v-icon large left color="accent">mdi-account</v-icon>
          『{{
          eventData.name
          }}』にサークル参加する
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation @submit.prevent>
            <v-img v-if="headerImageUrl" :src="headerImageUrl" aspect-ratio="2"></v-img>
            <v-file-input @change="onHeaderImagePicked" accept="image/*" label="ヘッダー画像"></v-file-input>
            <v-text-field
              v-model="name"
              :counter="30"
              class="mb-3"
              dense
              label="欲しいものリストURL"
              outlined
            ></v-text-field>
            <h2>頒布作品一覧</h2>
            <v-row>
              <v-col v-for="(item, i) in itemList" :key="i" cols="12" xl="6">
                <v-card>
                  <v-row class="ma-0">
                    <v-col class="pa-0">
                      <v-img
                        :src="item.imageUrl? item.imageUrl : require('~/assets/images/no_image.png')"
                        aspect-ratio="0.707"
                        @click="onItemImageClicked('itemImage_'+i)"
                      ></v-img>
                      <input
                        :index="i"
                        :ref="'itemImage_'+i"
                        :id="'itemImage_'+i"
                        :name="'itemImage_'+i"
                        type="file"
                        accept="image/*"
                        @change="onItemImagePicked"
                        style="display:none"
                      >
                    </v-col>
                    <v-col class="pa-0" style="display: flex;flex-direction: column;">
                      <v-card-title>
                        <v-text-field
                          v-model="itemList[i].name"
                          :counter="50"
                          class="mb-3"
                          label="【必須】タイトル"
                        ></v-text-field>
                      </v-card-title>
                      <v-card-subtitle>
                        <v-textarea
                          v-model="itemList[i].description"
                          class="body-2"
                          label="説明文"
                          :counter="500"
                        ></v-textarea>
                      </v-card-subtitle>
                      <v-card-text class="mt-auto">
                        <v-row wrap>
                          <v-btn
                            v-for="(link, k) in item.linkList"
                            :key="k"
                            small
                            outlined
                            class="ma-1"
                            @click="openEditLinkDialog(i,k)"
                          >{{ link.text }}</v-btn>
                          <v-btn
                            class="ma-1"
                            small
                            color="primary"
                            @click="openEditLinkDialog(i)"
                          >リンク追加</v-btn>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="error" @click="deleteItem(i)">削除</v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" xl="6">
                <v-card>
                  <v-card-title>作品を追加する</v-card-title>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-title>
                    <div class="subtitle-1">すでに作品・通販ページがある場合</div>
                  </v-card-title>
                  <v-card-text>
                    <v-text-field dense v-model="addItemUrl" label="URL" outlined></v-text-field>
                    <v-btn
                      color="primary"
                      @click="addItemByUrl"
                      :disabled="addItemUrl==null"
                    >URLから追加</v-btn>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-title>
                    <div class="subtitle-1">まだ作品ページがない場合</div>
                  </v-card-title>
                  <v-card-text>
                    <v-btn color="secondary" @click="addItem">作品データを作成</v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4 mx-auto" style="max-width:600px">
          <v-btn x-large style="width:100%" color="accent" @click="submit" :loading="isLoading">
            <v-icon left>mdi-check</v-icon>出展する
          </v-btn>
        </v-card-actions>

        <v-dialog v-model="editLinkVisible" width="500" color="white">
          <v-card>
            <v-card-title primary-title style="position:sticky;top:0;z-index:1;">リンクを追加する</v-card-title>
            <v-card-text>
              <v-text-field dense v-model="editLinkUrl" label="URL" outlined></v-text-field>
              <v-text-field dense v-model="editLinkText" label="テキスト" outlined></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="editLinkVisible = false">キャンセル</v-btn>
              <v-spacer/>
              <v-btn color="error" @click="deleteLink">削除</v-btn>
              <v-btn color="primary" @click="updateLink">追加</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  components: {},
  head() {
    return {
      name: 'マイページ'
    }
  },
  data: () => ({
    isLoading: false,
    addItemUrl: null,
    editLinkVisible: false,
    editLinkItemIndex: -1,
    editLinkIndex: -1,
    editLinkUrl: null,
    editLinkText: null,
    headerImageUrl: null,
    headerImageFile: false,
    wishListUrl: null,
    itemList: []
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
    ...mapActions('event', ['getEvent']),
    ...mapActions('booth', ['createBooth']),
    init() {
      this.onLogout(() => {
        this.$router.push('/')
      })

      this.getEvent(this.eventId)
    },
    onHeaderImagePicked(e) {
      const file = e
      if (file !== undefined) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.headerImageUrl = fr.result
          this.headerImageFile = file
        })
      } else {
        this.headerImageUrl = null
        this.headerImageFile = false
      }
    },
    async addItemByUrl() {
      this.isLoading = true
      try {
        const res = await axios.get(
          'http://localhost:5000/mekepon-sort-d78fa/us-central1/getItemData',
          {
            params: {
              url: this.addItemUrl
            }
          }
        )
        const data = res.data
        this.itemList.push({
          name: data.title,
          description: data.description,
          imageUrl: data.imageUrl,
          imageFile: false,
          linkList: [
            {
              url: this.addItemUrl,
              text: data.siteName ? data.siteName : '作品ページ'
            }
          ]
        })
      } catch (e) {
        alert('データ取得に失敗しました')
      }
      this.isLoading = false
      this.addItemUrl = null
    },
    addItem() {
      this.itemList.push({
        name: '',
        description: '',
        imageUrl: null,
        imageFile: false,
        linkList: []
      })
    },
    deleteItem(itemIndex) {
      this.itemList.splice(itemIndex, 1)
    },
    onItemImageClicked(ref) {
      this.$refs[ref][0].click()
    },
    onItemImagePicked(e) {
      const index = parseInt(e.target.attributes[0].value)
      const file = e.target.files[0]
      if (file !== undefined) {
        const fr = new FileReader()
        fr.addEventListener('load', () => {
          this.itemList[index].imageUrl = fr.result
          this.itemList[index].imageFile = file
        })
        fr.readAsDataURL(file)
      } else {
        this.itemList[index].imageUrl = null
        this.itemList[index].imageFile = false
      }
    },
    openEditLinkDialog(itemIndex, linkIndex) {
      this.editLinkUrl = null
      this.editLinkText = null
      if (itemIndex !== undefined && linkIndex == undefined) {
        this.editLinkItemIndex = itemIndex
        this.editLinkIndex = -1
        this.editLinkVisible = true
      } else if (itemIndex !== undefined && linkIndex !== undefined) {
        this.editLinkItemIndex = itemIndex
        this.editLinkIndex = linkIndex
        this.editLinkUrl = this.itemList[itemIndex].linkList[linkIndex].url
        this.editLinkText = this.itemList[itemIndex].linkList[linkIndex].text
        this.editLinkVisible = true
      } else {
        this.editLinkItemIndex = -1
        this.editLinkIndex = -1
      }
    },
    updateLink() {
      if (this.editLinkIndex == -1) {
        this.itemList[this.editLinkItemIndex].linkList.push({
          url: this.editLinkUrl,
          text: this.editLinkText
        })
      } else {
        this.itemList[this.editLinkItemIndex].linkList[this.editLinkIndex] = {
          url: this.editLinkUrl,
          text: this.editLinkText
        }
      }
      this.editLinkItemIndex = -1
      this.editLinkIndex = -1
      this.editLinkVisible = false
    },
    deleteLink() {
      if (this.editLinkIndex !== -1) {
        this.itemList[this.editLinkItemIndex].linkList.splice(
          this.editLinkIndex,
          1
        )
      }
      this.editLinkItemIndex = -1
      this.editLinkIndex = -1
      this.editLinkVisible = false
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        const boothData = {
          concluded: {
            headerImageUrl: this.headerImageFile ? null : this.headerImageUrl,
            wishListUrl: this.wishListUrl,
            eventId: this.eventId
          },
          headerImageFile: this.headerImageFile,
          itemList: this.itemList
        }
        const booth = await this.createBooth(boothData)
        this.isLoading = false
      }
    }
  }
}
</script>
