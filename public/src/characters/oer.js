function Oer (game, x, y) {
  Enemy.call(this, game, x, y, 'oer')
  if (!game.editing) {
    this.animations.add('move', [0, 1, 2], 5, true)
    this.animations.add('die', [0]) // TODO: add die animation
    this.animations.play('move')
  }
}

Oer.prototype = Object.create(Enemy.prototype)
Oer.prototype.constructor = Oer
