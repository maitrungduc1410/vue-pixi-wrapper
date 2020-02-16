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

@Component
export default class PBitmapText extends mixins(PContainer) {
  @Prop({ type: String, required: true }) readonly text!: string
  @Prop({
    type: [Object, String],
    default: () => {
      return { align: 'left', tint: 0xFFFFFF }
    }
  }) readonly textStyle!: IFontStyle

  get instance () {
    return new BitmapText(this.text, this.textStyle)
  }

  @Watch('text')
  onTextChange (newValue: string) {
    (this.instance as unknown as BitmapText).text = newValue
  }
}
