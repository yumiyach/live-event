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
        <v-layout
          wrap
          style="height:calc(100vh - 120px); overflow-y:scroll; overflow-x:hidden"
          v-on:scroll.passive="onScroll"
        >
          <v-layout
            justify-center
            align-center
            wrap
            :style="{
              height: 'calc(100vh - 120px - 100px - ' + offsetTop + 'px)'
            }"
          >
            <v-img :src="booth.image" style="height:100%" />
          </v-layout>
          <v-row>
            <v-container style="min-height:320px" class="overflow-y-auto">
              <v-content>
                <p class="display-3">{{ booth.name }}</p>
              </v-content>
            </v-container>
          </v-row>
        </v-layout>
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
                backgroundImage: 'url(' + booth.image + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
            >
              <v-row
                class="fill-height caption"
                align="center"
                justify="center"
                :style="{
                  backgroundColor: '#000',
                  opacity: active ? 0 : 0.6
                }"
              >
                {{ booth.name }}
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
      model: null,
      offsetTop: 0
    }
  },
  watch: {
    model() {
      this.offsetTop = 0
    }
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop < 100 ? e.target.scrollTop : 100
    }
  }
}
</script>
