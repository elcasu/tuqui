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
  },
  create: function() {

    // TODO: Ver para la camara! :-)
    // game.camera.follow(player);


    // enemy 1: Spider

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
