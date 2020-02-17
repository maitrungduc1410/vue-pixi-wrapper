# FAQ

## Can view PIXI devtool in Chrome developer tool window

Add this to your `main.js` file

```javascript
import * as PIXI from 'pixi.js'
window.PIXI = PIXI
// you may want to remove them in production
```



