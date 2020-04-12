define(['map-elements/map-element'], function(MapElement) {
  function Bullet (x, y) {
    MapElement.call(this, x, y, 'bullet')
    this.anchor.set(0.5, 0.5)
  }

  Bullet.SPEED = 500

  Bullet.prototype = Object.create(MapElement.prototype)
  Bullet.prototype.constructor = Bullet

  Bullet.prototype.shoot = function (direction) {
    this.body.velocity.x = direction * Bullet.SPEED
    this.scale.x = direction
  }

  return Bullet
})
