import PContainer from './PContainer'

/**
 * The ParticleContainer class is a really fast version of the Container built solely for speed, so use when you need a lot of sprites or particles.
 *
 */
const PParticleContainer = PContainer.extend({
  props: {
    maxSize: { type: Number, default: 1500 },
    properties: Object,
    batchSize: { type: Number, default: 16384 },
    autoResize: { type: Boolean, default: false }
  },
  data (): { pDisplayObject: PIXI.ParticleContainer | null } {
    return {
      pDisplayObject: null
    }
  },
  computed: {
    instance (): PIXI.ParticleContainer {
      if (!this.pDisplayObject) {
        this.pDisplayObject = new window.PIXI.ParticleContainer(this.maxSize, this.properties, this.batchSize, this.autoResize)
      }
      return this.pDisplayObject
    }
  },
  watch: {
    autoResize (newValue: boolean): void {
      this.pDisplayObject.autoResize = newValue
    },
    properties: {
      handler: function (newValue: any) {
        this.pDisplayObject.setProperties(newValue)
      },
      deep: true
    }
  }
})

export default PParticleContainer
