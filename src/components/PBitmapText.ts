import { Component, Prop, Watch } from 'vue-property-decorator'
import { BitmapText } from 'pixi.js'
import PContainer from './PContainer'
import { mixins } from 'vue-class-component'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IFontStyle {
  font: {
    name?: string;
    size?: number;
  };
  align?: string | undefined;
  tint?: number | undefined;
}

/**
 * A BitmapText object will create a line or multiple lines of text using bitmap font.
 *
 */
@Component
export default class PBitmapText extends mixins(PContainer) {
  @Prop({ type: String, required: true }) readonly text!: string
  @Prop({
    type: [Object, String],
    default: () => {
      return { align: 'left', tint: 0xFFFFFF }
    }
  }) readonly textStyle!: IFontStyle

  public pBitmapText: BitmapText | undefined

  get instance () {
    if (!this.pBitmapText) {
      this.pBitmapText = new BitmapText(this.text, this.textStyle)
    }
    return this.pBitmapText
  }

  @Watch('text')
  onTextChange (newValue: string) {
    (this.instance as unknown as BitmapText).text = newValue
  }
}
