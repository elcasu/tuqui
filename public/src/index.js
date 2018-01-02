const WIDTH = 10000
const HEIGHT = 2000
const WINDOW_WIDTH = window.outerWidth
const WINDOW_HEIGHT = window.innerHeight
const GRAVITY = 200

window.onload = function () {
  let game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.CANVAS, '')
  game.state.add('play', PlayState)
  game.state.add('load', LoadingState)
  game.state.start('load')
}
