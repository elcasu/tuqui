define(['map-elements/map-element'], function(MapElement) {
  function ExitTube (x, y) {
    MapElement.call(this, x, y, 'exitTube')
    this.exiting = false
    const animFrames = []
    for (let i = 0; i < 12; i++) animFrames[i] = i
    this.animations.add('player-through', animFrames, 10, false)
  }

  ExitTube.prototype = Object.create(MapElement.prototype)
  ExitTube.prototype.constructor = ExitTube

  ExitTube.prototype.exit = function (cb) {
    this.animations.play('player-through').onComplete.addOnce(function () {
      cb()
    }, this)
  }

  return ExitTube
})
