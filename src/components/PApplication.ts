import { VNode, CreateElement } from 'vue/types'
import {
  Vue,
  Component,
  Prop,
  Watch,
  Provide
} from 'vue-property-decorator'
import { AbstractRenderer, Application, Container, Renderer, settings, utils } from 'pixi.js'
import { eventHandlers, READY_EVENT } from '../constants'

export interface IApplication {
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
  @Prop({ type: Boolean, default: false }) readonly interactive!: boolean
  @Prop({ type: Array, default: () => { return [] } }) readonly events!: string[]

  @Prop({ type: Boolean, default: true }) readonly autoStart?: boolean
  @Prop({ type: Number, default: 800 }) readonly width!: number
  @Prop({ type: Number, default: 600 }) readonly height!: number
  // @Prop({
  //   type: Object,
  //   validator: value => value instanceof HTMLCanvasElement
  // }) readonly view?: HTMLCanvasElement

  @Prop({ type: Boolean, default: true }) readonly useContextAlpha!: boolean
  @Prop({ type: Boolean, default: false }) readonly autoDensity!: boolean
  @Prop({ type: Boolean, default: false }) readonly antialias!: boolean
  @Prop({ type: Boolean, default: false }) readonly preserveDrawingBuffer!: boolean
  @Prop({ type: Number, default: settings.RESOLUTION }) readonly resolution!: number
  @Prop({ type: Boolean, default: false }) readonly forceCanvas!: boolean
  @Prop({ type: Number, default: 0x000000 }) readonly backgroundColor!: number
  @Prop({ type: Number, default: 1 }) readonly backgroundAlpha!: number
  @Prop({ type: Boolean, default: true }) readonly clearBeforeRender!: boolean
  @Prop({ type: String }) readonly powerPreference?: string
  @Prop({ type: Boolean, default: false }) readonly sharedLoader?: boolean
  @Prop({ type: Boolean, default: false }) readonly sharedTicker!: boolean
  @Prop({
    type: Object,
    validator: value => value instanceof Window || value instanceof HTMLElement
  }) readonly resizeTo!: Window | HTMLElement

  public application: IApplication = {
    instance: null,
    EventBus: new Vue(),
    isReady: false
  }

  @Provide() app = this.application

  get instance (): Container {
    return (this.application.instance as Application).stage
  }

  get renderer (): Renderer | AbstractRenderer {
    return (this.application.instance as Application).renderer
  }

  render (h: CreateElement): VNode {
    return h('canvas', {
      attrs: {
        id: this.canvasId
      }
    }, this.$slots.default)
  }

  beforeDestroy (): void {
    this.instance.removeAllListeners() // remove all event listeners
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.application.instance!.destroy(true)
  }

  created (): void {
    if (this.skipHello) {
      utils.skipHello()
    }
  }

  mounted (): void {
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement

    this.application.instance = new Application({
      ...this.$props,
      view: canvas
    })

    this.application.isReady = true
    this.initProps()
    this.initEvents()

    this.$emit('ready', this.application.instance)
    this.application.EventBus.$emit(READY_EVENT)

    if (this.enableTicker) { // only enable ticker if need
      this.application.instance.ticker.add((delta: number) => this.$emit('ticker', delta))
    }
  }

  initProps (): void {
    if (this.interactive) {
      this.instance.interactive = this.interactive
    }
  }

  initEvents (): void {
    for (const event of this.events) {
      const index = eventHandlers.findIndex(item => item === event)

      if (index === -1) {
        console.error(`[Even listener error]: There's no event listener for event name '${event}'`)
      } else {
        this.instance.on(event, (e: Event) => this.$emit(`on${event}`, e))
      }
    }
  }

  @Watch('width')
  onChangeWidth (val: number): void {
    this.renderer.resize(val, this.height)
  }

  @Watch('height')
  onChangeHeight (val: number): void {
    this.renderer.resize(this.width, val)
  }

  @Watch('backgroundColor')
  onChangeBackgroundColor (val: number): void {
    this.renderer.backgroundColor = val
  }

  @Watch('resolution')
  onChangeResolution (val: number): void {
    this.renderer.resolution = val
  }

  // @Watch('backgroundAlpha')
  // onChangeBackgroundAlpha (val: number): void {
  //   this.renderer.backgroundAlpha = val
  // }
}
