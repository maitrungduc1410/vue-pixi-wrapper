import { Component, Prop, Watch } from 'vue-property-decorator'
import { Graphics } from 'pixi.js'
import PContainer from './PContainer'
import { mixins } from 'vue-class-component'

/**
 * The Graphics class contains methods used to draw primitive shapes such as lines, circles and rectangles to the display, and to color and fill them.
 *
 */
@Component
export default class PGraphics extends mixins(PContainer) {
  @Prop({ type: Function, required: true }) readonly draw!: (g: Graphics) => void
  @Prop({ type: Array }) readonly reactiveData!: string[] // data that should be watched to re-render graphics

  declare pDisplayObject: Graphics

  override get instance (): Graphics {
    if (!this.pDisplayObject) {
      this.pDisplayObject = new Graphics()
      this.draw.call(this.pDisplayObject, this.pDisplayObject)
    }

    return this.pDisplayObject
  }

  @Watch('reactiveData')
  onReactiveDataChange (): void {
    const g = this.pDisplayObject as Graphics
    g.clear()
    this.draw.call(g, g)
    this.$emit('onUpdate', g)
  }
}
