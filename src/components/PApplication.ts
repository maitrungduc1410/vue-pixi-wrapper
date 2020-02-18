import { VNode, CreateElement } from 'vue/types'
import {
  Vue,
  Component,
  Prop,
  Watch,
  Provide
} from 'vue-property-decorator'
import { Application, utils } from 'pixi.js'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IApplication {
  instance: Application | null;
  EventBus: Vue;
  isReady: boolean;
}

/**
 * Convenience class to create a new PIXI application.
 *
 * This class automatically creates the renderer, ticker and root container.
 */
@Component
export default class PApplication extends Vue {
  @Prop({ type: String, default: 'canvas' }) readonly canvasId!: string
  @Prop({ type: Boolean, default: false }) readonly skipHello!: boolean
  @Prop({ type: Boolean, default: false }) readonly enableTicker!: boolean

  @Prop({ type: Boolean, default: true }) readonly autoStart?: boolean
  @Prop({ type: Number, default: 800 }) readonly width!: number
  @Prop({ type: Number, default: 600 }) readonly height!: number
  @Prop({ type: Boolean, default: false }) readonly transparent!: boolean
  @Prop({ type: Boolean, default: false }) readonly autoDensity?: boolean
  @Prop({ type: Boolean, default: false }) readonly antialias?: boolean
  @Prop({ type: Boolean, default: false }) readonly preserveDrawingBuffer?: boolean
  @Prop({ type: Number, default: 1 }) readonly resolution!: number
  @Prop({ type: Boolean, default: true }) readonly forceCanvas?: boolean
  @Prop({ type: Number, default: 0x000000 }) readonly backgroundColor!: number
  @Prop({ type: Boolean, default: true }) readonly clearBeforeRender?: boolean
  @Prop({ type: Boolean, default: false }) readonly forceFXAA?: boolean
  @Prop({ type: String }) readonly powerPreference?: string
  @Prop({ type: Boolean, default: false }) readonly sharedLoader?: string
  // @Prop({ type: Window | HTMLElement, default: '' }) readonly resizeTo?: Window | HTMLElement

  public application: IApplication = {
    instance: null,
    EventBus: new Vue(),
    isReady: false
  }

  @Provide() app = this.application

  get instance () {
    return (this.application.instance as Application).stage
  }

  get renderer () {
    return (this.application.instance as Application).renderer
  }

  render (h: CreateElement): VNode {
    return h('canvas', {
      attrs: {
        id: this.canvasId
      }
    }, this.$slots.default)
  }

  created () {
    if (this.skipHello) {
      utils.skipHello()
    }
  }

  mounted () {
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement

    this.application.instance = new Application({
      ...this.$props,
      view: canvas
    })

    this.application.isReady = true
    this.application.EventBus.$emit('ready')
    this.$emit('ready', this.application.instance)

    if (this.enableTicker) { // only enable ticker if need
      this.application.instance.ticker.add((delta: number) => this.$emit('ticker', delta))
    }
  }

  @Watch('width')
  onChangeWidth (val: number) {
    this.renderer.resize(val, this.height)
  }

  @Watch('height')
  onChangeHeight (val: number) {
    this.renderer.resize(this.width, val)
  }

  @Watch('backgroundColor')
  onChangeBackgroundColor (val: number) {
    this.renderer.backgroundColor = val
  }

  @Watch('resolution')
  onChangeResolution (val: number) {
    this.renderer.resolution = val
  }

  @Watch('transparent')
  onChangeTransparent (val: boolean) {
    this.renderer.transparent = val
  }
}
