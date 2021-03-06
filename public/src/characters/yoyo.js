define(['characters/enemy', 'modules/game'], function(Enemy, Game) {
  function Yoyo (x, y) {
    Enemy.call(this, x, y, 'yoyo')
    if (Game.isPlaying()) {
      this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
      this.animations.add('die', [0]) // TODO: add die animation
      this.animations.play('move')
    }
  }

  Yoyo.prototype = Object.create(Enemy.prototype)
  Yoyo.prototype.constructor = Yoyo

  return Yoyo
})
