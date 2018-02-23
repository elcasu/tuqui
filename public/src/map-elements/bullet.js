function Bullet (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'bullet')
  this.game.physics.enable(this)
  this.body.allowGravity = false
  this.anchor.set(0.5, 0.5)
}

Bullet.SPEED = 500

Bullet.prototype = Object.create(Phaser.Sprite.prototype)
Bullet.prototype.constructor = Bullet

Bullet.prototype.shoot = function (direction) {
  this.body.velocity.x = direction * Bullet.SPEED
  this.scale.x = direction
}
