const DRAG_VELOCITY = 0.05

const ConstructLevelState = {}

ConstructLevelState.init = function (data) {
  this.game.stage.backgroundColor = 0x5555ff
}

ConstructLevelState.create = function () {
  this.game.world.setBounds(0, 0, 10000, 20000)
  this.background = this.game.add.group()
  this.background.create(0, 0, 'background')
  this.elements = this.game.add.group()
  this._loadNavbar()
}

ConstructLevelState.update = function () {
  const pointer = this.game.input.activePointer
  this.background.fixedToCamera = true
  this.background.children.forEach(function (bItem) {
    // handle map dragging
    bItem.inputEnabled = true
    bItem.input.enableDrag()
    bItem.input.setDragLock(false, false)
    bItem.events.onDragStart.add(function (sprite, pointer) {
      this.isDragging = true
      this.origDragPoint = Object.assign({}, pointer.position)
    }, this)

    bItem.events.onDragStop.add(function (sprite, pointer) {
      this.isDragging = false
    }, this)
    
    if (this.isDragging) {
      this.game.camera.x += (this.origDragPoint.x - pointer.position.x) * DRAG_VELOCITY
      this.game.camera.y += (this.origDragPoint.y - pointer.position.y) * DRAG_VELOCITY
    }
  }, this)
}

ConstructLevelState.render = function () {
  this.game.debug.cameraInfo(this.game.camera, 1200, 200)
}

ConstructLevelState._makeDraggable = function (sprite) {
  sprite.inputEnabled = true
  sprite.input.enableDrag()
}

ConstructLevelState._makeClonable = function (sprite) {
  sprite.dragFromNavbar = true
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
  sprite.fixedToCamera = false
}

ConstructLevelState._stopDrag = function (sprite, pointer) {
  sprite.events.onDragStart.remove(this._cloneAndDrag, this)
  this.navbar.remove(sprite)
  this.elements.add(sprite)
  this._makeDraggable(sprite)
  console.log('DRAGFROM....', sprite.dragFromNavbar)
  if (sprite.dragFromNavbar) {
    sprite.x += this.game.camera.x
    sprite.y += this.game.camera.y
    sprite.dragFromNavbar = false
  }
}

ConstructLevelState._pointerIntersects = function (pointer, sprite) {
  const pBounds = new Phaser.Rectangle( pointer.position.x, pointer.position.y, 1, 1)
  return Phaser.Rectangle.intersects(pBounds, sprite.getBounds())
}

ConstructLevelState._loadNavbar = function () {
  // background
  const navBackground = this.game.add.graphics(0, 0)
  navBackground.beginFill(0)
  navBackground.alpha = 0.5
  navBackground.drawRect(0, 0, WIDTH, 100)
  navBackground.endFill()

  // elements
  // TODO: make this dynamic
  const spider = new Spider(this.game, 10, 10, true)
  this._makeClonable(spider)
  const spider2 = new Spider2(this.game, 100, 25, true)
  this._makeClonable(spider2)
  const lilShip = new LilShip(this.game, 200, 25, true)
  this._makeClonable(lilShip)
  const platform = new Platform(this.game, 270, 25)
  this._makeClonable(platform)

  // thrash bucket
  const bucket = this.game.add.sprite(WIDTH - 100, 20, 'bucket')
  bucket.game.physics.arcade.enable(bucket)
  bucket.body.allowGravity = false

  // save button
  const saveButton = this.game.add.sprite(WIDTH - 150, 30, 'editor-save')
  saveButton.game.physics.arcade.enable(saveButton)
  saveButton.body.allowGravity = false

  // add items to the navbar
  this.navbar = this.game.add.group()
  this.navbar.add(navBackground)
  this.navbar.add(spider)
  this.navbar.add(spider2)
  this.navbar.add(lilShip)
  this.navbar.add(platform)
  this.navbar.add(bucket)
  this.navbar.add(saveButton)

  this.navbar.fixedToCamera = true
}
