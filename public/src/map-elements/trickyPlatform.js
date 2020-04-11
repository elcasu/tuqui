define(['phaser'], function(Phaser) {
  function TrickyPlatform (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'trickyPlatform')
    this.game.physics.enable(this)
    this.body.immovable = true
    this.body.allowGravity = false
    this.isBreaking = false
    if (!game.editing) {
      this.animations.add('break', [0, 1, 2, 3, 4, 5], 8, false)
      this.animations.add('restore', [3, 2, 1, 0], 8, false)
    }
  }

  TrickyPlatform.prototype = Object.create(Phaser.Sprite.prototype)
  TrickyPlatform.prototype.constructor = TrickyPlatform

  TrickyPlatform.prototype.startBreak = function (cb) {
    const _this = this
    this.isBreaking = true
    this.animations.play('break').onComplete.addOnce(function () {
      this.body.enable = false
      this.visible = false
      const timeout = setTimeout(function() {
        _this.visible = true
        _this.frame = 3
        _this.animations.play('restore').onComplete.addOnce(function () {
          _this.body.enable = true
        })
      }, 2000)
      cb(timeout)
    }, this)
  }

  return TrickyPlatform
})
