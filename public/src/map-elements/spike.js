define([
  'modules/game',
  'map-elements/map-element'
], function(Game, MapElement) {
  function Spike (x, y) {
    const game = Game.getInstance()
    MapElement.call(this, x, y, 'spikes')
    if (Game.isPlaying()) {
      game.physics.enable(this)
      this.body.collideWorldBounds = true
      this.animations.add('move', [0, 1], 5, true)
      this.animations.play('move')
    }
  }

  Spike.prototype = Object.create(MapElement.prototype)
  Spike.prototype.constructor = Spike

  return Spike
})
