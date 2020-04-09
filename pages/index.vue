<template>
  <div>
    <v-carousel
      v-model="model"
      height="calc(100vh - 120px)"
      hide-delimiter-background
      hide-delimiters
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(booth, i) in boothList" :key="i">
        <v-sheet
          height="100%"
          :style="{
            background: 'url(' + booth.image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
        >
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ booth.name }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-content>
      <v-layout justify-center>
        <v-slide-group v-model="model" class="pa-4" mandatory center-active>
          <v-slide-item
            v-for="(booth, i) in boothList"
            :key="i"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              class="mx-4"
              height="80"
              width="80"
              @click="toggle"
              :style="{
                backgroundColor: '#000',
                backgroundImage: 'url(' + booth.image + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: active ? 1 : 0.5
              }"
            >
              <v-row class="fill-height" align="center" justify="center">
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-layout>
    </v-content>
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
      model: null
    }
  }
}
</script>
