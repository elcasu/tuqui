define(['map-elements/map-element'], function(MapElement) {
  function Door (x, y) {
    MapElement.call(this, x, y, 'door')
    this.isOpen = false
    this.animations.add('closed', [0])
    this.animations.add('open', [1])
  }

  Door.prototype = Object.create(MapElement.prototype)
  Door.prototype.constructor = Door

  Door.prototype.open = function () {
    this.isOpen = true
    this.animations.frame = 1
  }

  return Door
})
