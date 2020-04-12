define(['characters/enemy', 'modules/game'], function(Enemy, Game) {
  function Oer (x, y) {
    Enemy.call(this, x, y, 'oer')
    if (Game.isPlaying()) {
      this.animations.add('move', [0, 1, 2], 5, true)
      this.animations.add('die', [0]) // TODO: add die animation
      this.animations.play('move')
    }
  }

  Oer.prototype = Object.create(Enemy.prototype)
  Oer.prototype.constructor = Oer

  return Oer
})
