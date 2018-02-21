function DoorSwitch (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'doorSwitch')
  this.openTimeout = 10000   // 10 secs
  this.game.physics.enable(this)
  this.body.immovable = true
  this.body.allowGravity = false
  this.animations.add('on', [1])
  this.animations.add('off', [0])
  this.on = false
}

DoorSwitch.prototype = Object.create(Phaser.Sprite.prototype)
DoorSwitch.prototype.constructor = DoorSwitch

DoorSwitch.prototype.turnOn = function (door) {
  if (!this.on) {
    door.open()
    this.on = true
    this.animations.play('on')
    const _this = this
    setTimeout(function() {
      _this.turnOff(door)
    }, this.openTimeout)
  }
}

DoorSwitch.prototype.turnOff = function (door) {
  door.close()
  this.on = false
  this.animations.play('off')
}

DoorSwitch.prototype.action = function (door) {
  // TODO: `door` should be assigned to the switch
  // on the constructor somehow
  this.turnOn(door)
}
