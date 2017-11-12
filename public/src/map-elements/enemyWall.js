function EnemyWall (game, x, y, data) {
  Phaser.Sprite.call(this, game, x, y, 'invisibleWall')
  this.game.physics.enable(this)
  this.body.immovable = true
  this.body.allowGravity = false
}

EnemyWall.prototype = Object.create(Phaser.Sprite.prototype)
EnemyWall.prototype.constructor = EnemyWall

