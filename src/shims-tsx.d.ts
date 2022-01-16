import Vue, { VNode } from 'vue'
import * as PIXI from 'pixi.js'
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  interface Window { PIXI: typeof PIXI; }
}
