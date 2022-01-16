import PContainer from './PContainer'
import { PropType } from 'vue'

const PMesh = PContainer.extend({
  props: {
    geometry: {
      type: Object as PropType<PIXI.Geometry>,
      required: true
    },
    shader: {
      type: Object as PropType<PIXI.MeshMaterial>,
      required: true
    },
    state: {
      type: Object as PropType<PIXI.State>
    },
    drawMode: {
      type: Number,
      validator: value => value in window.PIXI.DRAW_MODES
    }
  },
  data (): { pDisplayObject: PIXI.Mesh | null } {
    return {
      pDisplayObject: null
    }
  },
  computed: {
    instance (): PIXI.Mesh {
      if (!this.pDisplayObject) {
        this.pDisplayObject = new window.PIXI.Mesh(this.geometry, this.shader, this.state, this.drawMode)
      }

      return this.pDisplayObject
    }
  }
})

export default PMesh
