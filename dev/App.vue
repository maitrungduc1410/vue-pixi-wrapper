<template>
  <div id="app">
    <p-application
      :enableTicker="true"
      @ticker="ticker"
      @ready="onAppReady"
    >
      <p-sprite
        v-for="(s, index) in stars"
        :key="`star-${index}`"
        :texture="s.sprite.texture"
        :x="s.sprite.x"
        :y="s.sprite.y"
        :scaleX="s.sprite.scaleX"
        :scaleY="s.sprite.scaleY"
        :anchorX="s.sprite.anchorX"
        :anchorY="s.sprite.anchorY"
        :rotation="s.sprite.rotation"
      />
    </p-application>
  </div>
</template>

<script>
import { PApplication, PSprite } from '@/'
import { Texture } from 'pixi.js'

export default {
  components: {
    PApplication,
    PSprite
  },
  data () {
    return {
      starAmount: 300,
      cameraZ: 0,
      fov: 20,
      baseSpeed: 0.025,
      speed: 0,
      warpSpeed: 0,
      starStretch: 5,
      starBaseSize: 0.05,
      stars: [],
      starTexture: Texture.from('https://pixijs.io/examples/examples/assets/star.png'),
      app: {}
    }
  },
  created () {
    // Create the stars
    for (let i = 0; i < this.starAmount; i++) {
      const star = {
        sprite: {
          texture: this.starTexture,
          anchorX: 0.5,
          anchorY: 0.7,
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          rotation: 0
        },
        z: 0,
        x: 0,
        y: 0
      }
      this.randomizeStar(star, true)
      this.stars.push(star)
    }
  },
  mounted () {
    setInterval(() => {
      this.warpSpeed = this.warpSpeed > 0 ? 0 : 1
    }, 5000)
  },
  methods: {
    onAppReady (app) {
      this.app = app
    },

    ticker (delta) {
      // Simple easing. This should be changed to proper easing function when used for real.
      this.speed += (this.warpSpeed - this.speed) / 20
      this.cameraZ += delta * 10 * (this.speed + this.baseSpeed)
      for (let i = 0; i < this.starAmount; i++) {
        const star = this.stars[i]
        if (star.z < this.cameraZ) this.randomizeStar(star)

        // Map star 3d position to 2d with really simple projection
        const z = star.z - this.cameraZ
        star.sprite.x = star.x * (this.fov / z) * this.app.renderer.screen.width + this.app.renderer.screen.width / 2
        star.sprite.y = star.y * (this.fov / z) * this.app.renderer.screen.width + this.app.renderer.screen.height / 2

        // Calculate star scale & rotation.
        const dxCenter = star.sprite.x - this.app.renderer.screen.width / 2
        const dyCenter = star.sprite.y - this.app.renderer.screen.height / 2
        const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter)
        const distanceScale = Math.max(0, (2000 - z) / 2000)
        star.sprite.scaleX = distanceScale * this.starBaseSize
        // Star is looking towards center so that y axis is towards center.
        // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
        star.sprite.scaleY = distanceScale * this.starBaseSize + distanceScale * this.speed * this.starStretch * distanceCenter / this.app.renderer.screen.width
        star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2
      }
    },
    randomizeStar (star, initial) {
      star.z = initial ? Math.random() * 2000 : this.cameraZ + Math.random() * 1000 + 2000

      // Calculate star positions with radial random coordinate so no star hits the camera.
      const deg = Math.random() * Math.PI * 2
      const distance = Math.random() * 50 + 1
      star.x = Math.cos(deg) * distance
      star.y = Math.sin(deg) * distance
    }
  }
}
</script>

<style>

</style>
