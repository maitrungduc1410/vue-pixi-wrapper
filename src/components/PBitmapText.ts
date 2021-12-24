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
    default: () => {
      return { align: 'left', tint: 0xFFFFFF }
    }
  }) readonly textStyle!: Partial<IBitmapTextStyle>

  declare pDisplayObject: BitmapText

  override get instance (): BitmapText {
    if (!this.pDisplayObject) {
      this.pDisplayObject = new BitmapText(this.text, this.textStyle)
    }
    return this.pDisplayObject
  }

  @Watch('text')
  onTextChange (newValue: string): void {
    this.pDisplayObject.text = newValue
  }
}
