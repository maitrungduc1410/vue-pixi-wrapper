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

  public pGraphics: Graphics | undefined

  get instance () {
    if (!this.pGraphics) {
      this.pGraphics = new Graphics()
      this.draw.call(this.pGraphics, this.pGraphics)
    }

    return this.pGraphics
  }

  @Watch('reactiveData')
  onReactiveDataChange () {
    const g = this.pGraphics as Graphics
    g.clear()
    this.draw.call(g, g)
    this.$emit('onUpdate', g)
  }
}
