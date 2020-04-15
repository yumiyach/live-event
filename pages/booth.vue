<template>
  <div>
    <v-app-bar dense color="#fff">
      <v-spacer></v-spacer>
      <v-toolbar-title
        class="font-weight-black"
        :style="{ color: $vuetify.theme.currentTheme.primary }"
        >オンラインイベント</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn text small color="primary" to="/">TOP</v-btn>
    </v-app-bar>
    <v-carousel
      v-model="model"
      height="calc(100vh - 220px)"
      hide-delimiter-background
      hide-delimiters
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(booth, i) in boothList" :key="i">
        <v-layout wrap>
          <v-layout
            justify-center
            align-center
            wrap
            :style="{
              height: 'calc(100vh - 220px)'
            }"
          >
            <v-img :src="booth.image" style="height:100%" />
          </v-layout>
        </v-layout>
      </v-carousel-item>
    </v-carousel>
    <v-container style="margin-bottom:112px">
      <v-content>
        <v-row class="mx-0 mt-4 align-center">
          <v-layout class="display-1 mb-4" align-center >
            <v-chip class="ma-2" color="primary">
              在席中
            </v-chip>
            {{ boothList[model].name }}
          </v-layout>
          <div class="ml-auto mb-4">
            <v-btn class="mx-1" fab dark small color="#55acee">
              <v-icon dark>mdi-twitter</v-icon>
            </v-btn>
            <v-btn fab dark small color="primary">
              <v-icon dark>mdi-gift</v-icon>
            </v-btn>
          </div>
        </v-row>

        <v-tabs v-model="tab" grow>
          <v-tab class="title">頒布物</v-tab>
          <v-tab class="title">コメント</v-tab>
          <v-tab class="title">
            ライブ
            <v-avatar class="ml-2" size="20">
              <v-icon small>mdi-antenna</v-icon>
            </v-avatar>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row>
              <v-col
                v-for="(item, i) in boothList[model].itemList"
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
          </v-tab-item>

          <v-tab-item>
            <v-list three-line>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field label="名前"></v-text-field>
                  <v-textarea
                    name="input-7-1"
                    label="メッセージ"
                    rows="3"
                  ></v-textarea>
                  <v-btn depressed small color="primary">投稿</v-btn>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
              <div v-for="(item, i) in chatList[model]" :key="i">
                <v-list-item>
                  <v-list-item-content>
                    <p class="mb-2">{{ item.message }}</p>
                    <v-list-item-subtitle class="d-flex">
                      <div class="mr-2">{{ item.name }}</div>
                      <div class="shrink ml-auto">
                        {{ item.date.getFullYear() }}/{{
                          item.date.getMonth() + 1
                        }}/{{ item.date.getDate() }}
                        {{ item.date.getHours() }}:{{
                          item.date.getMinutes()
                        }}:{{ item.date.getSeconds() }}
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
              </div>
              <v-list-item>
                <v-list-item-content>
                  <p class="mb-2">メッセージは以上です</p>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-tab-item>

          <v-tab-item>
            <v-list three-line>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>配信中！</v-list-item-title>
                </v-list-item-content>

                <v-spacer></v-spacer>

                <v-list-item-icon>
                  <v-btn icon>
                    <v-icon>mdi-play</v-icon>
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field label="名前"></v-text-field>
                  <v-textarea
                    name="input-7-1"
                    label="メッセージ"
                    rows="3"
                  ></v-textarea>
                  <v-btn depressed small color="primary">投稿</v-btn>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
              <div v-for="(item, i) in chatList[model]" :key="i">
                <v-list-item>
                  <v-list-item-content>
                    <p class="mb-2">{{ item.message }}</p>
                    <v-list-item-subtitle class="d-flex">
                      <div class="mr-2">{{ item.name }}</div>
                      <div class="shrink ml-auto">
                        {{ item.date.getFullYear() }}/{{
                          item.date.getMonth() + 1
                        }}/{{ item.date.getDate() }}
                        {{ item.date.getHours() }}:{{
                          item.date.getMinutes()
                        }}:{{ item.date.getSeconds() }}
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
              </div>
              <v-list-item>
                <v-list-item-content>
                  <p class="mb-2">メッセージは以上です</p>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-content>
    </v-container>

    <v-footer fixed class="pa-0" color="#ffffff88">
      <v-content>
        <v-layout justify-center>
          <v-slide-group v-model="model" class="pa-4" mandatory center-active>
            <v-slide-item
              v-for="(booth, i) in boothList"
              :key="i"
              v-slot:default="{ active, toggle }"
            >
              <v-card class="mx-4" height="80" width="80" @click="toggle">
                <v-img :src="booth.image" aspect-ratio="1">
                  <v-row
                    class="fill-height caption"
                    align="center"
                    justify="center"
                    :style="{
                      backgroundColor: '#000',
                      opacity: active ? 0 : 0.6,
                      color: '#fff'
                    }"
                  >
                    <v-col class="text-center">{{ booth.name }}</v-col>
                  </v-row>
                </v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-layout>
      </v-content>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
      boothList: [
        {
          name: 'こぶんやさん',
          image:
            'https://intojapanwaraku.com/wp-content/uploads/2019/05/GMF0793ii0.png',
          itemList: [
            {
              name: 'とさにっき！',
              image:
                'https://images-na.ssl-images-amazon.com/images/I/51N8UiIo3EL._SX366_BO1,204,203,200_.jpg',
              description:
                '紀貫之女体化ドタバタギャグ。土佐旅行へ赴任した貫之が京都へ帰る途中、事件に巻き込まれます。',
              linkList: [
                { text: '通販', url: 'https://www.amazon.co.jp/dp/4043574207' },
                {
                  text: 'サンプル',
                  url:
                    'https://www.aozora.gr.jp/cards/000155/files/832_16016.html'
                }
              ]
            },
            {
              name: '源氏物語',
              image: 'https://m.media-amazon.com/images/I/61w4fOd-X3L.jpg',
              description:
                '光源氏×紫の上イチャラブNL。光源氏に過去の女がいたような描写があります注意。',
              linkList: [
                {
                  text: '青空文庫',
                  url:
                    'https://www.aozora.gr.jp/cards/000052/files/5016_9758.html'
                }
              ]
            }
          ]
        },
        {
          name: 'こぶんやさん2',
          image:
            'https://intojapanwaraku.com/wp-content/uploads/2019/05/GMF0793ii0.png',
          itemList: [
            {
              name: 'とさにっき！',
              image:
                'https://images-na.ssl-images-amazon.com/images/I/51N8UiIo3EL._SX366_BO1,204,203,200_.jpg',
              description:
                '紀貫之女体化ドタバタギャグ。土佐旅行へ赴任した貫之が京都へ帰る途中、事件に巻き込まれます。',
              linkList: [
                { text: '通販', url: 'https://www.amazon.co.jp/dp/4043574207' },
                {
                  text: 'サンプル',
                  url:
                    'https://www.aozora.gr.jp/cards/000155/files/832_16016.html'
                }
              ]
            },
            {
              name: '源氏物語',
              image: 'https://m.media-amazon.com/images/I/61w4fOd-X3L.jpg',
              description:
                '光源氏×紫の上イチャラブNL。光源氏に過去の女がいたような描写があります注意。',
              linkList: [
                {
                  text: '青空文庫',
                  url:
                    'https://www.aozora.gr.jp/cards/000052/files/5016_9758.html'
                }
              ]
            },
            {
              name: 'とさにっき！',
              image:
                'https://images-na.ssl-images-amazon.com/images/I/51N8UiIo3EL._SX366_BO1,204,203,200_.jpg',
              description:
                '紀貫之女体化ドタバタギャグ。土佐旅行へ赴任した貫之が京都へ帰る途中、事件に巻き込まれます。',
              linkList: [
                { text: '通販', url: 'https://www.amazon.co.jp/dp/4043574207' },
                {
                  text: 'サンプル',
                  url:
                    'https://www.aozora.gr.jp/cards/000155/files/832_16016.html'
                }
              ]
            },
            {
              name: '源氏物語',
              image: 'https://m.media-amazon.com/images/I/61w4fOd-X3L.jpg',
              description:
                '光源氏×紫の上イチャラブNL。光源氏に過去の女がいたような描写があります注意。',
              linkList: [
                {
                  text: '青空文庫',
                  url:
                    'https://www.aozora.gr.jp/cards/000052/files/5016_9758.html'
                }
              ]
            }
          ]
        },
        {
          name: 'こぶんやさん3',
          image:
            'https://intojapanwaraku.com/wp-content/uploads/2019/05/GMF0793ii0.png',
          itemList: []
        },
        {
          name: 'こぶんやさん4',
          image:
            'https://intojapanwaraku.com/wp-content/uploads/2019/05/GMF0793ii0.png',
          itemList: []
        },
        {
          name: 'こぶんやさん5',
          image:
            'https://intojapanwaraku.com/wp-content/uploads/2019/05/GMF0793ii0.png',
          itemList: []
        }
      ],
      chatList: [
        [
          {
            message:
              '嬉しくいみじくて、夜昼これを見るよりうち始め、またまたも見まほしきに、ありもつかぬ都のほとりに、たれかは物語求め見する人のあらむ。',
            name: '菅原孝標女',
            date: new Date()
          },
          {
            message:
              '源氏物語読みました！！！読み始めたら止まらなくて一日中ずっと読んでしまいました…… 続き超期待！！！！パンデミックが収束して京でイベント開催されたら、絶対に行きます！！！尊いお話、ありがとうございました！',
            name: 'すがたかちゃん',
            date: new Date()
          }
        ],
        [],
        [],
        [],
        []
      ],
      model: 0,
      tab: 0
    }
  },
  watch: {
    model() {
      window.scrollTo(0, 0)
    }
  },
  created() {
    if (this.$router.history.current.hash) {
      this.model = parseInt(this.$router.history.current.hash.replace('#', ''))
    }
  }
}
</script>
