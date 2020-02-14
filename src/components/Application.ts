import { VNode, CreateElement } from 'vue/types'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Application as PIXIApplication } from 'pixi.js'

@Component
export default class Application extends Vue {
  @Prop({ default: 'canvas' }) readonly canvasId!: string
  @Prop() readonly width!: number
  @Prop() readonly h!: number
  @Prop() readonly backgroundColor?: number

  render (h: CreateElement): VNode {
    return h('canvas', {
      attrs: {
        id: this.canvasId
      }
    }, this.$slots.default)
  }

  mounted () {
    // Determine the width and height of the renderer wrapper element.
    const appComponent = document.getElementById(this.canvasId) as HTMLCanvasElement
    const w = 400
    const h = 400

    // eslint-disable-next-line no-new
    new PIXIApplication({
      view: appComponent,
      width: w,
      height: h,
      backgroundColor: this.backgroundColor,
      resolution: 2
    })

    this.$emit('ready')
  }
}
