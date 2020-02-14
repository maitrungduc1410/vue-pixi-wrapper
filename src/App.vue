<template>
  <div id="app">
    <!-- <pixi-renderer
    @ready="ready"
    >
      <container
        :x="200" :y="400"
        @pointerdown="scaleObject"
      >
        <sprite :x="0" :y="0" imagePath="https://pixijs.io/examples/examples/assets/bunny.png"/>
      </container>
    </pixi-renderer> -->
    <Application
    >
      <Container />
    </Application>
  </div>
</template>

<script>
import Application from '@/components/Application'
import Container from '@/components/ContainerTest'

export default {
  components: {
    Application,
    Container
  },

  methods: {
    scaleObject (container) {
      container.scale.x *= 1.25
      container.scale.y *= 1.25
      console.log(123)
    },

    tickInfo (container, delta) {
      console.log(`Tick delta: ${delta}`)
    },
    ready () {
      console.log('READY')
    }
  }
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
