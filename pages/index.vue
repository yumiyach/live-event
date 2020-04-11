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
    <v-container>
      <v-content>
        <p class="display-3">{{ boothList[model].name }}</p>
      </v-content>
    </v-container>
    <v-footer fixed>
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
                    opacity: active ? 0 : 0.6
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
          name: 'サークル名1',
          image: require('~/assets/images/background.jpg')
        },
        {
          name: 'サークル名2',
          image: require('~/assets/images/background.jpg')
        },
        {
          name: 'サークル名3',
          image: require('~/assets/images/background.jpg')
        },
        {
          name: 'サークル名4',
          image: require('~/assets/images/background.jpg')
        }
      ],
      model: 0
    }
  }
}
</script>
