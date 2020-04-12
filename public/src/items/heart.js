define(['map-elements/map-element'], function(MapElement) {
  function Heart (x, y) {
    MapElement.call(this, x, y, 'heart')
    this.animations.add('happy', [0], false)
    this.animations.add('sad', [1], false)
  }

  Heart.prototype = Object.create(MapElement.prototype)
  Heart.prototype.constructor = Heart

  return Heart
})
