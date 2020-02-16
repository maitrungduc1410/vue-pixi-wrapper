import { Component, Prop, Watch } from 'vue-property-decorator'
import { Texture, AnimatedSprite } from 'pixi.js'
import PSprite from './PSprite'
import { mixins } from 'vue-class-component'

@Component
export default class PAnimatedSprite extends mixins(PSprite) {
  @Prop({ type: Array, default: [] }) readonly images!: string[]
  @Prop({ type: Boolean, default: false }) readonly autoUpdate?: boolean
  @Prop({ type: Number, default: 1 }) readonly animationSpeed?: number
  @Prop({ type: Number, default: 0 }) readonly initialFrame?: number

  public textureArray: Texture[] = []

  created () {
    for (const image of this.images) {
      const texture = Texture.from(image)
      this.textureArray.push(texture)
    }
  }

  get instance () {
    const sprite = new AnimatedSprite(this.textureArray)
    sprite.gotoAndPlay(this.initialFrame as number)
    sprite.animationSpeed = this.animationSpeed as number
    return sprite
  }

  @Watch('animationSpeed')
  onAnimationSpeedChange (newValue: number) {
    this.instance.animationSpeed = newValue
  }

  // TODO: watch on images changes
}
