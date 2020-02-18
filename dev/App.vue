<template>
  <div id="app">
    <p-application
      @ready="onAppReady"
      :enableTicker="true"
      @ticker="ticker"
    >
      <p-sprite
        v-for="(a, index) in aliens"
        :key="index"
        :src="'/eggHead.png'"
        :x="a.x"
        :y="a.y"
        :anchorX="a.anchorX"
        :anchorY="a.anchorY"
        :tint="a.tint"
      />
    </p-application>
  </div>
</template>

<script>
import PApplication from '@/components/PApplication'
import PSprite from '@/components/PSprite'
import * as PIXI from 'pixi.js'

export default {
  components: {
    PApplication,
    PSprite
  },
  data () {
    return {
      rotation: 0,
      aliens: [],
      totalDudes: 20,
      dudeBounds: {}
    }
  },
  methods: {
    ticker (delta) {
      for (let i = 0; i < this.aliens.length; i++) {
        const dude = this.aliens[i]
        dude.direction += dude.turningSpeed * 0.01
        dude.x += Math.sin(dude.direction) * dude.speed
        dude.y += Math.cos(dude.direction) * dude.speed
        dude.rotation = -dude.direction - Math.PI / 2

        // wrap the dudes by testing their bounds...
        if (dude.x < this.dudeBounds.x) {
          dude.x += this.dudeBounds.width
        } else if (dude.x > this.dudeBounds.x + this.dudeBounds.width) {
          dude.x -= this.dudeBounds.width
        }

        if (dude.y < this.dudeBounds.y) {
          dude.y += this.dudeBounds.height
        } else if (dude.y > this.dudeBounds.y + this.dudeBounds.height) {
          dude.y -= this.dudeBounds.height
        }
      }
    },
    onAppReady (app) {
      for (let i = 0; i < this.totalDudes; i++) {
        this.aliens.push({
          anchorX: 0.5,
          anchorY: 0.5,
          x: app.screen.width,
          y: app.screen.height,
          tint: Math.random() * 0xFFFFFF,
          direction: Math.random() * Math.PI * 2,
          turningSpeed: Math.random() - 0.8,
          speed: 2 + Math.random() * 2
        })
      }

      const dudeBoundsPadding = 100
      this.dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
        -dudeBoundsPadding,
        app.screen.width + dudeBoundsPadding * 2,
        app.screen.height + dudeBoundsPadding * 2)
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
