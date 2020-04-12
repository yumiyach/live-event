<template>
  <div>
    <v-container>
      <v-content>
        <v-card
          :color="this.$vuetify.theme.themes.light.back"
          flat
          class="my-3 mx-auto"
          max-width="876"
        >
          <v-card-title
            class="logo justify-center pb-6 primary--text"
            style="line-height: 1;"
            :style="{fontSize:$vuetify.breakpoint.smAndDown?'32px':'60px'}"
          >ライブイベント</v-card-title>
          <v-card-text
            class="text-center pb-6"
          >このイベントの説明を入れますよ。このイベントの説明を入れますよ。このイベントの説明を入れますよ。このイベントの説明を入れますよ。このイベントの説明を入れますよ。このイベントの説明を入れますよ。このイベントの説明を入れますよ。このイベントの説明を入れますよ。このイベントの説明を入れますよ。このイベントの説明を入れますよ。このイベントの説明を入れますよ。</v-card-text>
          <v-card-actions class="pb-6">
            <v-spacer/>
            <v-btn x-large color="primary">
              <v-icon left>mdi-twitter</v-icon>ツイートする
            </v-btn>
            <v-spacer/>
          </v-card-actions>
        </v-card>
        <v-row>
          <v-col v-for="(item, i) in boothList" :key="i" cols="12" sm="6" lg="4">
            <v-card @click="jumpTo(i)">
              <v-img style="height:100%" :src="item.image" aspect-ratio="2"/>
              <v-card-title v-text="item.name"></v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-content>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ]
    }
  },
  methods: {
    jumpTo(num) {
      this.$router.push('/booth#' + num)
    }
  }
}
</script>
