import { VNode, CreateElement } from 'vue/types'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Container } from 'pixi.js'
import DisplayObject from './PDisplayObject'
import { mixins } from 'vue-class-component'

/**
 * A Container represents a collection of display objects.
 *
 * It is the base class of all display objects that act as a container for other objects (like Sprites).
 */
@Component
export default class PContainer extends mixins(DisplayObject) {
  @Prop({ type: Number }) readonly width?: number
  @Prop({ type: Number }) readonly height?: number
  @Prop({ type: Boolean, default: true }) readonly interactiveChildren!: boolean

  declare pDisplayObject: Container

  render (h: CreateElement): VNode | undefined {
    return this.$slots.default ? h('template', this.$slots.default) : undefined
  }

  override get instance (): Container {
    if (!this.pDisplayObject) {
      this.pDisplayObject = new Container()
    }

    return this.pDisplayObject
  }

  override created (): void {
    if (this.pDisplayObject) this.initExtraProps()
  }

  initExtraProps (): void {
    this.pDisplayObject.interactiveChildren = this.interactiveChildren

    if (this.width) {
      this.pDisplayObject.width = this.width
    }

    if (this.height) {
      this.pDisplayObject.height = this.height
    }
  }

  @Watch('width')
  onWidthChange (newValue: number): void {
    this.pDisplayObject.width = newValue
  }

  @Watch('height')
  onHeightChange (newValue: number): void {
    this.pDisplayObject.height = newValue
  }

  @Watch('interactiveChildren')
  onInteractiveChildrenChange (newValue: boolean): void {
    this.pDisplayObject.interactiveChildren = newValue
  }
}
