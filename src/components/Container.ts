import { VNode, CreateElement } from 'vue/types'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Container as PIXIContainer, Sprite } from 'pixi.js'

@Component
export default class Container extends Vue {
  @Prop() readonly width!: number
  @Prop() readonly h!: number
  @Prop() readonly backgroundColor?: number

  render (h: CreateElement): VNode { return h() }

  mounted () {
    const container = new Sprite()

    // You should probably use computed properties to set the position instead.
    container.x = 0
    container.y = 0

    // this.$parent.
  }
}
