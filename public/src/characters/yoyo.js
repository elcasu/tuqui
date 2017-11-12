function Yoyo (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'yoyo')
  if (!game.editing) {
    this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
    this.animations.add('die', [0]) // TODO: add die animation
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.body.velocity.x = Yoyo.SPEED
    this.animations.play('move')
  }
}

Yoyo.SPEED = 100

Yoyo.prototype = Object.create(Phaser.Sprite.prototype)
Yoyo.prototype.constructor = Yoyo

Yoyo.prototype.update = function () {
  if (this.game.editing) return
  if (this.body.touching.right || this.body.blocked.right) {
    this.body.velocity.x = -Yoyo.SPEED
  }
  else if (this.body.touching.left || this.body.blocked.left) {
    this.body.velocity.x = Yoyo.SPEED
  }
}

Yoyo.prototype.die = function () {
  if (this.game.editing) return
  this.body.enable = false
  this.animations.play('die').onComplete.addOnce(function () {
    this.kill()
  }, this)
}
