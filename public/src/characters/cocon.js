function Cocon (game, x, y) {
  Enemy.call(this, game, x, y, 'cocon')
  if (!game.editing) {
    this.animations.add('move', [0, 1], 5, true)
    this.animations.add('die', [0]) // TODO: add die animation
    this.animations.play('move')
    this.body.velocity.x = -this.speed
  }
}

Cocon.prototype = Object.create(Enemy.prototype)
Cocon.prototype.constructor = Cocon
