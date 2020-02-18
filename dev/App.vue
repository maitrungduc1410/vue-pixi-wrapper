<template>
  <div id="app">
    <p-application
      :backgroundColor="0x1099bb"
      @ready="onAppReady">
      <p-graphics
        :draw="drawTop"
        :reactiveData="[screen.width, this.margin]"
        @ready="onBottomReady"
      >
        <!-- <p-text
          :text="'PIXI MONSTER SLOTS!'"
          :textStyle="textStyle"
          @ready="onTextReady"
        /> -->
      </p-graphics>
      <!-- <p-graphics
        :draw="drawBottom"
        :reactiveData="[screen.width, this.margin]"
        @ready="onBottomReady"
      >
        <p-text
          :text="'Spin the wheels!'"
          :textStyle="textStyle"
          @ready="onTextReady"
        />
      </p-graphics> -->
    </p-application>
  </div>
</template>

<script>
import { PApplication, PSprite, PContainer, PText, PGraphics } from '@/'
import { Loader, Texture } from 'pixi.js'

const REEL_WIDTH = 160
const SYMBOL_SIZE = 150

export default {
  components: {
    PApplication,
    // eslint-disable-next-line vue/no-unused-components
    PSprite,
    PGraphics,
    // eslint-disable-next-line vue/no-unused-components
    PText
  },
  data () {
    return {
      textStyle: {
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
      },
      screen: {
        width: 0,
        height: 0
      },
      margin: 0,
      playText: null,
      bottom: null
    }
  },
  methods: {
    onAssetsLoaded () {
      const slotTextures = [
        Texture.from('https://pixijs.io/examples/examples/assets/eggHead.png'),
        Texture.from('https://pixijs.io/examples/examples/assets/flowerTop.png'),
        Texture.from('https://pixijs.io/examples/examples/assets/helmlok.png'),
        Texture.from('https://pixijs.io/examples/examples/assets/skully.png')
      ]
    },
    onAppReady (app) {
      app.loader
        .add('https://pixijs.io/examples/examples/assets/eggHead.png', 'https://pixijs.io/examples/examples/assets/eggHead.png')
        .add('https://pixijs.io/examples/examples/assets/flowerTop.png', 'https://pixijs.io/examples/examples/assets/flowerTop.png')
        .add('https://pixijs.io/examples/examples/assets/helmlok.png', 'https://pixijs.io/examples/examples/assets/helmlok.png')
        .add('https://pixijs.io/examples/examples/assets/skully.png', 'https://pixijs.io/examples/examples/assets/skully.png')
        .load(this.onAssetsLoaded)

      this.screen.width = app.screen.width
      this.screen.height = app.screen.height
      this.margin = (app.screen.height - SYMBOL_SIZE * 3) / 2
    },
    // ticker (delta) {

    // },
    drawTop (top) {
      top.beginFill(0, 1)
      top.drawRect(0, 0, this.screen.width, this.margin)
    },
    drawBottom (top) {
      top.beginFill(0, 1)
      top.drawRect(0, SYMBOL_SIZE * 3 + this.margin, this.screen.width, this.margin)
    },
    onBottomReady (bottom) {
      this.bottom = bottom
    },
    onTextReady (text) {
      console.log(text.width)
      console.log(this.bottom.width)
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
