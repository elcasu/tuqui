const LoadingState = {}

LoadingState.init = function (nextState) {
  this.nextState = nextState || 'play'
}

LoadingState.preload = function () {
  this.game.load.spritesheet('player', 'img/robot1.png', 84, 54)
  this.game.load.spritesheet('spider', 'img/spider.png', 72, 72)
  this.game.load.spritesheet('spider2', 'img/spider2.png', 78, 30)
  this.game.load.spritesheet('lilShip', 'img/robot2.png', 48, 40)
  this.game.load.spritesheet('yoyo', 'img/yoyo.png', 60, 72)
  this.game.load.spritesheet('grunion', 'img/grunion.png', 168, 132)
  this.game.load.image('invisibleWall', 'img/invisibleWall.png')
  this.game.load.image('robot3', 'img/robot4.png')
  this.game.load.image('platform', 'img/platform.png')
  this.game.load.image('star', 'img/star.png')
  this.game.load.image('cloud1', 'img/cloud.png')
  this.game.load.image('cloud2', 'img/cloud2.png')
  this.game.load.image('key', 'img/key.png')
  this.game.load.image('bucket', 'img/bucket.png')
  this.game.load.image('editor-save', 'img/editor-save.png')
  this.game.load.image('background', 'img/background-sunny.png')
  this.game.load.bitmapFont(
    'carrier_command',
    '../../fonts/carrier_command.png',
    '../../fonts/carrier_command.xml'
  )
  this.game.load.json('level1', '/api/maps/level1')
}

LoadingState.create = function () {
  this.game.state.start(this.nextState, true, false, { level: 1 })
}
