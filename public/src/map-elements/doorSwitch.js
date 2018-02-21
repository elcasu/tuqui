function DoorSwitch (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'doorSwitch')
  this.game.physics.enable(this)
  this.body.immovable = true
  this.body.allowGravity = false
  this.isOpen = false
  this.animations.add('close', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
  this.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
}

DoorSwitch.prototype = Object.create(Phaser.Sprite.prototype)
DoorSwitch.prototype.constructor = DoorSwitch

DoorSwitch.prototype.open = function () {
  this.isOpen = true
  this.animations.play('open')
}

DoorSwitch.prototype.close = function () {
  this.isOpen = false
  this.animations.play('close')
}
