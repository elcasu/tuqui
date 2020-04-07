function Espinosaurio (game, x, y) {
  Enemy.call(this, game, x, y, 'espinosaurio')
  if (!game.editing) {
    this.animations.add('move', [0, 1, 2, 3], 8, true)
    this.animations.add('die', [0]) // TODO: add die animation
    this.animations.play('move')
  }
}

Espinosaurio.prototype = Object.create(Enemy.prototype)
Espinosaurio.prototype.constructor = Espinosaurio
