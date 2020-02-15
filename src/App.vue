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
          :text="'Hello World'"
          :textStyle="style"
        />
      </p-container>
    </p-application>
  </div>
</template>

<script>
import PApplication from '@/components/PApplication'
import PContainer from '@/components/PContainer'
import PSprite from '@/components/PSprite'
import PText from '@/components/PText'

export default {
  components: {
    PApplication,
    PContainer,
    PSprite,
    PText
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
      }
    }
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
