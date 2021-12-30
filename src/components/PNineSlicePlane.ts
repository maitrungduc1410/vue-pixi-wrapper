import { Component, Prop, Watch } from 'vue-property-decorator'
import { Texture, Geometry, MeshMaterial, NineSlicePlane } from 'pixi.js'
import { mixins } from 'vue-class-component'
import { PSimplePlane } from '..'

/**
 * The NineSlicePlane allows you to stretch a texture using 9-slice scaling. The corners will remain unscaled (useful for buttons with rounded corners for example) and the other areas will be scaled horizontally and or vertically
 *
 */
@Component
export default class PNineSlicePlane extends mixins(PSimplePlane) {
  @Prop({ type: Number, default: 10 }) readonly leftWidth?: number
  @Prop({ type: Number, default: 10 }) readonly topHeight?: number
  @Prop({ type: Number, default: 10 }) readonly rightWidth?: number
  @Prop({ type: Number, default: 10 }) readonly bottomHeight?: number

  // override these required props from PSimplePlane
  @Prop() declare readonly verticesX: number
  @Prop() declare readonly verticesY: number
  @Prop() declare readonly geometry: Geometry
  @Prop() declare readonly shader: MeshMaterial

  declare pDisplayObject: NineSlicePlane

  override get instance (): NineSlicePlane {
    if (this.texture) {
      this.pDisplayObject = new NineSlicePlane(this.texture, this.leftWidth, this.topHeight, this.rightWidth, this.bottomHeight)
    }

    return this.pDisplayObject
  }

  @Watch('texture')
  override onTextureChange (newValue: Texture): void {
    this.pDisplayObject.texture = newValue
  }

  @Watch('src')
  override onSrcChange (newValue: string): void {
    this.pDisplayObject.texture = Texture.from(newValue)
  }
}
