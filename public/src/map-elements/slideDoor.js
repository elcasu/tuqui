define(['map-elements/map-element'], function(MapElement) {
  function SlideDoor (x, y) {
    MapElement.call(this, x, y, 'slideDoor')
    this.isOpen = false
    this.animations.add('close', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
    this.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  }

  SlideDoor.prototype = Object.create(MapElement.prototype)
  SlideDoor.prototype.constructor = SlideDoor

  SlideDoor.prototype.open = function () {
    this.isOpen = true
    this.animations.play('open')
    this.body.enable = false
  }

  SlideDoor.prototype.close = function () {
    this.isOpen = false
    this.body.enable = true
    this.animations.play('close')
  }

  return SlideDoor
})
