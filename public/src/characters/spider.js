define(['phaser', 'characters/enemy'], function(Phaser, Enemy) {
  function Spider (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'spider')
    if (!game.editing) {
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
