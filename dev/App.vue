<template>
  <div id="app">
    <p-application
      :backgroundColor="0x1099bb"
      :width="800"
      :height="600"
    >
      <p-container
        :x="400"
        :y="300"
        :interactive="true"
        :pivotX="186 / 2"
        :pivotY="197 / 2"
        :events="['click']"
        @ticker="ticker"
        :rotation="rotation"
        @onclick="onClickContainer"
        @ready="ready"
      >
        <p-sprite
          v-for="n in 25"
          :key="n"
          :src="'/bunny.png'"
          :x="((n - 1) % 5) * 40"
          :y="Math.floor((n - 1) / 5) * 40"
          :anchorX="0.5"
          :anchorY="0.5"
        />
      </p-container>
    </p-application>
  </div>
</template>

<script>
import PApplication from '@/components/PApplication'
import PContainer from '@/components/PContainer'
import PSprite from '@/components/PSprite'
import { Loader } from 'pixi.js'

export default {
  components: {
    PApplication,
    PContainer,
    PSprite
  },
  data () {
    return {
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
      resolution: 1,
      sprites: [
        {
          src: '/bunny.png',
          x: Math.floor(Math.random() * 800) + 1,
          y: Math.floor(Math.random() * 600) + 1
        }
      ],
      text: 'Hello World',
      style: {
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
      shouldRenderBitmap: false,
      pivot: {
        x: 100,
        y: 200
      },
      scale: {
        x: 2,
        y: 1
      },
      rotation: 0,
      container: null
    }
  },
  created () {
    const loader = new Loader()
    loader.add('desyrel', 'https://pixijs.io/examples/examples/assets/bitmap-font/desyrel.xml')
      .load(this.onAssetsLoaded)
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
    addSprite () {
      this.sprites.push({
        src: '/bunny.png',
        x: Math.floor(Math.random() * 800) + 1,
        y: Math.floor(Math.random() * 600) + 1
      })
    },
    removeSprite () {
      const index = Math.floor(Math.random() * this.sprites.length - 1) + 1
      this.sprites.splice(index, 1)
    },
    changeSprite () {
      this.sprites[0].src = '/bunny.png'
    },
    draw (g) {
      g.clear()
      // start drawing
      g.beginFill(0xff3300)
      g.lineStyle(4, 0xffd900, 1)

      g.moveTo(50, 50)
      g.lineTo(250, 50)
      g.lineTo(100, 100)
      g.lineTo(50, 50)
      g.endFill()

      g.lineStyle(2, 0x0000ff, 1)
      g.beginFill(0xff700b, 1)
      g.drawRect(50, 150, 120, 120)

      g.lineStyle(2, 0xff00ff, 1)
      g.beginFill(0xff00bb, 0.25)
      g.drawRoundedRect(150, 100, 300, 100, 15)
      g.endFill()

      g.lineStyle(0)
      g.beginFill(0xffff0b, 0.5)
      g.drawCircle(470, 90, 60)
      g.endFill()
    },
    onAssetsLoaded () {
      this.shouldRenderBitmap = true
    },
    changeText () {
      this.text = Date.now().toString()
    },
    ticker (delta) {
      // console.log(delta)
      this.rotation -= 0.01 * delta
    },
    onClickContainer () {
      console.log('CLICK')
    },
    ready (container) {
      console.log(container.width)

      this.container = container
    }
  },
  computed: {
    containerWidth () {
      return this.container ? this.container.width : 0
    },
    containerHeight () {
      return this.container ? this.container.height : 0
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
