function Player (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'player')
  if (!game.editing) {
    this.alive = true
    this.game.physics.arcade.enable(this)
    // this.body.bounce.y = 0.2
    this.body.gravity.y = 300
    this.body.collideWorldBounds = true
    this.animations.add('stop', [0])
    this.animations.add('jump', [0]) // TODO: make jump animation
    this.animations.add('fall', [0]) // TODO: make fall animation
    // this.animations.add('left', [0, 1, 2, 3], 6, true)
    this.animations.add('run', [0, 1, 2, 3], 6, true)
    this.animations.add('die', [4, 5, 6, 7, 8], 10, false)
    this.anchor.setTo(.5,.5)
  }
}

Player.prototype = Object.create(Phaser.Sprite.prototype)
Player.prototype.constructor = Player

Player.prototype.move = function (direction) {
  const SPEED = 200
  this.scale.x = direction || 1
  this.body.velocity.x = direction * SPEED
}

Player.prototype.jump = function () {
  const JUMP_SPEED = 350
  let canJump = this.body.touching.down && this.alive

  if (canJump || this.isBoosting) {
    this.body.velocity.y = -JUMP_SPEED
    this.isBoosting = true
  }
  return canJump;
}

Player.prototype.stopJumpBoost = function () {
  this.isBoosting = false
}

Player.prototype._getAnimationName = function () {
  let name = 'stop'
  if (!this.alive) {
    name = 'die'
  }
  else if (this.body.velocity.y < 0) {
    name = 'jump'
  }
  else if (this.body.velocity.y > 0 && !this.body.touching.down) {
    name = 'fall'
  }
  else if (this.body.velocity.x !== 0 && this.body.touching.down) {
    name = 'run'
  }
  return name
}

Player.prototype.die = function (cb) {
  this.alive = false
  this.body.enable = false
  this.animations.play('die').onComplete.addOnce(function () {
    this.kill()
    this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
      levelHandler.restart(this.game)
    }, this)
  }, this)
}

Player.prototype.update = function () {
  if (this.game.editing) return
  const animationName = this._getAnimationName()
  if (this.animations.name !== animationName) {
    this.animations.play(animationName)
  }
}
