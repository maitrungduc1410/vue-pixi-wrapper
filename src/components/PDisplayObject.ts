import {
  DisplayObject,
  Rectangle,
  Filter,
  IHitArea,
  Container,
  MaskData
} from 'pixi.js'
import { Vue, Prop, Watch, Component, Inject } from 'vue-property-decorator'

@Component
export default class PDisplayObject extends Vue {
  @Prop({ default: 1 }) readonly alpha!: number
  @Prop({ type: Number, default: 0 }) readonly angle!: number
  @Prop({ type: Boolean, default: false }) readonly buttonMode!: boolean
  @Prop({ type: Boolean, default: false }) readonly cacheAsBitmap!: boolean
  @Prop({ default: null }) readonly cursor!: 'help' | 'wait' | 'crosshair' | 'not-allowed' | 'zoom-in' | 'grab' | null
  @Prop({ default: null }) readonly filterArea!: Rectangle | null
  @Prop({ default: null }) readonly filters!: Filter | null
  @Prop({ default: null }) readonly hitArea!: IHitArea | null
  @Prop({ type: Boolean, default: false }) readonly interactive!: boolean
  @Prop({ type: Boolean, default: false }) readonly isMask!: boolean
  @Prop({ type: Boolean, default: false }) readonly isSprite!: boolean
  // @Prop({ default: null }) readonly localTransform!: Matrix
  @Prop({ default: null }) readonly mask!: Container | MaskData
  @Prop({ default: null }) readonly name!: string | null
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

  @Inject() readonly app: any

  get instance () {
    return new DisplayObject()
  }

  beforeDestroy () {
    this.instance.parent.removeChild(this.instance)
  }

  created () {
    this.app.EventBus.$on('ready', () => {
      this.addToParent()
      this.app.EventBus.$off('ready') // remove this event listener as it may conflict with user's provide event
    })

    if (this.app.isReady) {
      this.addToParent()
    }
  }

  addToParent () {
    const { instance }: any = this.$parent
    instance.addChild(this.instance)

    this.instance.x = this.x
    this.instance.y = this.y

    // TODO: check if user declare display Object outsite of application
  }

  @Watch('alpha')
  onAlphaChange (newValue: number) {
    this.instance.alpha = newValue
  }

  @Watch('cursor')
  onCursorChange (newValue: string) {
    this.instance.cursor = newValue
  }

  @Watch('pivotX')
  onPivotXChange (newValue: number) {
    this.instance.pivot.x = newValue
  }

  @Watch('pivotY')
  onPivotYChange (newValue: number) {
    this.instance.pivot.y = newValue
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

  @Watch('interactive')
  onInteractiveChange (newValue: boolean) {
    this.instance.interactive = newValue
  }
}
