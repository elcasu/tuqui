function Platform (game, x, y, data) {
  const image = typeof data === 'object' ? data.image : 'platform'
  Phaser.Sprite.call(this, game, x, y, image)
  if (data && data.scale) {
    this.scale.setTo(data.scale[0], data.scale[1])
  }
  this.game.physics.enable(this)
  this.body.immovable = true
  this.body.allowGravity = false
}

Platform.prototype = Object.create(Phaser.Sprite.prototype)
Platform.prototype.constructor = Platform
