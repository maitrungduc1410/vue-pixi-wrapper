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
      <p-container>
        <p-animated-sprite
          :images="['https://pixijs.io/examples/examples/assets/flowerTop.png', 'https://pixijs.io/examples/examples/assets/eggHead.png']"
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
  // mounted () {
  //   const app = new window.PIXI.Application()
  //   document.body.appendChild(app.view)
  //   const arr = [
  //     'https://pixijs.io/examples/examples/assets/flowerTop.png',
  //     'https://pixijs.io/examples/examples/assets/eggHead.png'
  //   ]
  //   const textureArray = []
  //   for (const image of arr) {
  //     const texture = window.PIXI.Texture.from(image)
  //     textureArray.push(texture)
  //   }

  //   // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
  //   const anim = new window.PIXI.AnimatedSprite(textureArray)

  //   /*
  //    * An AnimatedSprite inherits all the properties of a PIXI sprite
  //    * so you can change its position, its anchor, mask it, etc
  //    */
  //   anim.x = app.screen.width / 2
  //   anim.y = app.screen.height / 2
  //   anim.anchor.set(0.5)
  //   anim.animationSpeed = 0.05
  //   anim.play()

  //   app.stage.addChild(anim)
  // }
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
