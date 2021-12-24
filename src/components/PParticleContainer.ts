import { Component, Prop, Watch } from 'vue-property-decorator'
import { IParticleProperties, ParticleContainer } from 'pixi.js'
import PContainer from './PContainer'
import { mixins } from 'vue-class-component'

/**
 * The ParticleContainer class is a really fast version of the Container built solely for speed, so use when you need a lot of sprites or particles.
 *
 */
@Component
export default class PParticleContainer extends mixins(PContainer) {
  @Prop({ type: Number, default: 1500 }) readonly maxSize?: number
  @Prop({ type: Object }) readonly properties?: IParticleProperties
  @Prop({ type: Number, default: 16384 }) readonly batchSize?: number
  @Prop({ type: Boolean, default: false }) readonly autoResize?: boolean

  declare pDisplayObject: ParticleContainer

  override get instance (): ParticleContainer {
    if (!this.pDisplayObject) {
      this.pDisplayObject = new ParticleContainer(this.maxSize, this.properties, this.batchSize, this.autoResize)
    }
    return this.pDisplayObject
  }

  @Watch('autoResize')
  onMaxSizeChange (newValue: boolean): void {
    this.pDisplayObject.autoResize = newValue
  }

  @Watch('properties', { deep: true })
  onPropertiesChange (newValue: IParticleProperties): void {
    this.pDisplayObject.setProperties(newValue)
  }
}
