import { Component, Prop, Watch } from 'vue-property-decorator'
import { Texture, AnimatedSprite } from 'pixi.js'
import PSprite from './PSprite'
import { mixins } from 'vue-class-component'

/**
 * An AnimatedSprite is a simple way to display an animation depicted by a list of textures
 *
 */
@Component
export default class PAnimatedSprite extends mixins(PSprite) {
  @Prop({ type: Array, default: [] }) readonly images!: string[]
  @Prop({ type: Boolean, default: false }) readonly autoUpdate?: boolean
  @Prop({ type: Number, default: 1 }) readonly animationSpeed?: number
  @Prop({ type: Number, default: 0 }) readonly initialFrame?: number

  public textureArray: Texture[] = []
  public pAnimatedSprite: AnimatedSprite | undefined

  created () {
    for (const image of this.images) {
      const texture = Texture.from(image)
      this.textureArray.push(texture)
    }
  }

  get instance () {
    if (!this.pAnimatedSprite) {
      this.pAnimatedSprite = new AnimatedSprite(this.textureArray)
      this.pAnimatedSprite.gotoAndPlay(this.initialFrame as number)
      this.pAnimatedSprite.animationSpeed = this.animationSpeed as number
    }

    return this.pAnimatedSprite
  }

  @Watch('animationSpeed')
  onAnimationSpeedChange (newValue: number) {
    this.instance.animationSpeed = newValue
  }

  // TODO: watch on images changes
}
