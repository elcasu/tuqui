define(['map-elements/map-element'], function(MapElement) {
  function Coin (x, y) {
    MapElement.call(this, x, y, 'coin')
    this.animations.add('spin', [0, 1, 2, 3, 4, 5], 6, true)
    this.animations.play('spin')
  }

  Coin.prototype = Object.create(MapElement.prototype)
  Coin.prototype.constructor = Coin

  return Coin
})
