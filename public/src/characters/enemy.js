function Enemy (game, x, y, name) {
  Phaser.Sprite.call(this, game, x, y, name)
  if (!game.editing) {
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.anchor.set(0.5, 0.5)
    this.speed = Enemy.SPEED
    this.resistance = Enemy.RESISTANCE
    this.body.velocity.x = this.speed
  }
}

Enemy.SPEED = 100
Enemy.RESISTANCE = 2

Enemy.prototype = Object.create(Phaser.Sprite.prototype)
Enemy.prototype.constructor = Enemy

Enemy.prototype.update = function () {
  if (this.game.editing) return
  if (this.body.enable && (this.body.touching.right || this.body.blocked.right)) {
    this.body.velocity.x = -Enemy.SPEED
    this.scale.x *= -1
  }
  else if (this.body.enable && (this.body.touching.left || this.body.blocked.left)) {
    this.body.velocity.x = Enemy.SPEED
    this.scale.x *= -1
  }
}

Enemy.prototype._spawnDeath = function () {
  this.visible = false
  const puff = this.game.add.sprite(this.position.x, this.position.y, 'puff')
  puff.anchor.set(0.5, 0.5)
  puff.animations.add('animate', [0, 1, 2, 3, 4, 5, 6, 7], 12, false)
  puff.animations.play('animate').onComplete.addOnce(function () {
    this.kill()
    puff.kill()
  }, this)
}

Enemy.prototype._spawnHit = function () {
  const time = 10000
  const originalTint = this.tint
  const hitColor = 0xdd0000
  this.game.time.events.repeat(100, 10, function () {
    this.tint = this.tint === hitColor ? originalTint : hitColor
  }, this)
}

Enemy.prototype.die = function () {
  if (this.game.editing) return
  this.body.enable = false
  this._spawnDeath()
}

Enemy.prototype.hit = function () {
  this.resistance--
  if (this.resistance > 0) {
    this._spawnHit()
  }
  else {
    this.die()
  }
}
