define(['characters/enemy', 'modules/game'], function(Enemy, Game) {
  function Spider2 (x, y) {
    Enemy.call(this, x, y, 'spider2')
    if (Game.isPlaying()) {
      this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 12, true)
      this.animations.add('die', [0]) // TODO: add die animation
      this.game.physics.enable(this)
      this.body.collideWorldBounds = true
      this.body.velocity.x = Spider2.SPEED
      this.animations.play('move')
    }
  }

  Spider2.prototype = Object.create(Enemy.prototype)
  Spider2.prototype.constructor = Spider2

  return Spider2
})
