define(['characters/enemy', 'modules/game'], function(Enemy, Game) {
  function Spider (x, y) {
    Enemy.call(this, x, y, 'spider')
    if (Game.isPlaying()) {
      this.animations.add('move', [0, 1, 2], 6, true)
      this.animations.add('die', [0]) // TODO: add die animation
      this.game.physics.enable(this)
      this.body.collideWorldBounds = true
      this.body.velocity.x = Spider.SPEED
      this.animations.play('move')
    }
  }

  Spider.SPEED = 100;

  Spider.prototype = Object.create(Enemy.prototype)
  Spider.prototype.constructor = Spider

  return Spider
})
