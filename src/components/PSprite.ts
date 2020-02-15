import { Component, Prop, Watch } from 'vue-property-decorator'
import { Sprite } from 'pixi.js'
import PContainer from './PContainer'
import { mixins } from 'vue-class-component'

@Component
export default class PSprite extends mixins(PContainer) {
  @Prop({ default: 0 }) readonly anchorX!: number
  @Prop({ default: 0 }) readonly anchorY!: number
  @Prop({ default: 0 }) readonly blendMode!: number
  @Prop() readonly tint!: number
  @Prop() readonly src!: string

  get instance () {
    return this.src ? Sprite.from(this.src) : new Sprite()
  }

  // set instance (newSrc: any) {
  //   newSrc ? Sprite.from(newSrc) : new Sprite()
  // }

  @Watch('anchorX')
  onAnchorXChange (newValue: number) {
    this.instance.anchor.x = newValue
  }

  @Watch('anchorY')
  onAnchorYChange (newValue: number) {
    this.instance.anchor.y = newValue
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
