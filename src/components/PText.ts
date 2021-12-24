import { Component, Prop, Watch } from 'vue-property-decorator'
import { ITextStyle, Text, TextStyle } from 'pixi.js'
import PSprite from './PSprite'
import { mixins } from 'vue-class-component'

/**
 * A Text Object will create a line or multiple lines of text.
 *
 */
@Component
export default class PText extends mixins(PSprite) {
  @Prop({ type: String }) readonly text!: string
  @Prop({
    type: Object
  }) readonly textStyle?: Partial<ITextStyle>

  @Prop({
    type: Object,
    validator: value => value instanceof HTMLCanvasElement
  }) readonly canvas?: HTMLCanvasElement

  declare pDisplayObject: Text

  override get instance (): Text {
    if (!this.pDisplayObject) {
      this.pDisplayObject = new Text(this.text, this.textStyle, this.canvas)
    }
    return this.pDisplayObject
  }

  @Watch('text')
  onTextChange (newValue: string): void {
    this.pDisplayObject.text = newValue
  }

  @Watch('textStyle')
  onTextStyleChange (newValue: TextStyle): void {
    this.pDisplayObject.style = newValue
  }
}
