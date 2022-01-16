import { PropType } from 'vue'
import PContainer from './PContainer'

interface IFontStyle {
  fontName: string;
  fontSize?: number;
  align?: string;
  tint?: number;
  letterSpacing?: number;
  maxWidth?: number;
}

const PBitmapText = PContainer.extend({
  props: {
    text: {
      type: String,
      required: true
    },
    textStyle: {
      type: Object as PropType<IFontStyle>,
      required: true
    }
  },
  data (): { pDisplayObject: PIXI.BitmapText | null } {
    return {
      pDisplayObject: null
    }
  },
  computed: {
    instance (): PIXI.BitmapText {
      if (!this.textStyle.fontName) {
        throw new Error('Missing property "fontName" in "textStyle"')
      }

      if (!this.pDisplayObject) {
        this.pDisplayObject = new window.PIXI.BitmapText(this.text, this.textStyle)
      }
      return this.pDisplayObject
    }
  },
  watch: {
    text (newValue: string): void {
      this.pDisplayObject.text = newValue
    },

    textStyle (newValue: any): void {
      if (!newValue?.fontName) {
        console.warn('Missing property "fontName" in "textStyle"')
      } else {
        this.reinit(new window.PIXI.BitmapText(this.text, newValue))
      }
    }
  }
})

export default PBitmapText
