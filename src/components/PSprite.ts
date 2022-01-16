import PContainer from './PContainer'
import { PropType } from 'vue'

/**
 * The Sprite object is the base for all textured objects that are rendered to the screen
 *
 */

const PSprite = PContainer.extend({
  props: {
    anchorX: { type: Number, default: 0 },
    anchorY: { type: Number, default: 0 },
    blendMode: { type: Number, default: 0 },
    tint: { type: Number },
    src: { type: String },
    texture: {
      type: Object as PropType<PIXI.Texture>,
      validator: value => value instanceof window.PIXI.Texture
    }
  },
  data (): { pDisplayObject: PIXI.Sprite | null } {
    return {
      pDisplayObject: null
    }
  },
  computed: {
    instance (): PIXI.Sprite {
      if (!this.pDisplayObject) {
        if (this.texture) {
          this.pDisplayObject = new window.PIXI.Sprite(this.texture)
        } else {
          this.pDisplayObject = this.src ? window.PIXI.Sprite.from(this.src) : new window.PIXI.Sprite()
        }

        this.pDisplayObject.anchor.set(this.anchorX, this.anchorY)

        if (this.tint) {
          this.pDisplayObject.tint = this.tint
        }
        if (this.blendMode) {
          this.pDisplayObject.blendMode = this.blendMode
        }
      }
      return this.pDisplayObject
    }
  },
  watch: {
    anchorX (newValue: number): void {
      this.pDisplayObject.anchor.set(newValue, this.anchorY)
    },

    anchorY (newValue: number): void {
      this.pDisplayObject.anchor.set(this.anchorY, newValue)
    },

    blendMode (newValue: number): void {
      this.pDisplayObject.blendMode = newValue
    },

    tint (newValue: number): void {
      this.pDisplayObject.tint = newValue
    },

    texture (newValue: PIXI.Texture): void {
      this.pDisplayObject.texture = newValue
    },

    src (newValue: string): void {
      this.pDisplayObject.texture = window.PIXI.Texture.from(newValue)
    }
  }
})

export default PSprite
