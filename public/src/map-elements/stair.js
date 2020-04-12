define(['map-elements/map-element'], function(MapElement) {
  function Stair (x, y, data) {
    MapElement.call(this, x, y, 'stair')
    if (data && data.scale) {
      this.scale.setTo(data.scale[0], data.scale[1])
    }
  }

  Stair.prototype = Object.create(MapElement.prototype)
  Stair.prototype.constructor = Stair

  return Stair
})
