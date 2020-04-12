define(['map-elements/map-element'], function(MapElement) {
  function Key (x, y) {
    MapElement.call(this, x, y, 'key')
    this.animations.add('active', [0], false)
    this.animations.add('inactive', [1], false)
  }

  Key.prototype = Object.create(MapElement.prototype)
  Key.prototype.constructor = Key

  return Key
})
