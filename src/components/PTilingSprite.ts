import { Component, Prop } from 'vue-property-decorator'
import { TilingSprite, Texture } from 'pixi.js'
import PSprite from './PSprite'
import { mixins } from 'vue-class-component'

@Component
export default class PTilingSprite extends mixins(PSprite) {
  @Prop({ type: String, required: true }) readonly image!: string

  public pTilingSprite: TilingSprite | undefined

  get instance () {
    if (!this.pTilingSprite) {
      const texture = Texture.from(this.image)
      this.pTilingSprite = new TilingSprite(texture, this.width, this.height)
    }

    return this.pTilingSprite
  }

  // TODO: watch on image changes
}
