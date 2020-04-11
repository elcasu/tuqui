define(['phaser'], function(Phaser) {
  function PlatformShort (game, x, y, data) {
    Phaser.Sprite.call(this, game, x, y, 'platformShort')
    if (data && data.scale) {
      this.scale.setTo(data.scale[0], data.scale[1])
    }
    this.game.physics.enable(this)
    this.body.immovable = true
    this.body.allowGravity = false
  }

  PlatformShort.prototype = Object.create(Phaser.Sprite.prototype)
  PlatformShort.prototype.constructor = PlatformShort

  return PlatformShort
})
