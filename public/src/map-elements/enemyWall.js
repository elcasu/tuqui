function EnemyWall (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'invisibleWall')
  this.game.physics.enable(this)
  this.body.immovable = true
  this.body.allowGravity = false
  if (!game.editing) {
    this.alpha = 0
  }
}

EnemyWall.prototype = Object.create(Phaser.Sprite.prototype)
EnemyWall.prototype.constructor = EnemyWall

