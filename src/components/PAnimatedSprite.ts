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
  @Prop({ type: Boolean }) readonly autoUpdate?: boolean
  @Prop({ type: Number, default: 1 }) readonly animationSpeed!: number
  @Prop({ type: Number, default: 0 }) readonly initialFrame!: number

  public textureArray: Texture[] = []
  declare pDisplayObject: AnimatedSprite

  override created (): void {
    for (const image of this.images) {
      const texture = Texture.from(image)
      this.textureArray.push(texture)
    }
  }

  override get instance (): AnimatedSprite {
    if (!this.pDisplayObject && this.textureArray.length) {
      this.pDisplayObject = new AnimatedSprite(this.textureArray, this.autoUpdate)
      this.pDisplayObject.gotoAndPlay(this.initialFrame)
      this.pDisplayObject.animationSpeed = this.animationSpeed
    }

    return this.pDisplayObject
  }

  @Watch('animationSpeed')
  onAnimationSpeedChange (newValue: number): void {
    this.pDisplayObject.animationSpeed = newValue
  }

  @Watch('autoUpdate')
  onAutoUpdateChange (newValue: boolean): void {
    this.pDisplayObject.autoUpdate = newValue
  }

  // TODO: watch on images changes
}
