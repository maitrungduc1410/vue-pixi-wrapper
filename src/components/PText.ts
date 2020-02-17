import { Component, Prop, Watch } from 'vue-property-decorator'
import { Text } from 'pixi.js'
import PSprite from './PSprite'
import { mixins } from 'vue-class-component'

@Component
export default class PText extends mixins(PSprite) {
  @Prop() readonly text!: string
  @Prop() readonly textStyle?: object
  @Prop() readonly canvas?: HTMLCanvasElement
  public pText: Text | undefined

  get instance () {
    if (!this.pText) {
      this.pText = new Text(this.text, this.textStyle, this.canvas)
    }
    return this.pText
  }

  @Watch('text')
  onTextChange (newValue: string) {
    this.instance.text = newValue
  }
}
