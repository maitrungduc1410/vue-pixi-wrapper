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
  @Prop({ default: true }) readonly interactiveChildren!: boolean

  public pContainer: Container | undefined

  render (h: CreateElement): VNode | undefined {
    return this.$slots.default ? h('template', this.$slots.default) : undefined
  }

  get instance () {
    if (!this.pContainer) {
      this.pContainer = new Container()
      this.pContainer.interactiveChildren = this.interactiveChildren

      if (this.width) {
        this.pContainer.width = this.width
      }

      if (this.height) {
        this.pContainer.height = this.height
      }
    }

    return this.pContainer
  }

  @Watch('width')
  onWidthChange (newValue: number) {
    (this.instance as Container).width = newValue
  }

  @Watch('height')
  onHeightChange (newValue: number) {
    (this.instance as Container).height = newValue
  }

  @Watch('interactiveChildren')
  onInteractiveChildrenChange (newValue: boolean) {
    (this.instance as Container).interactiveChildren = newValue
  }
}
