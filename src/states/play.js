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
}

PlayState.create = function () {
  this.game.stage.backgroundColor = 0x3ac0f4
  this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
  this._loadLevel(this.game.cache.getJSON('level:1'))
}

PlayState.update = function () {
  this._handleCollisions()
  this._handleInput()
}

PlayState._handleCollisions = function () {
  this.game.physics.arcade.collide(this.player, this.platforms)
  this.game.physics.arcade.collide(this.enemies, this.platforms)
  this.game.physics.arcade.collide(this.enemies, this.enemyWalls)

  // check overlapings
  this.game.physics.arcade.overlap(this.player, this.stars, function(p, s) {
    s.kill()
  }, null, this)

  this.game.physics.arcade.overlap(this.player, this.key, function(p, k) {
    k.kill()
  }, null, this)

  this.game.physics.arcade.overlap(this.player, this.enemies.children, function(p, e) {
    p.die()
  }, null, this)
}

PlayState._handleInput = function () {
  if (this.keys.left.isDown) {
    this.player.move(-1);
  }
  else if (this.keys.right.isDown) {
    this.player.move(1);
  }
  else {
    this.player.move(0);
  }

  // handle jump
  const JUMP_HOLD = 200; // ms
  if (this.keys.up.downDuration(JUMP_HOLD)) {
    let didJump = this.player.jump()
  }
  else {
    this.player.stopJumpBoost();
  }
}

PlayState._loadLevel = function (data) {
  const stars = this.game.add.group()
  stars.enableBody = true
  this.stars = stars
  enemyWalls = this.game.add.group()
  enemyWalls.enableBody = true
  enemyWalls.visible = false
  this.enemyWalls = enemyWalls
  const platforms = this.game.add.group()
  platforms.enableBody = true
  data.platforms.forEach(function (platform) {
    let x = platform.x < 0 ? WIDTH + platform.x : platform.x
    let y = platform.y < 0 ? HEIGHT + platform.y : platform.y
    let p
    if (platform.image === 'invisibleWall') {
      p = enemyWalls.create(x, y, platform.image)
    }
    else {
      p = platforms.create(x, y, platform.image)
    }
    if (platform.scale) {
      p.scale.setTo(platform.scale[0], platform.scale[1])
    }
    p.body.immovable = true
    p.body.allowGravity = false
  })
  this.platforms = platforms

  // TODO: load from json!
  for(let i = 0; i < 10; i++) {
    const star = stars.create(
      WIDTH - 50 * i,
      HEIGHT - 250,
      'star'
    )
    star.body.allowGravity = false
  }

  // clouds and background stuff
  // TODO: load from json!
  const clouds = this.game.add.group()
  let cl1 = clouds.create(800, 100, 'cloud1')
  let cl2 = clouds.create(500, 50, 'cloud2')

  // level key
  // TODO: load from json!
  const key = this.game.add.sprite(10, HEIGHT - 270, 'key')
  this.game.physics.arcade.enable(key)
  key.body.allowGravity = false
  this.key = key

  // Load player
  // TODO: load from json!
  this.player = new Player(this.game, 10, HEIGHT - 150)
  this.game.add.existing(this.player)

  // ------------ Load enemies ------------
  // TODO: load from json!
  this.enemies = this.game.add.group()

  // Spiders
  this.spiders = this.game.add.group()
  this.spiders.add(new Spider(this.game, 100, HEIGHT - 300))
  this.enemies.add(this.spiders)

  // Spiders 2
  this.spiders2 = this.game.add.group()
  this.spiders2.add(new Spider2(this.game, 100, HEIGHT - 100))
  this.enemies.add(this.spiders2)

  // Lil ships
  this.lilShips = this.game.add.group()
  this.lilShips.add(new LilShip(this.game, WIDTH - 50, HEIGHT - 250))
  this.enemies.add(this.lilShips)

  // Yoyo
  this.yoyo = this.game.add.group()
  this.yoyo.add(new Yoyo(this.game, WIDTH - 50, HEIGHT - 200))
  this.enemies.add(this.yoyo)

  // Grunion
  this.grunion = this.game.add.group()
  this.grunion.add(new Grunion(this.game, WIDTH - 50, 100))
  this.enemies.add(this.grunion)

  // enable gravity
  this.game.physics.arcade.gravity.y = GRAVITY
}
