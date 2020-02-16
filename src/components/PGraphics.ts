import { Component, Prop } from 'vue-property-decorator'
import { Graphics } from 'pixi.js'
import PContainer from './PContainer'
import { mixins } from 'vue-class-component'

@Component
export default class PGraphics extends mixins(PContainer) {
  @Prop({ type: Function, required: true }) readonly draw!: (g: Graphics) => void

  get instance () {
    const g = new Graphics()
    this.draw(g)
    return g
  }
}
