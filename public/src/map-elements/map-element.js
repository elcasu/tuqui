define(['phaser', 'modules/game'], function(Phaser, Game) {
  const game = Game.getInstance()

  function MapElement(x, y, name) {
    Phaser.Sprite.call(this, game, x, y, name)
    game.physics.enable(this)
    this.body.immovable = true
    this.body.allowGravity = false
  }

  MapElement.prototype = Object.create(Phaser.Sprite.prototype)
  MapElement.prototype.constructor = MapElement

  return MapElement
})
