import { Component, Prop, Watch } from 'vue-property-decorator'
import { ParticleContainer } from 'pixi.js'
import PContainer from './PContainer'
import { mixins } from 'vue-class-component'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IProperties {
  vertices?: boolean | undefined;
  position?: boolean | undefined;
  rotation?: boolean | undefined;
  uvs?: boolean | undefined;
  tint?: boolean | undefined;
}

@Component
export default class PParticleContainer extends mixins(PContainer) {
  @Prop({ type: Number, default: 1500 }) readonly maxSize?: number
  @Prop() readonly properties?: IProperties
  @Prop({ type: Number, default: 16384 }) readonly batchSize?: number
  @Prop({ type: Boolean, default: false }) readonly autoResize?: boolean

  get instance () {
    return new ParticleContainer(this.maxSize, this.properties, this.batchSize, this.autoResize)
  }

  @Watch('autoResize')
  onAutoResizeChange (newValue: boolean) {
    this.instance.autoResize = newValue
  }
}
