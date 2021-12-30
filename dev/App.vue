<template>
  <div id="app">
    <p-application>
      <p-nine-slice-plane
        :src="'https://pixijs.io/examples/examples/assets/bg_grass.jpg'"
      >
      </p-nine-slice-plane>
    </p-application>
  </div>
</template>

<script>
import { PApplication, PNineSlicePlane } from '@/'

export default {
  components: {
    PApplication,
    PNineSlicePlane
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
