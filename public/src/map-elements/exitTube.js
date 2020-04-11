define(['phaser'], function(Phaser) {
  function ExitTube (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'exitTube')
    this.game.physics.enable(this)
    this.body.immovable = true
    this.body.allowGravity = false
    this.exiting = false
    const animFrames = []
    for (let i = 0; i < 12; i++) animFrames[i] = i
    this.animations.add('player-through', animFrames, 10, false)
  }

  ExitTube.prototype = Object.create(Phaser.Sprite.prototype)
  ExitTube.prototype.constructor = ExitTube

  ExitTube.prototype.exit = function (cb) {
    const game = this.game
    this.animations.play('player-through').onComplete.addOnce(function () {
      cb(game)
    }, this)
  }

  return ExitTube
})
