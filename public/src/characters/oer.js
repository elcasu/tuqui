function Oer (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'oer')
  if (!game.editing) {
    this.animations.add('move', [0, 1, 2], 5, true)
    this.animations.add('die', [0]) // TODO: add die animation
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.body.velocity.x = Oer.SPEED
    this.anchor.set(0.5, 0.5)
    this.animations.play('move')
  }
}

Oer.SPEED = 100;

Oer.prototype = Object.create(Phaser.Sprite.prototype)
Oer.prototype.constructor = Oer

Oer.prototype.update = function () {
  if (this.game.editing) return
  if (this.body.touching.right || this.body.blocked.right) {
    this.body.velocity.x = -Oer.SPEED
    this.scale.x *= -1
  }
  else if (this.body.touching.left || this.body.blocked.left) {
    this.body.velocity.x = Oer.SPEED
    this.scale.x *= -1
  }
}

Oer.prototype.die = function () {
  if (this.game.editing) return
  this.body.enable = false
  this.animations.play('die').onComplete.addOnce(function () {
    this.kill()
  }, this)
}
