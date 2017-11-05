function Spider2 (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'spider2')
  this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 12, true)
  this.animations.add('die', [0]) // TODO: add die animation
  this.game.physics.enable(this)
  this.body.collideWorldBounds = true
  this.body.velocity.x = Spider2.SPEED
  this.animations.play('move')
}

Spider2.SPEED = 100

Spider2.prototype = Object.create(Phaser.Sprite.prototype)
Spider2.prototype.constructor = Spider2

Spider2.prototype.update = function () {
  if (this.body.touching.right || this.body.blocked.right) {
    this.body.velocity.x = -Spider2.SPEED
  }
  else if (this.body.touching.left || this.body.blocked.left) {
    this.body.velocity.x = Spider2.SPEED
  }
}
