import { VNode, CreateElement } from 'vue/types'
import PDisplayObject from './PDisplayObject'

const PContainer = PDisplayObject.extend({
  props: {
    width: Number,
    height: Number,
    interactiveChildren: { type: Boolean, default: true }
  },
  data (): { pDisplayObject: PIXI.Container | null } {
    return {
      pDisplayObject: null
    }
  },
  render (h: CreateElement): VNode {
    return h('template', this.$slots.default)
  },
  computed: {
    instance (): PIXI.Container {
      if (!this.pDisplayObject) {
        this.pDisplayObject = new window.PIXI.Container()
      }

      return this.pDisplayObject
    }
  },
  created (): void {
    if (this.pDisplayObject) this.initExtraProps()
  },
  methods: {
    initExtraProps (): void {
      this.pDisplayObject.interactiveChildren = this.interactiveChildren

      if (this.width) {
        this.pDisplayObject.width = this.width
      }

      if (this.height) {
        this.pDisplayObject.height = this.height
      }
    }
  },
  watch: {
    width (newValue: number): void {
      this.pDisplayObject.width = newValue
    },
    height (newValue: number): void {
      this.pDisplayObject.height = newValue
    },
    interactiveChildren (newValue: boolean): void {
      this.pDisplayObject.interactiveChildren = newValue
    }
  }
})

export default PContainer
