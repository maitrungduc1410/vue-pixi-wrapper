import {
  DisplayObject,
  Rectangle,
  Filter,
  IHitArea,
  Container,
  MaskData
} from 'pixi.js'
import { Vue, Prop, Watch, Component, Inject } from 'vue-property-decorator'
import { eventHandlers } from '../constants'

@Component
export default class PDisplayObject extends Vue {
  @Prop({ type: Array, default: () => { return [] } }) readonly events!: string[]
  @Prop({ type: Boolean, default: true }) readonly shouldRender!: boolean // sometimes you just want to create this object and don't want to render it on screen (Eg: use it as mask for other object)

  @Prop({ type: Number, default: 1 }) readonly alpha!: number
  @Prop({ type: Number, default: 0 }) readonly angle!: number
  @Prop({ type: Boolean, default: false }) readonly buttonMode!: boolean
  @Prop({ type: Boolean, default: false }) readonly cacheAsBitmap!: boolean
  @Prop() readonly cursor!: 'help' | 'wait' | 'crosshair' | 'not-allowed' | 'zoom-in' | 'grab' | null
  @Prop({ default: null }) readonly filterArea!: Rectangle | null
  @Prop() readonly filters!: Filter[]
  @Prop({ default: null }) readonly hitArea!: IHitArea | null
  @Prop({ type: Boolean, default: false }) readonly interactive!: boolean
  @Prop({ type: Boolean, default: false }) readonly isMask!: boolean
  @Prop({ type: Boolean, default: false }) readonly isSprite!: boolean
  // @Prop({ default: null }) readonly localTransform!: Matrix
  @Prop({ default: null }) readonly mask!: Container | MaskData
  @Prop() readonly name!: string | null
  @Prop({ type: Number, default: 0 }) readonly pivotX!: number
  @Prop({ type: Number, default: 0 }) readonly pivotY!: number
  @Prop({ type: Boolean, default: true }) readonly renderable!: boolean
  @Prop({ type: Number, default: 0 }) readonly rotation!: number
  @Prop({ type: Number, default: 1 }) readonly scaleX!: number
  @Prop({ type: Number, default: 1 }) readonly scaleY!: number
  @Prop({ type: Number, default: 0 }) readonly skewX!: number
  @Prop({ type: Number, default: 0 }) readonly skewY!: number
  @Prop({ type: Boolean, default: true }) readonly visible!: boolean
  @Prop({ type: Number, default: 0 }) readonly x!: number
  @Prop({ type: Number, default: 0 }) readonly y!: number
  @Prop({ type: Number, default: 0 }) readonly zIndex!: number

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Inject() readonly app: any

  public pDisplayObject: DisplayObject | undefined

  get instance () { // will be override by child
    if (!this.pDisplayObject) {
      this.pDisplayObject = new DisplayObject()
    }
    return this.pDisplayObject
  }

  beforeDestroy () {
    this.instance.removeAllListeners() // remove all event listeners
    this.instance.parent.removeChild(this.instance)
  }

  created () {
    if (!this.app) {
      console.error(`[RENDER ERROR]: You're trying to render component ${this.instance.constructor.name} outside of Application. All display objects (Container, Sprite,...) must be rendered within Application`)
      return
    }

    this.app.EventBus.$on('ready', () => {
      this.addToParent()
      this.app.EventBus.$off('ready') // remove this event listener as it may conflict with user's provide event
    })

    if (this.app.isReady) {
      this.addToParent()
    }
  }

  addToParent () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (this.shouldRender) {
      const { instance }: any = this.$parent
      instance.addChild(this.instance)
    }

    this.initProps()
    this.initEvents()
    this.$emit('ready', this.instance)
  }

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
  }

  initEvents () {
    for (const event of this.events) {
      const index = eventHandlers.findIndex(item => item === event)

      if (index === -1) {
        console.error(`[Even listener error]: There's no event listener for event name '${event}'`)
      } else {
        this.instance.on(event, (e: Event) => this.$emit(`on${event}`, e))
      }
    }
  }

  @Watch('alpha')
  onAlphaChange (newValue: number) {
    this.instance.alpha = newValue
  }

  @Watch('angle')
  onAngleChange (newValue: number) {
    this.instance.angle = newValue
  }

  @Watch('buttonMode')
  onButtonModeChange (newValue: boolean) {
    this.instance.buttonMode = newValue
  }

  // @Watch('cacheAsBitmap')
  // onCacheAsBitmapChange (newValue: boolean) {
  //   this.instance.cacheAsBitmap = newValue
  // }

  @Watch('cursor')
  onCursorChange (newValue: string) {
    this.instance.cursor = newValue
  }

  @Watch('interactive')
  onInteractiveChange (newValue: boolean) {
    this.instance.interactive = newValue
  }

  @Watch('isMask')
  onIsMaskChange (newValue: boolean) {
    this.instance.isMask = newValue
  }

  @Watch('isSprite')
  onIsSpriteChange (newValue: boolean) {
    this.instance.isSprite = newValue
  }

  @Watch('mask')
  onMaskChange (newValue: Container) {
    this.instance.mask = newValue
  }

  @Watch('pivotX')
  onPivotXChange (newValue: number) {
    this.instance.pivot.x = newValue
  }

  @Watch('pivotY')
  onPivotYChange (newValue: number) {
    this.instance.pivot.y = newValue
  }

  @Watch('renderable')
  onRenderableChange (newValue: boolean) {
    this.instance.renderable = newValue
  }

  @Watch('rotation')
  onRotationChange (newValue: number) {
    this.instance.rotation = newValue
  }

  @Watch('scaleX')
  onScaleXChange (newValue: number) {
    this.instance.scale.x = newValue
  }

  @Watch('scaleY')
  onScaleYChange (newValue: number) {
    this.instance.scale.y = newValue
  }

  @Watch('skewX')
  onSkewXChange (newValue: number) {
    this.instance.skew.x = newValue
  }

  @Watch('skewY')
  onSkewYChange (newValue: number) {
    this.instance.scale.y = newValue
  }

  @Watch('visible')
  onVisibleChange (newValue: boolean) {
    this.instance.visible = newValue
  }

  @Watch('x')
  onXChange (newValue: number) {
    this.instance.x = newValue
  }

  @Watch('y')
  onYChange (newValue: number) {
    this.instance.y = newValue
  }

  @Watch('zIndex')
  onZIndexChange (newValue: number) {
    this.instance.zIndex = newValue
  }

  // TODO: watch on events change
}
