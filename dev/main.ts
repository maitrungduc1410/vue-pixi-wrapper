import Vue from 'vue'
import App from './App.vue'

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const PIXI = require('pixi.js')
  window.PIXI = PIXI
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
