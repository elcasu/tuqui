define([
  'phaser',
  'constants',
  'modules/level-handler',
  'map-elements/ExitTube',
  'modules/game'
], function(Phaser, constants, levelHandler, ExitTube, Game) {
  const PlayState = {}
  const WIDTH = constants.WIDTH
  const HEIGHT = constants.HEIGHT
  const game = Game.getInstance()

  PlayState.init = function (data) {
    this.timers = []
    this.keys = this.game.input.keyboard.addKeys({
      left: Phaser.KeyCode.LEFT,
      right: Phaser.KeyCode.RIGHT,
      up: Phaser.KeyCode.UP,
      down: Phaser.KeyCode.DOWN,
      space: Phaser.KeyCode.SPACEBAR,
      a: Phaser.KeyCode.A,
      w: Phaser.KeyCode.W,
      s: Phaser.KeyCode.S,
      d: Phaser.KeyCode.D,
      e: Phaser.KeyCode.E
    })
    this.starsCount = 0
    this.hasKey = false
    this.currentLevel = data && data.level || 1
    this.lives = data && data.lives || 3
    this.coins = data && data.coins || 0
    this.hasKey = data && data.hasKey || false
    this.camera.x = 0
    this.camera.y = 0
  }

  PlayState.create = function () {
    this.game.world.setBounds(0, 0, WIDTH, HEIGHT)
    this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background')
    this.background.fixedToCamera = true

    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(1, 1);
    this.game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    // set up level
    const levelStr = 'level' + this.currentLevel
    let map = this.game.cache.getJSON(levelStr)
    levelHandler.loadMap(map, this)
    this.player = levelHandler.get('player').instance
    this.game.camera.follow(this.player, null, 0.1, 0.1)
    levelHandler.createStatusBar(this)
    if (!this.game.device.desktop) {
      this._spawnMobileControls()
    }

    // create door
    this.door = levelHandler.getGroup('doors').children[0]
    levelHandler.updateStatusBar(this)
    if (this.hasKey) {
      this.door.open()
    }

    // shoot handling
    this.keys.space.onDown.add(function () {
      this.player.shoot()
    }, this)
  }

  PlayState.update = function () {
    this._handleCollisions()
    this._handleInput()
  }

  // TODO: refactor this method, so each element handles
  // the collision behaviour by themselves
  PlayState._handleCollisions = function () {
    const _this = this
    this.game.physics.arcade.collide(
      levelHandler.get('player').instance,
      [
        levelHandler.getGroup('platforms'),
        levelHandler.getGroup('trickyPlatforms')
      ],
      function (p, t) {
        if (t.key === 'trickyPlatform') {
          t.startBreak(function (timeout) {
            _this.timers.push(timeout)
          })
        }
      }
    )
    this.game.physics.arcade.collide(
      levelHandler.get('player').instance,
      levelHandler.getGroup('slideDoors')
    )
    this.game.physics.arcade.collide(
      levelHandler.getGroup('enemies'),
      levelHandler.getGroup('slideDoors')
    )
    this.game.physics.arcade.collide(
      levelHandler.getGroup('enemies'),
      [
        levelHandler.getGroup('platforms'),
        levelHandler.getGroup('trickyPlatforms')
      ]
    )
    this.game.physics.arcade.collide(
      levelHandler.getGroup('enemies'),
      levelHandler.getGroup('enemyWalls')
    )

    this.game.physics.arcade.overlap(
      levelHandler.get('player').instance,
      [
        levelHandler.getGroup('enemies'),
        levelHandler.getGroup('deadlyObjects')
      ],
      function(p) {
        p.die(function () {
          // actions after player dies
          this.lives--
          if (this.lives === 0) {
            levelHandler.updateStatusBar(this)
            levelHandler.gameOver(this)
          }
          else {
            levelHandler.restart(this)
          }
        }, this)
      }, null, this)

    this.game.physics.arcade.overlap(
      this.player.bullets,
      levelHandler.getCollideables(this).children,
      function (b) {
        b.kill()
      }
    )

    this.game.physics.arcade.overlap(
      this.player.bullets,
      levelHandler.getGroup('enemies'),
      function (b, e) {
        b.kill()
        e.hit()
      }
    )

    // check overlapings
    this.game.physics.arcade.overlap(this.player, levelHandler.getGroup('items'), function(p, s) {
      switch (s.key) {
        case 'heart':
          this.lives++
          break
        case 'coin':
          this.coins++
          break
        case 'key':
          this.hasKey = true
          this.door.open()
          break
      }
      levelHandler.updateStatusBar(this)
      levelHandler.collectItem(s, this)
      s.kill()
    }, null, this)

    // check whenever the player overlaps door
    this.game.physics.arcade.overlap(this.player, levelHandler.getGroup('doors'), function(p, door) {
      const _this = this
      if (door.isOpen) {
        const tubeX = door.position.x + door.width
        const tubeY = door.position.y - 100
        this.exitTube = new ExitTube(tubeX, tubeY)
        this.game.add.existing(this.exitTube)
        this.player.destroy()
        this.exitTube.exit(function () {
          game.camera.fade(0, 500)
          game.camera.onFadeComplete.add(function() {
            levelHandler.levelUp(_this)
          });
        })
      }
    }, null, this)

  }

  PlayState._isTappingLeft = function () {
    if (!this.mobile) return
    const isLeft = this.mobile.left.input.pointerOver()
    return this.game.input.pointer1.isDown && isLeft
  }

  PlayState._isTappingRight = function () {
    if (!this.mobile) return
    const isRight = this.mobile.right.input.pointerOver()
    return this.game.input.pointer1.isDown && isRight
  }

  PlayState._handleAction = function () {
    const _this = this
    const player = levelHandler.get('player').instance
    const switches = levelHandler.getGroup('switches')
    // action over a switch
    this.game.physics.arcade.overlap(player, switches, function (player, sw) {
      // TODO: door instance should be defined within the level
      // this way, we could have multiple switches for multiple doors ;-)
      const slideDoor = levelHandler.getGroup('slideDoors').children[0]
      _this.timers.push(sw.action(slideDoor))
    })
  }

  PlayState._handleInput = function () {
    const player = levelHandler.get('player').instance
    if (!player.body) return
    if (this.keys.left.isDown || this._isTappingLeft() || this.keys.a.isDown) {
      player.move(-1)
    }
    else if (this.keys.right.isDown || this._isTappingRight() || this.keys.d.isDown) {
      player.move(1)
    }
    else {
      player.move(0)
    }

    // action buttons
    if (this.keys.e.isDown) {
      this._handleAction()
    }

    const stairs = levelHandler.getGroup('stairs')
    if (this.game.physics.arcade.overlap(player, stairs)) {
      if (this.keys.up.isDown) {
        player.climb(-1)
      }
      else if (this.keys.down.isDown) {
        player.climb(1)
      }
      else {
        player.climb(0)
      }
    }
    else {
      player.stopClimb()
      // handle jump
      const JUMP_HOLD = 200; // ms
      if (this.keys.up.downDuration(JUMP_HOLD) || this.keys.w.downDuration(JUMP_HOLD)) {
        // let didJump = player.jump()
        player.jump()
      }
      else {
        player.stopJumpBoost()
      }
    }
  }

  PlayState._spawnMobileControls = function () {
    const mobileControls = this.game.add.group()
    const cAlpha = 0.3

    // left control
    const c1 = this.game.add.graphics(0, 0)
    c1.beginFill(0, cAlpha)
    c1.drawCircle(this.game.width - 250, this.game.height - 100, 100)
    c1.endFill()
    const aLeft = new Phaser.Sprite(
      this.game,
      c1.graphicsData[0].shape.x - 25,
      c1.graphicsData[0].shape.y - 25,
      'mobileArrow',
      1
    )
    aLeft.inputEnabled = true

    // right control
    const c2 = this.game.add.graphics(0, 0)
    c2.beginFill(0, cAlpha)
    c2.drawCircle(this.game.width - 100, this.game.height - 100, 100)
    c2.endFill()
    const aRight = new Phaser.Sprite(
      this.game,
      c2.graphicsData[0].shape.x - 25,
      c2.graphicsData[0].shape.y - 25,
      'mobileArrow',
      2
    )
    aRight.inputEnabled = true

    // jump control
    const c3 = this.game.add.graphics(0, 0)
    c3.beginFill(0, cAlpha)
    c3.drawCircle(100, this.game.height - 100, 100)
    c3.endFill()
    const aJump = new Phaser.Sprite(
      this.game,
      c3.graphicsData[0].shape.x - 25,
      c3.graphicsData[0].shape.y - 25,
      'mobileArrow',
      0
    )
    aJump.inputEnabled = true

    this.mobile = {}
    this.mobile.left = aLeft
    this.mobile.right = aRight
    this.mobile.jump = aJump

    mobileControls.fixedToCamera = true
    mobileControls.add(c1)
    mobileControls.add(aLeft)
    mobileControls.add(c2)
    mobileControls.add(aRight)
    mobileControls.add(c3)
    mobileControls.add(aJump)
  }

  return PlayState
})
