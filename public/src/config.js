require.config({
  baseUrl: './src',
  paths: {
    states: './states',
    phaser: '../lib/phaser',
    modules: './modules',
    mapElements: './map-elements',
    characters: './characters'
  },
  shim: {
    'phaser': {
      exports: 'Phaser'
    }
  }
})

require([
  'constants',
  'phaser',
  'states/play',
  'states/load',
], function(constants, Phaser, PlayState, LoadingState) {
  let game = new Phaser.Game(
    constants.WINDOW_WIDTH,
    constants.WINDOW_HEIGHT,
    Phaser.CANVAS,
    ''
  )
  game.state.add('play', PlayState)
  game.state.add('load', LoadingState)
  game.state.start('load')
})
