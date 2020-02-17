<template>
  <div id="app">
    <div>
      <button @click="changeWidth">Change Width</button>
      <button @click="changeHeight">Change Height</button>
      <button @click="changeBackgroundColor">Change Background Color</button>
      <button @click="changeResolution">Change Resolution</button>
      <button @click="addSprite">addSprite</button>
      <button @click="removeSprite">removeSprite</button>
      <button @click="changeSprite">changeSprite</button>
      <button @click="changeText">changeText</button>
    </div>
    <p-application
      :width="width"
      :height="height"
      :backgroundColor="backgroundColor"
      :resolution="resolution"
    >
      <p-container>
        <p-sprite
          v-for="s in sprites"
          :key="`${s.x}-${s.y}`"
          :src="s.src"
          :x="s.x"
          :y="s.y"
        />
        <p-text
          :text="text"
          :textStyle="style"
        />
        <p-graphics
          :draw="draw"
        />
        <p-animated-sprite
          :images="['https://pixijs.io/examples/examples/assets/flowerTop.png', 'https://pixijs.io/examples/examples/assets/eggHead.png']"
          :animationSpeed="0.05"
        />
        <p-bitmap-text
          v-if="shouldRenderBitmap"
          :text="text"
          :textStyle="{ font: '50px Desyrel' }"
        />
      </p-container>
      <p-particle-container
        :position="true"
      >
        <p-sprite
          anchor={0.5}
          :x="200"
          :y="200"
          :src="'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png'"
        />
        <p-sprite
          anchor={0.5}
          :x="250"
          :y="250"
          :src="'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png'"
        />
        <p-sprite
          anchor={0.5}
          :x="300"
          :y="300"
          :src="'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png'"
        />
      </p-particle-container>
      <p-tiling-sprite
        :image="'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/p2.jpeg'"
        :width="200"
        :height="200"
        :x="400"
        :y="400"
      />
    </p-application>
  </div>
</template>

<script>
import PApplication from '@/components/PApplication'
import PContainer from '@/components/PContainer'
import PSprite from '@/components/PSprite'
import PText from '@/components/PText'
import PGraphics from '@/components/PGraphics'
import PAnimatedSprite from '@/components/PAnimatedSprite'
import PBitmapText from '@/components/PBitmapText'
import { Loader } from 'pixi.js'
import PParticleContainer from '@/components/PParticleContainer'
import PTilingSprite from '@/components/PTilingSprite'

export default {
  components: {
    PApplication,
    PContainer,
    PSprite,
    PText,
    PGraphics,
    PAnimatedSprite,
    PBitmapText,
    PParticleContainer,
    PTilingSprite
  },
  data () {
    return {
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
      resolution: 1,
      sprites: [
        {
          src: '/favicon.ico',
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
      shouldRenderBitmap: false
    }
  },
  created () {
    const loader = new Loader()
    loader.add('desyrel', 'https://pixijs.io/examples/examples/assets/bitmap-font/desyrel.xml')
      .load(this.onAssetsLoaded)
  },
  methods: {
    scaleObject (container) {
      container.scale.x *= 1.25
      container.scale.y *= 1.25
      console.log(123)
    },

    tickInfo (container, delta) {
      console.log(`Tick delta: ${delta}`)
    },
    ready () {
      console.log('READY')
    },
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
        src: '/favicon.ico',
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
