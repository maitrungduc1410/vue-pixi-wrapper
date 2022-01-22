<template>
  <div id="app">
    <div>
      <button @click="addImage">Add image</button>
      <button @click="changeWidth">Change Width</button>
      <button @click="changeHeight">Change Height</button>
      <button @click="changeBackgroundColor">Change Background Color</button>
      <button @click="changeResolution">Change Resolution</button>
    </div>
    <p-application
      :width="width"
      :height="height"
      :backgroundColor="backgroundColor"
      :resolution="resolution"
    >
      <p-container>
        <p-animated-sprite
          :images="images"
          :animationSpeed="0.05"
        />
      </p-container>
    </p-application>
  </div>
</template>

<script>
import { PApplication, PContainer, PAnimatedSprite } from '@/'

export default {
  components: {
    PApplication,
    PContainer,
    PAnimatedSprite
  },
  data () {
    return {
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
      resolution: 1,
      images: ['https://pixijs.io/examples/examples/assets/flowerTop.png', 'https://pixijs.io/examples/examples/assets/eggHead.png']
    }
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
    addImage () {
      this.images.push('https://pixijs.io/examples/examples/assets/bg_rotate.jpg')
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
