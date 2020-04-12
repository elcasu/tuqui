define(['characters/enemy', 'modules/game'], function(Enemy, Game) {
  function Crocodile (x, y) {
    Enemy.call(this, x, y, 'crocodile')
    if (Game.isPlaying()) {
      this.animations.add('move', [0, 1], 5, true)
      this.animations.add('die', [0]) // TODO: add die animation
      this.animations.play('move')
    }
  }

  Crocodile.prototype = Object.create(Enemy.prototype)
  Crocodile.prototype.constructor = Crocodile

  return Crocodile
})
