import { PropType } from 'vue'
import PMesh from './PMesh'

/**
 * The rope allows you to draw a texture across several points and then manipulate these points
 *
 */
const PSimpleRope = PMesh.extend({
  props: {
    texture: {
      type: Object,
      validator: value => value instanceof window.PIXI.Texture
    },
    src: { type: String },
    points: { type: Array as PropType<PIXI.Point[]>, required: true },
    textureScale: { type: Number, default: 0 },

    //  override these required props from PMesh
    geometry: Object,
    shader: Object
  },
  data (): { pDisplayObject: PIXI.SimpleRope | null } {
    return {
      pDisplayObject: null
    }
  },
  computed: {
    instance (): PIXI.SimpleRope {
      if (this.texture) {
        this.pDisplayObject = new window.PIXI.SimpleRope(this.texture, this.points, this.textureScale)
      } else if (this.src) {
        this.pDisplayObject = new window.PIXI.SimpleRope(window.PIXI.Texture.from(this.src), this.points, this.textureScale)
      }
      return this.pDisplayObject
    }
  },
  watch: {
    texture (newValue: PIXI.Texture): void {
      this.pDisplayObject.texture = newValue
    },
    src (newValue: string): void {
      this.pDisplayObject.texture = window.PIXI.Texture.from(newValue)
    }
  }
})

export default PSimpleRope
