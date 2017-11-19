function Coin (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coin')
  this.game.physics.enable(this)
  this.body.immovable = true
  this.body.allowGravity = false
  this.animations.add('spin', [0, 1, 2, 3, 4, 5], 6, true)
  if (!game.editing) {
    this.animations.play('spin')
  }
}

Coin.prototype = Object.create(Phaser.Sprite.prototype)
Coin.prototype.constructor = Coin
