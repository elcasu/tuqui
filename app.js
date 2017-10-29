const WIDTH = window.outerWidth
const HEIGHT = window.innerHeight
const GRAVITY = 300
let cursors
let controlKeys
let platforms
let player
let enemies
let eDir = 1

const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', {
  preload: function () {
    game.load.spritesheet('robot1', 'img/robot1.png', 84, 54)
    game.load.spritesheet('spider', 'img/spider.png', 72, 72)
    game.load.image('robot2', 'img/robot2.png')
    game.load.image('robot3', 'img/robot4.png')
    game.load.image('platform', 'img/platform.png')
    game.load.image('star', 'img/star.png')
    game.load.image('cloud1', 'img/cloud.png')
    game.load.image('cloud2', 'img/cloud2.png')
  },
  create: function() {
    game.stage.backgroundColor = 0x3ac0f4
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // clouds and background stuff
    const clouds = game.add.group()
    let cl1 = clouds.create(800, 100, 'cloud1')
    let cl2 = clouds.create(500, 50, 'cloud2')

    // player
    player = game.add.sprite(10, 10, 'robot1')
    game.physics.arcade.enable(player)
    player.body.bounce.y = 0.2
    player.body.gravity.y = GRAVITY
    player.body.collideWorldBounds = true
    player.animations.add('left', [0, 1, 2, 3], 6, true)
    player.animations.add('right', [0, 1, 2, 3], 6, true)

    // enemy 1: Spider
    enemies = game.add.group()
    const enemy = enemies.create(10, game.world.height - 200, 'spider')
    game.physics.arcade.enable(enemy)
    enemy.body.gravity.y = GRAVITY
    enemy.body.collideWorldBounds = true
    enemy.animations.add('move', [0, 1, 2], 6, true)

    // platforms
    platforms = game.add.group()
    platforms.enableBody = true
    let ground = platforms.create(0, game.world.height - 60, 'platform')
    ground.scale.setTo(12, 5)
    ground.body.immovable = true

    let pl = platforms.create(0, 200, 'platform')
    pl.scale.setTo(2, 2)
    pl.body.immovable = true

    pl = platforms.create(game.world.width - 512, game.world.height - 200, 'platform')
    pl.scale.setTo(4, 2)
    pl.body.immovable = true

    // stars
    stars = game.add.group()
    stars.enableBody =true
    for(let i = 0; i < 10; i++) {
      const star = stars.create(game.world.width - 50 * i, game.world.height - 250, 'star')
    }

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
    game.physics.arcade.collide(stars, platforms)

    // check overlapings
    game.physics.arcade.overlap(player, stars, function(p, s) {
      s.kill()
    }, null, this)

    // update enemy movements
    enemies.forEach(function (e) {
      e.animations.play('move')
      e.body.velocity.x = eDir * 150
      if (e.body.x + e.body.width >= game.world.width && eDir === 1) {
        eDir = -1
      }
      if (e.body.x <= 0 && eDir === -1) {
        eDir = 1
      }
    })

    // update player movements
    player.body.velocity.x = 0
    if (cursors.left.isDown) {
      player.body.velocity.x = -150
      player.animations.play('left')
    }
    else if (cursors.right.isDown) {
      player.body.velocity.x = 150
      player.animations.play('right')
    }
    else {
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
