<template>
  <div id="app">
    <div>
      <button @click="changeWidth">Change Width</button>
      <button @click="changeHeight">Change Height</button>
      <button @click="changeBackgroundColor">Change Background Color</button>
      <button @click="changeResolution">Change Resolution</button>
      <button @click="changeText">changeText</button>
    </div>
    <p-application
      :width="width"
      :height="height"
      :backgroundColor="backgroundColor"
      :resolution="resolution"
    >
      <p-container>
        <p-bitmap-text
          v-if="shouldRenderBitmap"
          :text="text"
          :textStyle="textStyle"
        />
      </p-container>
    </p-application>
  </div>
</template>

<script>
import { Loader } from 'pixi.js'

import {
  PApplication,
  PContainer,
  PBitmapText
} from '@/'

export default {
  components: {
    PApplication,
    PContainer,
    PBitmapText

  },
  data () {
    return {
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
      resolution: 1,
      shouldRenderBitmap: false,
      text: 'Hello World',
      textStyle: {
        fontName: 'Desyrel',
        fontSize: 300
      }
    }
  },
  created () {
    // make sure to load font first before render the Bitmap Text
    const loader = new Loader()
    loader
      .add(
        'desyrel',
        'https://pixijs.io/examples/examples/assets/bitmap-font/desyrel.xml'
      )
      .load(this.onAssetsLoaded)

    setTimeout(() => {
      this.textStyle.fontSize = 100
    }, 1000)
  },
  methods: {
    changeWidth () {
      this.width = 400
    },
    changeHeight () {
      this.height = 300
    },
    changeBackgroundColor () {
      this.backgroundColor = 0x1099bb
    },
    changeResolution () {
      this.resolution = 2
    },
    onAssetsLoaded () {
      this.shouldRenderBitmap = true
    },
    changeText () {
      this.text = Date.now().toString()
    }
  }
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
