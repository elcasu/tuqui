define(['characters/enemy', 'modules/game'], function(Enemy, Game) {
  function Squarebot (x, y) {
    Enemy.call(this, x, y, 'squarebot')
    if (Game.isPlaying()) {
      this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 5, true)
      this.animations.add('die', [0]) // TODO: add die animation
      this.animations.play('move')
    }
  }

  Squarebot.prototype = Object.create(Enemy.prototype)
  Squarebot.prototype.constructor = Squarebot

  return Squarebot
})
