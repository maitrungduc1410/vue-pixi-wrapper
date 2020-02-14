import { DisplayObject as PIXIDisplayObject } from 'pixi.js'
import { Vue, Prop, Inject, Watch, Component } from 'vue-property-decorator'

export default class DisplayObject extends Vue {
  @Prop() alpha!: number
  @Prop() cursor!: string
  @Prop() pivotX!: number
  @Prop() pivotY!: number
  @Prop() rotation!: number
  @Prop() scaleX!: number
  @Prop() scaleY!: number
  @Prop() skewX!: number
  @Prop() skewY!: number
  @Prop() visible!: boolean
  @Prop() x!: number
  @Prop() y!: number

  @Inject() readonly pixiObjects: any
  // @Provide() pixiObject = 123

  // provide () {
  //   const vm = this
  //   return { pixiObject: { get inst () { return vm.instance } } }
  // },

  get instance () {
    return new PIXIDisplayObject()
  }

  // beforeDestroy () {
  //   const { pixiObjects, instance, name } = this
  //   if (instance.parent) instance.parent.removeChild(instance)
  //   if (pixiObjects[name] === instance) delete pixiObjects[name]
  //   // vglNamespace.update();
  // }

  // @Watch('instance', { immediate: true })
  // onInstanceChange (newInstance: any, oldInstance: any) {
  //   if (oldInstance && oldInstance.parent) oldInstance.parent.removeChild(oldInstance)
  //   if (this.$parent.instance) this.$parent.instance.addChild(newInstance)
  //   if (this.x) newInstance.x = this.x
  //   if (this.y) newInstance.y = this.y
  //   if (this.alpha) newInstance.alpha = this.alpha
  //   if (this.cursor) newInstance.cursor = this.cursor
  //   if (this.rotation) newInstance.rotation = this.rotation
  //   if (this.visible) newInstance.visible = this.visible
  //   if (this.skewX || this.skewY) newInstance.skew.set(this.skewX || 1, this.skewY || 1)
  //   if (this.scaleX || this.scaleY) newInstance.scale.set(this.scaleX || 1, this.scaleY || 1)
  //   if (this.pivotX || this.pivotY) newInstance.pivot.set(this.pivotX || 1, this.pivotY || 1)
  //   if (this.name !== undefined) this.pixiObjects[this.name] = newInstance
  // }

  // @Watch('x')
  // onXChange (newVal: number, oldVal: number) {
  //   this.instance.x = newVal
  // }

  // watch: {
  //   '$parent.instance': function parentInstance (instance) { this.instance.setParent(instance) },
  //   'x': function (x) { this.instance.x = x },
  //   'y': function (y) { this.instance.y = y },
  //   'alpha': function (alpha) { this.instance.alpha = alpha },
  //   'cursor': function (cursor) { this.instance.cursor = cursor },
  //   'rotation': function (rotation) { this.instance.rotation = rotation },
  //   'visible': function (visible) { this.instance.visible = visible },
  //   'skewX': function (skewX) { this.instance.skew.x = skewX },
  //   'skewY': function (skewY) { this.instance.skew.y = skewY },
  //   'scaleX': function (scaleX) { this.instance.scale.x = scaleX },
  //   'scaleY': function (scaleY) { this.instance.scale.y = scaleY },
  //   'pivotX': function (pivotX) { this.instance.pivot.x = pivotX },
  //   'pivotY': function (pivotY) { this.instance.pivot.y = pivotY },
  //   'name' (newName, oldName) {
  //     const { pixiObjects, instance } = this
  //     if (pixiObjects[oldName] === instance) delete pixiObjects[oldName]
  //     pixiObjects[newName] = instance
  //   }
  // }
}
