import PContainer from './PContainer'
import { PropType } from 'vue'

const PGraphics = PContainer.extend({
  props: {
    draw: { type: Function, required: true },
    geometry: { type: Object as PropType<PIXI.GraphicsGeometry> },
    reactiveData: { type: Array as PropType<string[]> } // data that should be watched to re-render graphics
  },
  data (): { pDisplayObject: PIXI.Graphics | null } {
    return {
      pDisplayObject: null
    }
  },
  computed: {
    instance (): PIXI.Graphics {
      if (!this.pDisplayObject) {
        this.pDisplayObject = new window.PIXI.Graphics(this.geometry)
        this.draw.call(this.pDisplayObject, this.pDisplayObject)
      }

      return this.pDisplayObject
    }
  },
  watch: {
    reactiveData (newValue: number): void {
      const g = this.pDisplayObject as PIXI.Graphics
      g.clear()
      this.draw.call(g, g)
      this.$emit('onUpdate', g)
    }
  }
})

export default PGraphics
