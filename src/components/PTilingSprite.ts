import { Component, Prop } from 'vue-property-decorator'
import { TilingSprite, Texture } from 'pixi.js'
import PSprite from './PSprite'
import { mixins } from 'vue-class-component'

@Component
export default class PTilingSprite extends mixins(PSprite) {
  @Prop({ type: String, required: true }) readonly image!: string

  get instance () {
    const texture = Texture.from(this.image)
    return new TilingSprite(texture, this.width, this.height)
  }

  // TODO: watch on image changes
}
