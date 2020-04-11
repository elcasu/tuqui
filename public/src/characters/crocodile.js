define(['phaser', 'characters/enemy'], function(Phaser, Enemy) {
  function Crocodile (game, x, y) {
    Enemy.call(this, game, x, y, 'crocodile')
    if (!game.editing) {
      this.animations.add('move', [0, 1], 5, true)
      this.animations.add('die', [0]) // TODO: add die animation
      this.animations.play('move')
    }
  }

  Crocodile.prototype = Object.create(Enemy.prototype)
  Crocodile.prototype.constructor = Crocodile

  return Crocodile
})
