const PlayState = {}

PlayState.init = function (data) {
  this.keys = this.game.input.keyboard.addKeys({
    left: Phaser.KeyCode.LEFT,
    right: Phaser.KeyCode.RIGHT,
    up: Phaser.KeyCode.UP
  })
  this.starsCount = 0
  this.hasKey = false
  this.level = data && data.level || 1
  this.camera.x = 0
  this.camera.y = 0
}

PlayState.create = function () {
  const thisRef = this
  this.game.world.setBounds(0, 0, WIDTH, HEIGHT)
  this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background')
  this.background.fixedToCamera = true
  this._loadMap(this.game.cache.getJSON('level1'))
  this.player = levelHandler.get('player').instance
  this.game.camera.follow(this.player, null, 0.1, 0.1)
  this.game.input.onTap.add(function (e) {
  })
}

PlayState.update = function () {
  this.game.debug.text(`Device ratio: ${window.devicePixelRatio}`, 100, 100)
  this._handleCollisions()
  this._handleInput()
}

PlayState._handleCollisions = function () {
  this.game.physics.arcade.collide(
    levelHandler.get('player').instance,
    levelHandler.getGroup('platforms')
  )
  this.game.physics.arcade.collide(
    levelHandler.getGroup('enemies'),
    levelHandler.getGroup('platforms')
  )
  this.game.physics.arcade.collide(
    levelHandler.getGroup('enemies'),
    levelHandler.getGroup('enemyWalls')
  )

  this.game.physics.arcade.overlap(
    levelHandler.get('player').instance,
    levelHandler.getGroup('enemies'),
    function(p, e) {
      p.die()
    }, null, this)
  // check overlapings
  // this.game.physics.arcade.overlap(this.player, this.stars, function(p, s) {
  //   s.kill()
  // }, null, this)

  // this.game.physics.arcade.overlap(this.player, this.key, function(p, k) {
  //   k.kill()
  // }, null, this)
}

PlayState._isTappingLeft = function () {
  const LEFT = 0
  const isLeft = Math.floor(this.game.input.x / (WINDOW_WIDTH / 2)) === LEFT
  return this.game.input.pointer1.isDown && isLeft
}

PlayState._isTappingRight = function () {
  const RIGHT = 1
  const isRight = Math.floor(this.game.input.x / (WINDOW_WIDTH / 2)) === RIGHT
  return this.game.input.pointer1.isDown && isRight
}

PlayState._handleInput = function () {
  const player = levelHandler.get('player').instance
  if (this.keys.left.isDown || this._isTappingLeft()) {
    player.move(-1)
  }
  else if (this.keys.right.isDown || this._isTappingRight()) {
    player.move(1)
  }
  else {
    player.move(0)
  }

  // handle jump
  const JUMP_HOLD = 200; // ms
  if (this.keys.up.downDuration(JUMP_HOLD)) {
    let didJump = player.jump()
  }
  else {
    player.stopJumpBoost()
  }
}

PlayState._loadMap = function (map) {
  map.forEach(function (item) {
    levelHandler.createInstance(
      this.game,
      levelHandler.get(item.key),
      {
        position: item.position,
        isClonable: false,
        onStopDrag: this._stopDrag
      },
    )
  },this)
  this.game.physics.arcade.gravity.y = GRAVITY
}
