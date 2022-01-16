import { eventHandlers, READY_EVENT } from '../constants'
import Vue, { CreateElement, PropType, VNode } from 'vue'

export interface IApplication {
  instance: PIXI.Application | null;
  EventBus: Vue;
  isReady: boolean;
}

const PApplication = Vue.extend({
  name: 'p-application',
  props: {
    canvasId: {
      type: String,
      default: 'canvas'
    },
    skipHello: {
      type: Boolean,
      default: false
    },
    enableTicker: {
      type: Boolean,
      default: false
    },
    interactive: {
      type: Boolean,
      default: false
    },
    events: {
      type: Array as PropType<Array<string>>,
      default: () => { return [] }
    },

    autoStart: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 600
    },
    view: {
      type: Object,
      validator: value => value instanceof HTMLCanvasElement
    },
    useContextAlpha: {
      type: Boolean,
      default: true
    },
    autoDensity: {
      type: Boolean,
      default: false
    },
    antialias: {
      type: Boolean,
      default: false
    },
    preserveDrawingBuffer: {
      type: Boolean,
      default: false
    },
    resolution: {
      type: Number,
      default: 1
    },
    forceCanvas: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: Number,
      default: 0x000000
    },
    backgroundAlpha: {
      type: Number,
      default: 1
    },
    clearBeforeRender: {
      type: Boolean,
      default: true
    },
    powerPreference: String,
    sharedLoader: {
      type: Boolean,
      default: false
    },
    sharedTicker: {
      type: Boolean,
      default: false
    },
    resizeTo: {
      type: Object,
      validator: value => value instanceof Window || value instanceof HTMLElement
    }
  },
  provide (): { app: IApplication } {
    return {
      app: this.application
    }
  },
  data (): { application: IApplication } {
    return {
      application: {
        instance: null,
        EventBus: new Vue(),
        isReady: false
      }
    }
  },
  computed: {
    instance (): PIXI.Container {
      return (this.application.instance as PIXI.Application).stage
    },
    renderer (): PIXI.Renderer | PIXI.AbstractRenderer {
      return (this.application.instance as PIXI.Application).renderer
    }
  },
  render (h: CreateElement): VNode {
    return h('canvas', {
      attrs: {
        id: this.canvasId
      }
    }, this.$slots.default)
  },

  beforeDestroy (): void {
    this.instance.removeAllListeners() // remove all event listeners
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.application.instance!.destroy(true)
  },

  created (): void {
    if (this.skipHello) {
      window.PIXI.utils.skipHello()
    }
  },

  mounted (): void {
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement

    this.application.instance = new window.PIXI.Application({
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
  },
  methods: {
    initProps (): void {
      if (this.interactive) {
        this.instance.interactive = this.interactive
      }
    },
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
  },
  watch: {
    width (val: number): void {
      this.renderer.resize(val, this.height)
    },

    height (val: number): void {
      this.renderer.resize(this.width, val)
    },

    backgroundColor (val: number): void {
      this.renderer.backgroundColor = val
    },

    resolution (val: number): void {
      this.renderer.resolution = val
    }

    // backgroundAlpha (val: number): void {
    //   this.renderer.backgroundAlpha = val
    // }
  }
})
export default PApplication
