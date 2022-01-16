import Vue, { PropType } from 'vue'
import { eventHandlers, READY_EVENT } from '../constants'

const PDisplayObject = Vue.extend({
  props: {
    events: { type: Array as PropType<string[]>, default: () => { return [] } },
    shouldRender: { type: Boolean, default: true },
    alpha: { type: Number, default: 1 },
    angle: { type: Number, default: 0 },
    buttonMode: { type: Boolean, default: false },
    cacheAsBitmap: { type: Boolean, default: false },
    cursor: {
      type: String,
      validator: value => ['help', 'wait', 'crosshair', 'not-allowed', 'zoom-in', 'grab', undefined].includes(value)
    },
    filterArea: {
      type: Object as PropType<PIXI.Rectangle>,
      validator: value => value instanceof PIXI.Rectangle
    },
    filters: {
      type: Array as PropType<PIXI.Filter[]>,
      validator: value => Array.isArray(value)
    },
    hitArea: { default: null },
    interactive: { type: Boolean, default: false },
    isMask: { type: Boolean, default: false },
    isSprite: { type: Boolean, default: false },
    mask: {
      type: Object as PropType<PIXI.Container | PIXI.MaskData>,
      validator: value => value instanceof PIXI.Container || value instanceof PIXI.MaskData
    },
    name: { type: String },
    pivotX: { type: Number, default: 0 },
    pivotY: { type: Number, default: 0 },
    renderable: { type: Boolean, default: true },
    rotation: { type: Number, default: 0 },
    scaleX: { type: Number, default: 1 },
    scaleY: { type: Number, default: 1 },
    skewX: { type: Number, default: 0 },
    skewY: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    zIndex: { type: Number, default: 0 }
  },
  inject: ['app'],
  data (): { pDisplayObject: PIXI.DisplayObject } {
    return {
      pDisplayObject: new window.PIXI.DisplayObject()
    }
  },
  computed: {
    instance (): PIXI.DisplayObject {
      return this.pDisplayObject
    }
  },
  beforeDestroy (): void {
    this.pDisplayObject && this.pDisplayObject.destroy()
  },
  created (): void {
    const self = this as any
    if (!self.app) {
      console.error('[RENDER ERROR]: You\'re trying to render component DisplayObject outside of a PIXI Application. All display objects (Container, Sprite,...) must be rendered within Application')
      this.$destroy()
      return
    }

    self.app.EventBus.$on(READY_EVENT, () => {
      this.addToParent()
      self.app.EventBus.$off(READY_EVENT) // remove this event listener as it may conflict with user's provide event
    })

    if (self.app.isReady) {
      this.addToParent()
    }
  },
  methods: {
    addToParent (): void {
      if (this.shouldRender) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { instance }: any = this.$parent
        instance.addChild(this.instance)
      }

      this.initProps()
      this.initEvents()
      this.$emit('ready', this.instance)
    },

    reinit (newVal: PIXI.DisplayObject): void {
      this.pDisplayObject && this.pDisplayObject.destroy()
      this.pDisplayObject = newVal
      this.addToParent()
    },

    initProps () {
      this.instance.alpha = this.alpha
      this.instance.angle = this.angle
      this.instance.buttonMode = this.buttonMode
      this.instance.cacheAsBitmap = this.cacheAsBitmap

      if (this.cursor) {
        this.instance.cursor = this.cursor
      }

      this.instance.interactive = this.interactive
      this.instance.isMask = this.isMask
      this.instance.isSprite = this.isSprite
      this.instance.pivot.x = this.pivotX
      this.instance.pivot.y = this.pivotY
      this.instance.renderable = this.renderable
      this.instance.rotation = this.rotation
      this.instance.scale.x = this.scaleX
      this.instance.scale.y = this.scaleY
      this.instance.skew.x = this.skewX
      this.instance.skew.y = this.skewY
      this.instance.visible = this.visible
      this.instance.x = this.x
      this.instance.y = this.y
      this.instance.zIndex = this.zIndex

      if (this.name) {
        this.instance.name = this.name
      }

      if (this.filters) {
        this.instance.filters = this.filters
      }

      if (this.mask) {
        this.instance.mask = this.mask
      }

      // TODO: filterArea, filters, hitArea
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
    alpha (newValue: number): void {
      this.instance.alpha = newValue
    },

    angle (newValue: number): void {
      this.instance.angle = newValue
    },

    buttonMode (newValue: boolean): void {
      this.instance.buttonMode = newValue
    },

    // @Watch('cacheAsBitmap')
    // onCacheAsBitmapChange (newValue: boolean): void {
    //   this.instance.cacheAsBitmap = newValue
    // },

    cursor (newValue: string): void {
      this.instance.cursor = newValue
    },

    interactive (newValue: boolean): void {
      this.instance.interactive = newValue
    },

    isMask (newValue: boolean): void {
      this.instance.isMask = newValue
    },

    isSprite (newValue: boolean): void {
      this.instance.isSprite = newValue
    },

    mask (newValue: PIXI.Container | PIXI.MaskData): void {
      this.instance.mask = newValue
    },

    pivotX (newValue: number): void {
      this.instance.pivot.x = newValue
    },

    pivotY (newValue: number): void {
      this.instance.pivot.y = newValue
    },

    renderable (newValue: boolean): void {
      this.instance.renderable = newValue
    },

    rotation (newValue: number): void {
      this.instance.rotation = newValue
    },

    scaleX (newValue: number): void {
      this.instance.scale.x = newValue
    },

    scaleY (newValue: number): void {
      this.instance.scale.y = newValue
    },

    skewX (newValue: number): void {
      this.instance.skew.x = newValue
    },

    skewY (newValue: number): void {
      this.instance.scale.y = newValue
    },

    visible (newValue: boolean): void {
      this.instance.visible = newValue
    },

    x (newValue: number): void {
      this.instance.x = newValue
    },

    y (newValue: number): void {
      this.instance.y = newValue
    },

    zIndex (newValue: number): void {
      this.instance.zIndex = newValue
    }
  }

  // TODO: watch on events change
})

export default PDisplayObject
