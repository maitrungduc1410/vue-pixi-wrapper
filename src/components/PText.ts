import { Component, Prop, Watch } from 'vue-property-decorator'
import { Text } from 'pixi.js'
import PSprite from './PSprite'
import { mixins } from 'vue-class-component'

@Component
export default class PText extends mixins(PSprite) {
  @Prop() readonly text!: string
  @Prop() readonly textStyle?: object
  @Prop() readonly canvas?: HTMLCanvasElement

  get instance () {
    return new Text(this.text, this.textStyle, this.canvas)
  }

  @Watch('text')
  onTextChange (newValue: string) {
    this.instance.text = newValue
  }
}
