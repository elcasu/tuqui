define(['phaser'], function(Phaser) {
  function MalignChair (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'malignChair')
    this.game.physics.enable(this)
    this.body.immovable = true
    this.body.allowGravity = false
  }

  MalignChair.prototype = Object.create(Phaser.Sprite.prototype)
  MalignChair.prototype.constructor = MalignChair

  return MalignChair
})
