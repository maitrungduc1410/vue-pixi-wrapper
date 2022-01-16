import PSimplePlane from './PSimplePlane'

/**
 * The NineSlicePlane allows you to stretch a texture using 9-slice scaling. The corners will remain unscaled (useful for buttons with rounded corners for example) and the other areas will be scaled horizontally and or vertically
 *
 */
const PNineSlicePlane = PSimplePlane.extend({
  props: {
    leftWidth: { type: Number, default: 10 },
    topHeight: { type: Number, default: 10 },
    rightWidth: { type: Number, default: 10 },
    bottomHeight: { type: Number, default: 10 },

    //  override these required props from PSimplePlane
    verticesX: Number,
    verticesY: Number,
    geometry: Object,
    shader: Object
  },
  data (): { pDisplayObject: PIXI.NineSlicePlane | null } {
    return {
      pDisplayObject: null
    }
  },
  computed: {
    instance (): PIXI.NineSlicePlane {
      if (this.texture) {
        this.pDisplayObject = new window.PIXI.NineSlicePlane(this.texture, this.leftWidth, this.topHeight, this.rightWidth, this.bottomHeight)
      } else if (this.src) {
        this.pDisplayObject = new window.PIXI.NineSlicePlane(window.PIXI.Texture.from(this.src), this.leftWidth, this.topHeight, this.rightWidth, this.bottomHeight)
      }

      return this.pDisplayObject
    }
  }
})

export default PNineSlicePlane
