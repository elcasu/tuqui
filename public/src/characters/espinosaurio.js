function Espinosaurio (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'espinosaurio')
  if (!game.editing) {
    this.animations.add('move', [0, 1, 2, 3], 8, true)
    this.animations.add('die', [0]) // TODO: add die animation
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.body.velocity.x = -Espinosaurio.SPEED
    this.anchor.set(0.5, 0.5)
    this.animations.play('move')
  }
}

Espinosaurio.SPEED = 100

Espinosaurio.prototype = Object.create(Phaser.Sprite.prototype)
Espinosaurio.prototype.constructor = Espinosaurio

Espinosaurio.prototype.update = function () {
  if (this.game.editing) return
  if (this.body.touching.right || this.body.blocked.right) {
    this.body.velocity.x = -Espinosaurio.SPEED
    this.scale.x *= -1
  }
  else if (this.body.touching.left || this.body.blocked.left) {
    this.body.velocity.x = Espinosaurio.SPEED
    this.scale.x *= -1
  }
}

Espinosaurio.prototype.die = function () {
  if (this.game.editing) return
  this.body.enable = false
  this.animations.play('die').onComplete.addOnce(function () {
    this.kill()
  }, this)
}
