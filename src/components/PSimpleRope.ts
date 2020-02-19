import { Component, Prop, Watch } from 'vue-property-decorator'
import { SimpleRope, Texture, Point } from 'pixi.js'
import PContainer from './PContainer'
import { mixins } from 'vue-class-component'

/**
 * The rope allows you to draw a texture across several points and then manipulate these points
 *
 */
@Component
export default class PSimpleRope extends mixins(PContainer) {
  @Prop() readonly texture!: Texture
  @Prop({ type: String }) readonly src!: string
  @Prop({ required: true }) readonly points!: Point[]
  @Prop({ type: Number, default: 0 }) readonly textureScale!: number
  @Prop({ type: Number, default: 0 }) readonly blendMode!: number

  public pSimpleRope: SimpleRope | undefined

  get instance () {
    if (this.texture) {
      this.pSimpleRope = new SimpleRope(this.texture, this.points, this.textureScale)
    } else {
      this.pSimpleRope = new SimpleRope(Texture.from(this.src), this.points, this.textureScale)
    }
    return this.pSimpleRope
  }

  created () {
    if (this.blendMode) {
      this.instance.blendMode = this.blendMode
    }
  }

  @Watch('texture')
  onTextureChange (newValue: Texture) {
    this.instance.texture = newValue
  }

  @Watch('src')
  onSrcChange (newValue: string) {
    this.instance.texture = Texture.from(newValue)
  }
}
