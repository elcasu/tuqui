define(['characters/enemy', 'modules/game'], function(Enemy, Game) {
  function Grunion (x, y) {
    Enemy.call(this, x, y, 'grunion')
    if (Game.isPlaying()) {
      this.game.physics.enable(this)
      this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
      this.animations.add('die', [0]) // TODO: add die animation
      this.animations.play('move')
      this.resistance = 5
    }
  }

  Grunion.prototype = Object.create(Enemy.prototype)
  Grunion.prototype.constructor = Grunion

  return Grunion
})
