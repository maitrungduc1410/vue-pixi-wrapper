import { Component, Prop, Watch } from 'vue-property-decorator'
import { BitmapText, IBitmapTextStyle } from 'pixi.js'
import PContainer from './PContainer'
import { mixins } from 'vue-class-component'

/**
 * A BitmapText object will create a line or multiple lines of text using bitmap font.
 *
 */
@Component
export default class PBitmapText extends mixins(PContainer) {
  @Prop({ type: String, required: true }) readonly text!: string
  @Prop({
    type: Object,
    required: true
  }) readonly textStyle!: Partial<IBitmapTextStyle>

  declare pDisplayObject: BitmapText

  override get instance (): BitmapText {
    if (!this.textStyle.fontName) {
      throw new Error('Missing property "fontName" in "textStyle"')
    }

    if (!this.pDisplayObject) {
      this.pDisplayObject = new BitmapText(this.text, this.textStyle)
    }
    return this.pDisplayObject
  }

  @Watch('text')
  onTextChange (newValue: string): void {
    this.pDisplayObject.text = newValue
  }

  @Watch('textStyle', { deep: true })
  onTextStyleChange (newValue: Partial<IBitmapTextStyle>): void {
    if (!newValue?.fontName) {
      console.warn('Missing property "fontName" in "textStyle"')
    } else {
      this.reinit(new BitmapText(this.text, newValue))
    }
  }
}
