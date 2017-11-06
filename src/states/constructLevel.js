const ConstructLevelState = {}

ConstructLevelState.init = function (data) {
}

ConstructLevelState.create = function () {
  // group sprites in a container
  const spider = new Spider(this.game, 10, 10, true)
  this._makeClonable(spider)
  const spider2 = new Spider2(this.game, 10, 100, true)
  this._makeClonable(spider2)
  const lilShip = new LilShip(this.game, 25, 150, true)
  this._makeClonable(lilShip)
  // const platform = new Platform(this.game, 25, 200, true)
  // this._makeClonable(platform)
  this.navbar = this.game.add.group()
  this.navbar.add(spider)
  this.navbar.add(spider2)
  this.navbar.add(lilShip)
  //this.navbar.add(plarform)

  // add divisor
  this.line = new Phaser.Line(100, 0, 100, HEIGHT);
}

ConstructLevelState.render = function () {
  this.game.debug.geom(this.line, 0xffffff)
}

ConstructLevelState._makeDraggable = function (sprite) {
  sprite.inputEnabled = true
  sprite.input.enableDrag()
}

ConstructLevelState._makeClonable = function (sprite) {
  sprite.inputEnabled = true
  sprite.input.enableDrag()
  sprite.events.onDragStart.add(this._cloneAndDrag, this)
  sprite.events.onDragStop.add(this._stopDrag, this)
}

ConstructLevelState._cloneAndDrag = function (sprite, pointer) {
  const x = sprite.position.x
  const y = sprite.position.y
  const clone = new sprite.constructor(this.game, x, y, true)
  this._makeClonable(clone)
  this.navbar.add(clone)
}

ConstructLevelState._stopDrag = function (sprite, pointer) {
  sprite.events.onDragStart.remove(this._cloneAndDrag, this)
  this._makeDraggable(sprite)
}
