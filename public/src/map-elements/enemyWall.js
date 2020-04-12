define(['map-elements/map-element'], function(MapElement) {
  function EnemyWall (x, y, editing = false) {
    MapElement.call(this, x, y, 'invisibleWall')
    this.game.physics.enable(this)
    this.body.immovable = true
    this.body.allowGravity = false
    if (!editing) {
      this.alpha = 0
    }
  }

  EnemyWall.prototype = Object.create(MapElement.prototype)
  EnemyWall.prototype.constructor = EnemyWall

  return EnemyWall
})
