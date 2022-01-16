<template>
  <div id="app">
    <div>
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
    </p-application>
  </div>
</template>

<script>

import {
  PApplication,
  PSprite,
  PParticleContainer
} from '@/'

export default {
  components: {
    PApplication,
    PSprite,
    PParticleContainer
  },
  data () {
    return {
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
      resolution: 1
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
