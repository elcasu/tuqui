define(['characters/enemy', 'modules/game'], function(Enemy, Game) {
  function Cocon (x, y) {
    Enemy.call(this, x, y, 'cocon')
    if (Game.isPlaying()) {
      this.animations.add('move', [0, 1], 5, true)
      this.animations.add('die', [0]) // TODO: add die animation
      this.animations.play('move')
      this.body.velocity.x = -this.speed
    }
  }

  Cocon.prototype = Object.create(Enemy.prototype)
  Cocon.prototype.constructor = Cocon

  return Cocon
})
