define(['phaser', 'constants'], function(Phaser, constants) {
  let _instance = null
  const _gameModes = {
    PLAY: 'play',
    EDITOR: 'editor'
  }
  let _gameMode = _gameModes.PLAY

  return {
    gameMode: _gameMode,
    gameModes: _gameModes,
    getInstance: function() {
      _instance = _instance || new Phaser.Game(
        constants.WINDOW_WIDTH,
        constants.WINDOW_HEIGHT,
        Phaser.CANVAS,
        ''
      )
      return _instance
    },
    setGamemode: function(mode) {
      if (!_gameModes.includes(mode)) {
        throw new Error('invalid gamemode')
      }
    },

    isPlaying: function() {
      return _gameMode === _gameModes.PLAY
    },

    isEditing: function() {
      return _gameMode === _gameModes.EDITOR
    }
  }
})
