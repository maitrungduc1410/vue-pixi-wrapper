import { Component, Prop, Watch } from 'vue-property-decorator'
import { Sprite, Texture } from 'pixi.js'
import PContainer from './PContainer'
import { mixins } from 'vue-class-component'

/**
 * The Sprite object is the base for all textured objects that are rendered to the screen
 *
 */
@Component
export default class PSprite extends mixins(PContainer) {
  @Prop({ type: Number, default: 0 }) readonly anchorX!: number
  @Prop({ type: Number, default: 0 }) readonly anchorY!: number
  @Prop({ type: Number, default: 0 }) readonly blendMode!: number
  @Prop({ type: Number }) readonly tint!: number
  @Prop({ type: String }) readonly src!: string
  @Prop({
    type: Object,
    validator: value => value instanceof Texture
  }) readonly texture!: Texture

  declare pDisplayObject: Sprite

  override get instance (): Sprite {
    if (!this.pDisplayObject) {
      if (this.texture) {
        this.pDisplayObject = new Sprite(this.texture)
      } else {
        this.pDisplayObject = this.src ? Sprite.from(this.src) : new Sprite()
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

  @Watch('anchorX')
  onAnchorXChange (newValue: number): void {
    this.pDisplayObject.anchor.set(newValue, this.anchorY)
  }

  @Watch('anchorY')
  onAnchorYChange (newValue: number): void {
    this.pDisplayObject.anchor.set(this.anchorY, newValue)
  }

  @Watch('blendMode')
  onBlendModeChange (newValue: number): void {
    this.pDisplayObject.blendMode = newValue
  }

  @Watch('tint')
  onTintChange (newValue: number): void {
    this.pDisplayObject.tint = newValue
  }

  @Watch('texture')
  onTextureChange (newValue: Texture): void {
    this.pDisplayObject.texture = newValue
  }

  @Watch('src')
  onSrcChange (newValue: string): void {
    this.pDisplayObject.texture = Texture.from(newValue)
  }
}
