const WIDTH = window.outerWidth
const HEIGHT = window.innerHeight
const GRAVITY = 300
let cursors
let controlKeys
let platforms
let enemyWalls
let player
let enemies
let eDir = 1
let key
let isDying = false

const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', {
  preload: function () {
    game.load.spritesheet('robot1', 'img/robot1.png', 84, 54)
    game.load.spritesheet('spider', 'img/spider.png', 72, 72)
    game.load.spritesheet('robot2', 'img/robot2.png', 48, 40)
    game.load.image('invisibleWall', 'img/invisibleWall.png')
    game.load.image('robot3', 'img/robot4.png')
    game.load.image('platform', 'img/platform.png')
    game.load.image('star', 'img/star.png')
    game.load.image('cloud1', 'img/cloud.png')
    game.load.image('cloud2', 'img/cloud2.png')
    game.load.image('key', 'img/key.png')

    game.load.json('level:1', 'data/level1.json')
  },
  create: function() {
    isDying = false
    game.stage.backgroundColor = 0x3ac0f4
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
    game.physics.startSystem(Phaser.Physics.ARCADE)
    loadLevel(this.game.cache.getJSON('level:1'))

    // clouds and background stuff
    const clouds = game.add.group()
    let cl1 = clouds.create(800, 100, 'cloud1')
    let cl2 = clouds.create(500, 50, 'cloud2')

    // stars
    stars = game.add.group()
    stars.enableBody = true
    for(let i = 0; i < 10; i++) {
      const star = stars.create(game.world.width - 50 * i, game.world.height - 250, 'star')
    }

    // level key
    key = game.add.sprite(10, game.world.height - 270, 'key')
    game.physics.arcade.enable(key)

    // player
    player = game.add.sprite(10, game.world.height - 150, 'robot1')
    game.physics.arcade.enable(player)
    player.body.bounce.y = 0.2
    player.body.gravity.y = GRAVITY
    player.body.collideWorldBounds = true
    player.animations.add('left', [0, 1, 2, 3], 6, true)
    player.animations.add('right', [0, 1, 2, 3], 6, true)
    player.animations.add('die', [4, 5, 6, 7, 8], 10, false)

    // enemy 1: Spider
    enemies = game.add.group()
    const spider = enemies.create(100, game.world.height - 300, 'spider')
    game.physics.arcade.enable(spider)
    spider.body.gravity.y = GRAVITY
    spider.body.collideWorldBounds = true
    spider.body.velocity.x = -150
    spider.animations.add('move', [0, 1, 2], 6, true)

    // enemy 2: lilShip
    const lilShip = enemies.create(game.world.width - 50, game.world.height - 250, 'robot2')
    game.physics.arcade.enable(lilShip)
    lilShip.body.gravity.y = GRAVITY
    lilShip.body.collideWorldBounds = true
    lilShip.body.velocity.x = 150
    lilShip.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)

    // platforms
    loadLevel(game.cache.getJSON('level:1'))

    // controls
    cursors = game.input.keyboard.createCursorKeys()
    controlKeys = {
      spacebar: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      f: game.input.keyboard.addKey(Phaser.Keyboard.F)
    }
  },
  update: function() {
    const hitPlatform = game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(enemies, platforms)
    game.physics.arcade.collide(enemies, enemyWalls)
    game.physics.arcade.collide(stars, platforms)

    // check overlapings
    game.physics.arcade.overlap(player, stars, function(p, s) {
      s.kill()
    }, null, this)

    game.physics.arcade.overlap(player, key, function(p, k) {
      k.kill()
    }, null, this)

    // update enemy movements
    enemies.forEach(function (e) {
      e.animations.play('move')
      if (e.body.touching.right || e.body.blocked.right) {
        e.body.velocity.x = -150
      }

      if (e.body.touching.left || e.body.blocked.left) {
        e.body.velocity.x = 150
      }
    })

    // update player movements
    player.body.velocity.x = 0
    if (cursors.left.isDown && !isDying) {
      player.body.velocity.x = -150
      player.animations.play('left')
    }
    else if (cursors.right.isDown && !isDying) {
      player.body.velocity.x = 150
      player.animations.play('right')
    }
    else if (!isDying) {
      player.animations.stop()
      player.frame = 0
    }

    if (
      (cursors.up.isDown || controlKeys.spacebar.isDown) &&
      player.body.touching.down &&
      hitPlatform) {
      player.body.velocity.y = -300
    }

    if (controlKeys.f.isDown) {
      goFullScreen()
    }

    // handle player and enemies collisions
    game.physics.arcade.overlap(player, enemies, function (player, enemy) {
      isDying = true
      player.animations.play('die').onComplete.addOnce(function () {
        player.kill()
        game.time.events.add(Phaser.Timer.SECOND * 2, function () {
          game.state.restart()
        }, this)
      }, this)
    }, null, this)
  }
})

let isFullScreen = false

function goFullScreen() {
  if (isFullScreen) {
    isFullScreen = false
    game.scale.stopFullScreen()
  }
  else {
    isFullScreen = true
    game.scale.setMaximum()
    game.scale.setScreenSize = true
    game.scale.pageAlignVertically = false
    game.scale.pageAlignHorizontally = false
    game.scale.startFullScreen(false)
  }
}

function loadLevel (data) {
  enemyWalls = game.add.group()
  enemyWalls.enableBody = true
  enemyWalls.visible = false
  platforms = game.add.group()
  platforms.enableBody = true
  data.platforms.forEach(function (platform) {
    let x = platform.x < 0 ? game.world.width + platform.x : platform.x
    let y = platform.y < 0 ? game.world.height + platform.y : platform.y
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
  })
}
