import PSprite from './PSprite'
import { PropType } from 'vue'
/**
 * An AnimatedSprite is a simple way to display an animation depicted by a list of textures
 *
 */

const PAnimatedSprite = PSprite.extend({
  props: {
    images: { type: Array as PropType<string[]>, default: [] },
    autoUpdate: { type: Boolean, default: true },
    animationSpeed: { type: Number, default: 1 },
    initialFrame: { type: Number, default: 0 }
  },
  data (): {
    pDisplayObject: PIXI.AnimatedSprite | null,
    textureArray: PIXI.Texture[]
    } {
    return {
      pDisplayObject: null,
      textureArray: []
    }
  },
  created (): void {
    for (const image of this.images) {
      const texture = window.PIXI.Texture.from(image)
      this.textureArray.push(texture)
    }
  },
  computed: {
    instance (): PIXI.AnimatedSprite {
      if (!this.pDisplayObject && this.textureArray.length) {
        this.pDisplayObject = new window.PIXI.AnimatedSprite(this.textureArray, this.autoUpdate)
        this.pDisplayObject.gotoAndPlay(this.initialFrame)
        this.pDisplayObject.animationSpeed = this.animationSpeed
      }

      return this.pDisplayObject
    }
  },
  watch: {
    animationSpeed (newValue: number): void {
      this.pDisplayObject.animationSpeed = newValue
    },

    autoUpdate (newValue: boolean): void {
      this.pDisplayObject.autoUpdate = newValue
    },
    images (newValue: string[]) {
      for (const t of this.textureArray) {
        t.destroy(true)
      }

      this.textureArray = []
      for (const image of newValue) {
        const texture = window.PIXI.Texture.from(image)
        this.textureArray.push(texture)
      }

      const newObj = new window.PIXI.AnimatedSprite(this.textureArray, this.autoUpdate)
      newObj.gotoAndPlay(this.initialFrame)
      newObj.animationSpeed = this.animationSpeed
      this.reinit(newObj)
    }
  }
})

export default PAnimatedSprite
