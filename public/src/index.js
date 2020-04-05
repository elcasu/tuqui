window.onload = function () {
  let game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.CANVAS, '')
  game.state.add('play', PlayState)
  game.state.add('load', LoadingState)
  game.state.start('load')
}
