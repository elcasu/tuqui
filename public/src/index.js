const WIDTH = window.outerWidth
const HEIGHT = window.innerHeight
const GRAVITY = 200

window.onload = function () {
  let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '')
  game.state.add('play', PlayState)
  game.state.add('load', LoadingState)
  game.state.start('load')
}
