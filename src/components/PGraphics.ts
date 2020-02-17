import { Component, Prop } from 'vue-property-decorator'
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

  public pGraphics: Graphics | undefined

  get instance () {
    if (!this.pGraphics) {
      this.pGraphics = new Graphics()
      this.draw(this.pGraphics)
    }

    return this.pGraphics
  }
}
