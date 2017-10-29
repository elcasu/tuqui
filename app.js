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
    game.load.spritesheet('robot2', 'img/robot2.png', 48, 40)
    game.load.image('robot3', 'img/robot4.png')
    game.load.image('platform', 'img/platform.png')
    game.load.image('star', 'img/star.png')
    game.load.image('cloud1', 'img/cloud.png')
    game.load.image('cloud2', 'img/cloud2.png')

    game.load.json('level:1', 'data/level1.json')
  },
  create: function() {
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
    stars.enableBody =true
    for(let i = 0; i < 10; i++) {
      const star = stars.create(game.world.width - 50 * i, game.world.height - 250, 'star')
    }

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
    const spider = enemies.create(10, game.world.height - 200, 'spider')
    game.physics.arcade.enable(spider)
    spider.body.gravity.y = GRAVITY
    spider.body.collideWorldBounds = true
    spider.animations.add('move', [0, 1, 2], 6, true)

    // enemy 2: lilShip
    const lilShip = enemies.create(game.world.width - 50, game.world.height - 250, 'robot2')
    game.physics.arcade.enable(lilShip)
    lilShip.body.gravity.y = GRAVITY
    lilShip.body.collideWorldBounds = true
    lilShip.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)

    // platforms
    loadLevel(game.cache.getJSON('level:1'))

    // invisible platforms

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
      // if (e.body.x + e.body.width >= game.world.width && eDir === 1) {
      //   eDir = -1
      // }
      // if (e.body.x <= 0 && eDir === -1) {
      //   eDir = 1
      // }
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

function loadLevel (data) {
  platforms = game.add.group()
  platforms.enableBody = true
  data.platforms.forEach(function (platform) {
    console.log(platform)
    let x = platform.x < 0 ? game.world.width + platform.x : platform.x
    let y = platform.y < 0 ? game.world.height + platform.y : platform.y
    let p = platforms.create(x, y, platform.image)
    if (platform.scale) {
      p.scale.setTo(platform.scale[0], platform.scale[1])
    }
    p.body.immovable = true
  })
}
