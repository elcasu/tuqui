define(['map-elements/map-element'], function(MapElement) {
  function PlatformShort (x, y, data) {
    MapElement.call(this, x, y, 'platformShort')
    if (data && data.scale) {
      this.scale.setTo(data.scale[0], data.scale[1])
    }
  }

  PlatformShort.prototype = Object.create(MapElement.prototype)
  PlatformShort.prototype.constructor = PlatformShort

  return PlatformShort
})
