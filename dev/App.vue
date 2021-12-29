<template>
  <div id="app">
    <p-application :enableTicker="true" @ticker="ticker">
      <p-simple-plane
        :src="'https://pixijs.io/examples/examples/assets/bg_grass.jpg'"
        :verticesX="10"
        :verticesY="10"
        @ready="planeReady"
      >
      </p-simple-plane>
    </p-application>
  </div>
</template>

<script>
import { PApplication, PSimplePlane } from '@/'

export default {
  components: {
    PApplication,
    PSimplePlane
  },
  data () {
    return {
      plane: {},
      buffer: {}
    }
  },
  methods: {
    planeReady (instance) {
      this.plane = instance
      this.buffer = instance.geometry.getBuffer('aVertexPosition')
    },
    ticker () {
      for (let i = 0; i < this.buffer.data.length; i++) {
        this.buffer.data[i] += Math.random() - 0.5
      }
      this.buffer.update()
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
