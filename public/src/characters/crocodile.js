function Crocodile (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'crocodile')
  if (!game.editing) {
    this.animations.add('move', [0, 1], 5, true)
    this.animations.add('die', [0]) // TODO: add die animation
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.body.velocity.x = Crocodile.SPEED
    this.anchor.set(0.5, 0.5)
    this.animations.play('move')
  }
}

Crocodile.SPEED = 100;

Crocodile.prototype = Object.create(Phaser.Sprite.prototype)
Crocodile.prototype.constructor = Crocodile

Crocodile.prototype.update = function () {
  if (this.game.editing) return
  if (this.body.touching.right || this.body.blocked.right) {
    this.body.velocity.x = -Crocodile.SPEED
    this.scale.x *= -1
  }
  else if (this.body.touching.left || this.body.blocked.left) {
    this.body.velocity.x = Crocodile.SPEED
    this.scale.x *= -1
  }
}

Crocodile.prototype.die = function () {
  if (this.game.editing) return
  this.body.enable = false
  this.animations.play('die').onComplete.addOnce(function () {
    this.kill()
  }, this)
}
