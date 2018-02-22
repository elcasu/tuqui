function Gun (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'gun')
  this.game.physics.enable(this)
  this.body.immovable = true
  this.body.allowGravity = false
}

Gun.prototype = Object.create(Phaser.Sprite.prototype)
Gun.prototype.constructor = Gun
