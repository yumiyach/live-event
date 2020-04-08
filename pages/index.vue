<template>
  <v-carousel
    cycle
    height="calc(100vh - 100px)"
    hide-delimiter-background
    hide-delimiters
    show-arrows-on-hover
  >
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet
        height="100%"
        :style="{
          background: 'url(' + require('~/assets/images/background.jpg') + ')',
          backgroundSize: 'cover',
          backgroundPosition:'center'
        }"
      >
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">{{ slide }} Slide</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
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
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth']
    }
  }
}
</script>
