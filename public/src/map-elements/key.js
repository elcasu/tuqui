function Key (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'key')
  this.game.physics.enable(this)
  this.body.immovable = true
  this.body.allowGravity = false
  this.animations.add('active', [0], false)
  this.animations.add('inactive', [1], false)
}

Key.prototype = Object.create(Phaser.Sprite.prototype)
Key.prototype.constructor = Key
