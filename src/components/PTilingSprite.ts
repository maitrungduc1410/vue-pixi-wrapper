import { Component } from 'vue-property-decorator'
import { TilingSprite, Texture } from 'pixi.js'
import PSprite from './PSprite'
import { mixins } from 'vue-class-component'

/**
 * A tiling sprite is a fast way of rendering a tiling image
 *
 */
@Component
export default class PTilingSprite extends mixins(PSprite) {
  declare pDisplayObject: TilingSprite

  override get instance (): TilingSprite {
    if (!this.pDisplayObject) {
      this.pDisplayObject = new TilingSprite(Texture.from(this.src), this.width, this.height)

      if (this.texture) {
        this.pDisplayObject = new TilingSprite(this.texture, this.width, this.height)
      } else {
        this.pDisplayObject = new TilingSprite(Texture.from(this.src), this.width, this.height)
      }
    }

    return this.pDisplayObject
  }
}
