define(['characters/enemy', 'modules/game'], function(Enemy, Game) {
  function Espinosaurio (x, y) {
    Enemy.call(this, x, y, 'espinosaurio')
    if (Game.isPlaying()) {
      this.animations.add('move', [0, 1, 2, 3], 8, true)
      this.animations.add('die', [0]) // TODO: add die animation
      this.animations.play('move')
    }
  }

  Espinosaurio.prototype = Object.create(Enemy.prototype)
  Espinosaurio.prototype.constructor = Espinosaurio

  return Espinosaurio
})
