const LoadingState = {}

LoadingState.init = function (nextState) {
  this.nextState = nextState || 'play'
}

LoadingState.preload = function () {
  const x = (this.game.width - 200) / 2
  const y = (this.game.height - 20) / 2
  this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  this.game.scale.updateLayout(true);
  this.game.add.text(x, y, 'Cargando...', { fill: 'gray' })
  this.game.load.spritesheet('player', 'img/player.png', 60, 54)
  this.game.load.spritesheet('spider', 'img/spider.png', 72, 72)
  this.game.load.spritesheet('spider2', 'img/spider2.png', 78, 30)
  this.game.load.spritesheet('lilShip', 'img/robot2.png', 48, 40)
  this.game.load.spritesheet('crocodile', 'img/crocodile.png', 84, 64)
  this.game.load.spritesheet('yoyo', 'img/yoyo.png', 60, 72)
  this.game.load.spritesheet('grunion', 'img/grunion.png', 168, 132)
  this.game.load.spritesheet('oer', 'img/oer.png', 48, 56)
  this.game.load.spritesheet('squarebot', 'img/squarebot.png', 84, 81)
  this.game.load.spritesheet('coin', 'img/coin.png', 30, 30)
  this.game.load.spritesheet('heart', 'img/heart.png', 48, 36)
  this.game.load.spritesheet('key', 'img/key.png', 30, 62)
  this.game.load.spritesheet('door', 'img/door.png', 84, 108)
  this.game.load.spritesheet('exitTube', 'img/exit-tube.png', 240, 174)
  this.game.load.image('invisibleWall', 'img/invisibleWall.png')
  this.game.load.image('robot3', 'img/robot4.png')
  this.game.load.image('platform', 'img/platform.png')
  this.game.load.image('platformShort', 'img/platform-short.png')
  this.game.load.image('star', 'img/star.png')
  this.game.load.image('cloud1', 'img/cloud.png')
  this.game.load.image('cloud2', 'img/cloud2.png')
  this.game.load.image('stair', 'img/stair.png')
  this.game.load.image('bucket', 'img/bucket.png')
  this.game.load.image('editor-save', 'img/editor-save.png')
  this.game.load.image('background', 'img/background.png')
  this.game.load.json('level1', '/api/maps/level1')
  this.game.load.json('level2', '/api/maps/level2')
  this.game.load.bitmapFont(
    'carrier_command',
    '../../fonts/carrier_command.png',
    '../../fonts/carrier_command.xml'
  )

  // mobile-only assets
  if (!this.game.device.desktop) {
    this.game.load.spritesheet('mobileArrow', 'img/mobileArrows.png', 44, 44)
  }
}

LoadingState.create = function () {
  this.game.state.start(this.nextState, true, false, {
    level: 1,
    lives: 3,
    coins: 0
  })
}
