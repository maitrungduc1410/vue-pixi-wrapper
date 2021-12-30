import { Component, Prop, Watch } from 'vue-property-decorator'
import { Texture, Geometry, MeshMaterial, SimplePlane } from 'pixi.js'
import { mixins } from 'vue-class-component'
import PMesh from './PMesh'

/**
 * The SimplePlane allows you to draw a texture across several points and then manipulate these points
 *
 */
@Component
export default class PSimplePlane extends mixins(PMesh) {
  @Prop({
    type: Object,
    validator: value => value instanceof Texture
  }) readonly texture?: Texture

  @Prop({
    type: String
  }) readonly src?: string

  @Prop({ type: Number, required: true }) readonly verticesX!: number
  @Prop({ type: Number, required: true }) readonly verticesY!: number

  //  override these required props from PMesh
  @Prop() declare readonly geometry: Geometry
  @Prop() declare readonly shader: MeshMaterial

  declare pDisplayObject: SimplePlane

  override get instance (): SimplePlane {
    if (this.texture) {
      this.pDisplayObject = new SimplePlane(this.texture, this.verticesX, this.verticesY)
    } else if (this.src) {
      this.pDisplayObject = new SimplePlane(Texture.from(this.src), this.verticesX, this.verticesY)
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
