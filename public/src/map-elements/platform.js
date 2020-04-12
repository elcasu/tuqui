define(['map-elements/map-element'], function(MapElement) {
  function Platform (x, y, data) {
    const image = 'platform'
    MapElement.call(this, x, y, image)
    if (data && data.scale) {
      this.scale.setTo(data.scale[0], data.scale[1])
    }
  }

  Platform.prototype = Object.create(MapElement.prototype)
  Platform.prototype.constructor = Platform

  return Platform
})
