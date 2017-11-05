function Spider (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'spider')
  this.animations.add('move', [0, 1, 2], 6, true)
  this.animations.add('die', [0]) // TODO: add die animation
  this.game.physics.enable(this)
  this.body.collideWorldBounds = true
  this.body.velocity.x = Spider.SPEED
  this.animations.play('move')
}

Spider.SPEED = 100;

Spider.prototype = Object.create(Phaser.Sprite.prototype)
Spider.prototype.constructor = Spider

Spider.prototype.update = function () {
  if (this.body.touching.right || this.body.blocked.right) {
    this.body.velocity.x = -Spider.SPEED
  }
  else if (this.body.touching.left || this.body.blocked.left) {
    this.body.velocity.x = Spider.SPEED
  }
}

Spider.prototype.die = function () {
  this.body.enable = false
  this.animations.play('die').onComplete.addOnce(function () {
    this.kill()
  }, this)
}
