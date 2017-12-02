function Stair (game, x, y, data) {
  Phaser.Sprite.call(this, game, x, y, 'stair')
  if (data && data.scale) {
    this.scale.setTo(data.scale[0], data.scale[1])
  }
  this.game.physics.enable(this)
  this.body.immovable = true
  this.body.allowGravity = false
}

Stair.prototype = Object.create(Phaser.Sprite.prototype)
Stair.prototype.constructor = Stair
