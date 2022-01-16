import PSprite from './PSprite'

/**
 * A tiling sprite is a fast way of rendering a tiling image
 *
 */
const PTilingSprite = PSprite.extend({
  data (): { pDisplayObject: PIXI.TilingSprite | null } {
    return {
      pDisplayObject: null
    }
  },
  computed: {
    instance () {
      if (!this.pDisplayObject) {
        this.pDisplayObject = new window.PIXI.TilingSprite(window.PIXI.Texture.from(this.src), this.width, this.height)

        if (this.texture) {
          this.pDisplayObject = new window.PIXI.TilingSprite(this.texture, this.width, this.height)
        } else {
          this.pDisplayObject = new window.PIXI.TilingSprite(window.PIXI.Texture.from(this.src), this.width, this.height)
        }
      }

      return this.pDisplayObject
    }
  }
})

export default PTilingSprite
