import { Component, Prop, Watch } from 'vue-property-decorator'
import { TilingSprite, Texture } from 'pixi.js'
import PSprite from './PSprite'
import { mixins } from 'vue-class-component'

/**
 * A tiling sprite is a fast way of rendering a tiling image
 *
 */
@Component
export default class PTilingSprite extends mixins(PSprite) {
  @Prop({ type: String, required: true }) readonly image!: string

  declare pDisplayObject: TilingSprite

  override get instance (): TilingSprite {
    if (!this.pDisplayObject) {
      this.pDisplayObject = new TilingSprite(Texture.from(this.image), this.width, this.height)
    }

    return this.pDisplayObject
  }

  @Watch('image')
  onImageChange (newValue: string): void {
    this.pDisplayObject.texture = Texture.from(newValue)
  }
}
