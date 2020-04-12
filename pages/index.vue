<template>
  <div>
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
            <v-img :src="booth.image" style="height:100%"/>
          </v-layout>
        </v-layout>
      </v-carousel-item>
    </v-carousel>
    <v-container style="margin-bottom:112px">
      <v-content>
        <v-row class="mx-0 my-4 align-center">
          <div class="display-1">{{ boothList[model].name }}</div>
          <div class="ml-auto">
            <v-btn class="mx-1" fab dark small color="#55acee">
              <v-icon dark>mdi-twitter</v-icon>
            </v-btn>
            <v-btn fab dark small>
              <v-icon dark>mdi-gift</v-icon>
            </v-btn>
          </div>
        </v-row>

        <v-tabs v-model="tab" grow>
          <v-tab class="title">頒布物</v-tab>
          <v-tab class="title">チャット</v-tab>
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
                        >{{link.text}}</v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
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
                        >{{link.text}}</v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
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
                    color:'#fff',
                    }"
                  >{{ booth.name }}</v-row>
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
          image: 'https://maroasobi.com/wp-content/uploads/hyoen1.jpg',
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
          name: 'サークル名2',
          image: require('~/assets/images/background.jpg'),
          itemList: []
        },
        {
          name: 'サークル名3',
          image: require('~/assets/images/background.jpg'),
          itemList: []
        },
        {
          name: 'サークル名4',
          image: require('~/assets/images/background.jpg'),
          itemList: []
        }
      ],
      model: 0,
      tab: 0
    }
  }
}
</script>
