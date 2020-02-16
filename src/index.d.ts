import Vue from 'vue'

/**
 * An AnimatedSprite is a simple way to display an animation depicted by a list of textures
 *
 */
export class PAnimatedSprite extends Vue {}

/**
 * Convenience class to create a new PIXI application.
 *
 * This class automatically creates the renderer, ticker and root container.
 */
export class PApplication extends Vue {}

/**
 * A BitmapText object will create a line or multiple lines of text using bitmap font.
 *
 */
export class PBitmapText extends Vue {}

/**
 * A Container represents a collection of display objects.
 *
 * It is the base class of all display objects that act as a container for other objects (like Sprites).
 */
export class PContainer extends Vue {}

/**
 * The Graphics class contains methods used to draw primitive shapes such as lines, circles and rectangles to the display, and to color and fill them.
 *
 */
export class PGraphics extends Vue {}

/**
 * The ParticleContainer class is a really fast version of the Container built solely for speed, so use when you need a lot of sprites or particles.
 *
 */
export class PParticleContainer extends Vue {}

/**
 * A Text Object will create a line or multiple lines of text.
 *
 */
export class PText extends Vue {}

/**
 * A tiling sprite is a fast way of rendering a tiling image
 *
 */
export class PTilingSprite extends Vue {}
