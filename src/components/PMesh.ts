import { Component, Prop } from 'vue-property-decorator'
import { Geometry, MeshMaterial, State, DRAW_MODES, Mesh } from 'pixi.js'
import { mixins } from 'vue-class-component'
import PContainer from './PContainer'

/**
 * A Container represents a collection of display objects.
 *
 * It is the base class of all display objects that act as a container for other objects (like Sprites).
 */
@Component
export default class PMesh extends mixins(PContainer) {
  @Prop({
    type: Object,
    validator: value => value instanceof Geometry,
    required: true
  }) readonly geometry!: Geometry

  @Prop({
    type: Object,
    validator: value => value instanceof MeshMaterial,
    required: true
  }) readonly shader!: MeshMaterial

  @Prop({
    type: Object,
    validator: value => value instanceof State
  }) readonly state?: State

  @Prop({
    type: Number,
    validator: value => value in DRAW_MODES
  }) readonly drawMode?: DRAW_MODES

  declare pDisplayObject: Mesh

  override get instance (): Mesh {
    if (!this.pDisplayObject) {
      this.pDisplayObject = new Mesh(this.geometry, this.shader, this.state, this.drawMode)
    }

    return this.pDisplayObject
  }

  // TODO: Watch on props change
}
