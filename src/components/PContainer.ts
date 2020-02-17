import { VNode, CreateElement } from 'vue/types'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Container } from 'pixi.js'
import DisplayObject from './PDisplayObject'
import { mixins } from 'vue-class-component'

@Component
export default class PContainer extends mixins(DisplayObject) {
  @Prop({ default: 0 }) readonly width!: number
  @Prop({ default: 0 }) readonly height!: number
  @Prop({ default: true }) readonly interactiveChildren!: boolean

  public pContainer: Container | undefined

  render (h: CreateElement): VNode | undefined {
    return this.$slots.default ? h('template', this.$slots.default) : undefined
  }

  get instance () {
    if (!this.pContainer) {
      this.pContainer = new Container()
      this.pContainer.width = this.width
      this.pContainer.height = this.height
      this.pContainer.interactiveChildren = this.interactiveChildren
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
