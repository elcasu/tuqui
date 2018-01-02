function Door (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'door')
  this.game.physics.enable(this)
  this.body.immovable = true
  this.body.allowGravity = false
  this.isOpen = false
  this.animations.add('closed', [0])
  this.animations.add('open', [1])
}

Door.prototype = Object.create(Phaser.Sprite.prototype)
Door.prototype.constructor = Door

Door.prototype.open = function () {
  this.isOpen = true
  this.animations.frame = 1
}
