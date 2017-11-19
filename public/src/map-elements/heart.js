function Heart (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'heart')
  this.game.physics.enable(this)
  this.body.immovable = true
  this.body.allowGravity = false
  this.animations.add('happy', [0], false)
  this.animations.add('sad', [1], false)
}

Heart.prototype = Object.create(Phaser.Sprite.prototype)
Heart.prototype.constructor = Heart
