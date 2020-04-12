define(['map-elements/map-element'], function(MapElement) {
  function Gun (x, y) {
    MapElement.call(this, x, y, 'gun')
  }

  Gun.prototype = Object.create(MapElement.prototype)
  Gun.prototype.constructor = Gun

  return Gun
})
