require.config({
  baseUrl: './src',
  paths: {
    states: './states',
    phaser: '../lib/phaser',
    modules: './modules',
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
  'modules/game'
], function(constants, Phaser, PlayState, LoadingState, Game) {
  const game = Game.getInstance()
  game.state.add('play', PlayState)
  game.state.add('load', LoadingState)
  game.state.start('load')
})
