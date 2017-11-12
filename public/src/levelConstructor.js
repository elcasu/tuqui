const WIDTH = window.outerWidth
const HEIGHT = window.innerHeight

window.onload = function () {
  let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '')
  game.state.add('load', LoadingState)
  game.state.add('constructLevel', ConstructLevelState)
  game.state.start('load', true, false, 'constructLevel')
}
