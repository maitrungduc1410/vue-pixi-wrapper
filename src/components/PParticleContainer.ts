import { Component, Prop } from 'vue-property-decorator'
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

/**
 * The ParticleContainer class is a really fast version of the Container built solely for speed, so use when you need a lot of sprites or particles.
 *
 */
@Component
export default class PParticleContainer extends mixins(PContainer) {
  @Prop({ type: Number, default: 1500 }) readonly maxSize?: number
  @Prop() readonly properties?: IProperties
  @Prop({ type: Number, default: 16384 }) readonly batchSize?: number
  @Prop({ type: Boolean, default: false }) readonly autoResize?: boolean

  public pParticleContainer: ParticleContainer | undefined

  get instance () {
    if (!this.pParticleContainer) {
      this.pParticleContainer = new ParticleContainer(this.maxSize, this.properties, this.batchSize, this.autoResize)
    }
    return this.pParticleContainer
  }
}
