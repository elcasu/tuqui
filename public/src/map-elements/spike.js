define(['phaser', 'characters/enemy'], function(Phaser, Enemy) {
  function Spike (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'spikes')
    if (!game.editing) {
      this.game.physics.enable(this)
      this.body.collideWorldBounds = true
      this.animations.add('move', [0, 1], 5, true)
      this.animations.play('move')
    }
  }

  Spike.prototype = Object.create(Enemy.prototype)
  Spike.prototype.constructor = Spike

  return Spike
})
