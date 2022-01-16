# Introduction

[![Npm version](https://img.shields.io/npm/v/vue-pixi-wrapper)](https://www.npmjs.com/package/vue-pixi-wrapper) [![License](https://img.shields.io/github/license/maitrungduc1410/vue-pixi-wrapper)](https://github.com/maitrungduc1410/vue-pixi-wrapper/blob/master/LICENSE) [![Download](https://img.shields.io/npm/dw/vue-pixi-wrapper)](https://www.npmjs.com/package/vue-pixi-wrapper) [![License](https://img.shields.io/github/stars/maitrungduc1410/vue-pixi-wrapper?style=social)](https://github.com/maitrungduc1410/vue-pixi-wrapper)

![Vue-pixi-wrapper](.gitbook/assets/group-1.png)

### About

Vue PIXI Wrapper is a wrapper library to create PIXI application using VueJS with all components are reactive \(auto re-render when data change\)

### Installation

```text
yarn install vue-pixi-wrapper
```

or

```text
npm install --save vue-pixi-wrapper
```

## Setup
### For normal Vue app
In your `main.js` add this:
```js
const PIXI = require('pixi.js');
window.PIXI = PIXI
```

### For Nuxt
First create folder `plugins` if you haven't done so, then create a file name `pixijs.js` under `plugins` with the following content:

```js
import * as PIXI from 'pixi.js';
global.PIXI = PIXI;
```
Next add this to `plugins` section in `nuxt.config.js`

```js
plugins: [
  { src: '~/plugins/pixijs', mode: 'client', ssr: false}
],
```
Now every time you write PIXI-related code, you need to wrap it under `<client-side>` because PIXI works only in client side
```html
<client-only>
  <p-application>
    ...
  </p-application>
</client-only>
```
## Documentation

Check our website: [https://maitrungduc.gitbook.io/vue-pixi-wrapper](https://maitrungduc.gitbook.io/vue-pixi-wrapper)

## ❤️Support

If this project is helpful, please give me a star on [Github](https://github.com/maitrungduc1410/vue-pixi-wrapper)

