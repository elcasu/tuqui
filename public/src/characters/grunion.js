function Grunion (game, x, y) {
  Enemy.call(this, game, x, y, 'grunion')
  if (!game.editing) {
    this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
    this.animations.add('die', [0]) // TODO: add die animation
    this.animations.play('move')
    this.resistance = 5
  }
}

Grunion.prototype = Object.create(Enemy.prototype)
Grunion.prototype.constructor = Grunion
