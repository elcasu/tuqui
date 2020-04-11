define(['phaser', 'characters/enemy'], function(Phaser, Enemy) {
  function LilShip (game, x, y) {
    Enemy.call(this, game, x, y, 'lilShip')
    if (!game.editing) {
      this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
      this.animations.add('die', [0]) // TODO: add die animation
      this.animations.play('move')
    }
  }

  LilShip.prototype = Object.create(Enemy.prototype)
  LilShip.prototype.constructor = LilShip

  return LilShip
})
