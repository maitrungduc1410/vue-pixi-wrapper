import { Component, Prop, Watch } from 'vue-property-decorator'
import { Sprite } from 'pixi.js'
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
  @Prop() readonly tint!: number
  @Prop() readonly src!: string

  public pSprite: Sprite | undefined

  get instance () {
    if (!this.pSprite) {
      this.pSprite = this.src ? Sprite.from(this.src) : new Sprite()
      this.pSprite.anchor.set(this.anchorX, this.anchorY)

      if (this.tint) {
        this.pSprite.tint = this.tint
      }
      if (this.blendMode) {
        this.pSprite.blendMode = this.blendMode
      }
    }
    return this.pSprite
  }

  // set instance (newSrc: any) {
  //   newSrc ? Sprite.from(newSrc) : new Sprite()
  // }

  @Watch('anchorX')
  onAnchorXChange (newValue: number) {
    this.instance.anchor.set(newValue, this.anchorY)
  }

  @Watch('anchorY')
  onAnchorYChange (newValue: number) {
    this.instance.anchor.set(this.anchorY, newValue)
  }

  @Watch('blendMode')
  onBlendModeChange (newValue: number) {
    this.instance.blendMode = newValue
  }

  @Watch('tint')
  onTintChange (newValue: number) {
    this.instance.tint = newValue
  }

  // TODO
  // @Watch('src')
  // onSrcChange (newValue: string) {
  //   this.instance = newValue ? Sprite.from(newValue) : new Sprite()
  //   const text = new Sprite()
  // }
}
