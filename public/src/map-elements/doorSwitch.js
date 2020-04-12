define(['map-elements/map-element'], function(MapElement) {
  function DoorSwitch (x, y) {
    MapElement.call(this, x, y, 'doorSwitch')
    this.openTimeout = 10000   // 10 secs
    this.animations.add('on', [1])
    this.animations.add('off', [0])
    this.on = false
  }

  DoorSwitch.prototype = Object.create(MapElement.prototype)
  DoorSwitch.prototype.constructor = DoorSwitch

  DoorSwitch.prototype.turnOn = function (door) {
    if (!this.on) {
      door.open()
      this.on = true
      this.animations.play('on')
      const _this = this
      return setTimeout(function() {
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
    return this.turnOn(door)
  }

  return DoorSwitch
})
