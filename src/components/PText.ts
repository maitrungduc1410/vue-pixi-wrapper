import PSprite from './PSprite'
import { PropType } from 'vue'

/**
 * A Text Object will create a line or multiple lines of text.
 *
 */
const PText = PSprite.extend({
  props: {
    text: { type: String, required: true },
    textStyle: {
      type: Object as PropType<PIXI.TextStyle>
    },
    canvas: {
      type: Object as PropType<HTMLCanvasElement>,
      validator: value => value instanceof HTMLCanvasElement
    }
  },
  data (): { pDisplayObject: PIXI.Text | null } {
    return {
      pDisplayObject: null
    }
  },
  computed: {
    instance (): PIXI.Text {
      if (!this.pDisplayObject) {
        this.pDisplayObject = new window.PIXI.Text(this.text, this.textStyle, this.canvas)
      }
      return this.pDisplayObject
    }
  },
  watch: {
    text (newValue: string): void {
      this.pDisplayObject.text = newValue
    },
    textStyle (newValue: PIXI.TextStyle): void {
      this.pDisplayObject.style = newValue
    }
  }
})

export default PText
