import { Component, Prop, Watch } from 'vue-property-decorator'
import { SimpleRope, Texture, Point, Geometry, MeshMaterial } from 'pixi.js'
import { mixins } from 'vue-class-component'
import PMesh from './PMesh'

/**
 * The rope allows you to draw a texture across several points and then manipulate these points
 *
 */
@Component
export default class PSimpleRope extends mixins(PMesh) {
  @Prop({
    type: Object,
    validator: value => value instanceof Texture
  }) readonly texture?: Texture

  @Prop({ type: String }) readonly src?: string
  @Prop({ type: Array, required: true }) readonly points!: Point[]
  @Prop({ type: Number, default: 0 }) readonly textureScale!: number

  //  override these required props from PMesh
  @Prop({
    type: Object,
    validator: value => value instanceof Geometry
  }) declare readonly geometry: Geometry

  @Prop({
    type: Object,
    validator: value => value instanceof MeshMaterial
  }) declare readonly shader: MeshMaterial

  declare pDisplayObject: SimpleRope

  override get instance (): SimpleRope {
    if (this.texture) {
      this.pDisplayObject = new SimpleRope(this.texture, this.points, this.textureScale)
    } else if (this.src) {
      this.pDisplayObject = new SimpleRope(Texture.from(this.src), this.points, this.textureScale)
    }
    return this.pDisplayObject
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
