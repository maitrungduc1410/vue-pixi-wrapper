import { PropType } from 'vue'
import PMesh from './PMesh'
/**
 * The SimplePlane allows you to draw a texture across several points and then manipulate these points
 *
 */

const PSimplePlane = PMesh.extend({
  props: {
    texture: {
      type: Object as PropType<PIXI.Texture>,
      validator: value => value instanceof window.PIXI.Texture
    },
    src: {
      type: String
    },
    verticesX: { type: Number, required: true },
    verticesY: { type: Number, required: true },

    //  override these required props from PMesh
    geometry: Object,
    shader: Object
  },
  data (): { pDisplayObject: PIXI.SimplePlane | null } {
    return {
      pDisplayObject: null
    }
  },
  computed: {
    instance (): PIXI.SimplePlane {
      if (this.texture) {
        this.pDisplayObject = new window.PIXI.SimplePlane(this.texture, this.verticesX, this.verticesY)
      } else if (this.src) {
        this.pDisplayObject = new window.PIXI.SimplePlane(window.PIXI.Texture.from(this.src), this.verticesX, this.verticesY)
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

export default PSimplePlane
