const DRAG_VELOCITY = 0.05
const WINDOW_WIDTH = window.outerWidth
const WINDOW_HEIGHT = window.innerHeight

const ConstructLevelState = {}

ConstructLevelState.init = function (data) {
  this.keys = this.game.input.keyboard.addKeys({
    left: Phaser.KeyCode.LEFT,
    right: Phaser.KeyCode.RIGHT,
    up: Phaser.KeyCode.UP,
    down: Phaser.KeyCode.DOWN,
    a: Phaser.KeyCode.A,
    w: Phaser.KeyCode.W,
    s: Phaser.KeyCode.S,
    d: Phaser.KeyCode.D,
    e: Phaser.KeyCode.E
  })
  this.game.stage.backgroundColor = 0x5555ff
  this.game.editing = true
  const search = document.location.href.split('?')[1]
  this.params = {}
  if (search) {
    const params = search.split('&')
    params.forEach(function (p) {
      const pKey = p.split('=')[0]
      const pVal = p.split('=')[1]
      this.params[pKey] = pVal
    }, this)
  }
}

ConstructLevelState.create = function () {
  console.log(this.params)
  this.currentLevel = this.params.level || 'level1'
  this.game.world.setBounds(0, 0, 10000, 20000)
  this.background = this.game.add.group()
  this.background.create(0, 0, 'background')
  this.elements = this.game.add.group()
  this._loadNavbar()
  this._loadMap(this.currentLevel)
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
  sprite.input.enableSnap(16, 16, true, true)
}

ConstructLevelState._cloneAndDrag = function (sprite, pointer) {
  const x = sprite.position.x
  const y = sprite.position.y
  const clone = new sprite.constructor(this.game, x, y, true)
  levelHandler.makeClonable(clone, {
    onCloneAndDrag: this._cloneAndDrag,
    onStopDrag: this._stopDrag
  }, this)
  this.navbar.add(clone)
  sprite.fixedToCamera = false
}

ConstructLevelState._stopDrag = function (sprite, pointer) {
  sprite.events.onDragStart.remove(this._cloneAndDrag, this)
  this.navbar.remove(sprite)
  this.elements.add(sprite)
  this._makeDraggable(sprite)
  if (sprite.dragFromNavbar) {
    sprite.x += this.game.camera.x
    sprite.y += this.game.camera.y
    sprite.dragFromNavbar = false
  }

  // handle bucket functionality
  if (Phaser.Rectangle.contains(this.bucket.body, this.game.input.x, this.game.input.y)) {
    this.elements.remove(sprite)
    sprite.kill()
  }
}

ConstructLevelState._pointerIntersects = function (pointer, sprite) {
  const pBounds = new Phaser.Rectangle( pointer.position.x, pointer.position.y, 1, 1)
  return Phaser.Rectangle.intersects(pBounds, sprite.getBounds())
}

ConstructLevelState._loadNavbar = function () {
  const xPadding = 45
  const navHeight = 170
  const rightPadWidth = 200
  const padColor = 0x333333

  // static background
  const leftPad = this.game.add.graphics(0, 0)
  leftPad.beginFill(padColor)
  leftPad.drawRect(0, 0, xPadding, navHeight)
  leftPad.endFill()

  const rightPad = this.game.add.graphics(0, 0)
  rightPad.beginFill(padColor)
  rightPad.drawRect(WIDTH - rightPadWidth, 0, WIDTH, navHeight)
  rightPad.endFill()


  // inner background
  const navBackground = this.game.add.graphics(0, 0)
  navBackground.beginFill(0x330000)
  //navBackground.alpha = 0.5
  navBackground.drawRect(xPadding, 0, WIDTH - xPadding * 2, navHeight)
  navBackground.endFill()

  // add items to the navbar
  this.elemWrapper = this.game.add.group()
  this.navbar = this.game.add.group()
  this.navbar.add(navBackground)
  this.navbar.add(this.elemWrapper)
  this.navbar.add(leftPad)
  this.navbar.add(rightPad)

  // elements
  let x = xPadding + 10
  let y = 15
  levelHandler.getAll().forEach(function (element) {
    const instance = levelHandler.createInstance(
      element,
      {
        position: { x: x, y: y },
        isClonable: !element.unique,
        onCloneAndDrag: this._cloneAndDrag,
        onStopDrag: this._stopDrag
      },
      this
    )
    this.elemWrapper.add(instance)
    x += instance.width + 20
  }, this)

  // thrash bucket
  const bucket = this.game.add.sprite(WIDTH - 100, 25, 'bucket')
  bucket.game.physics.arcade.enable(bucket)
  bucket.body.allowGravity = false
  this.bucket = bucket

  // save button
  const saveButton = this.game.add.sprite(WIDTH - 150, 30, 'editor-save')
  saveButton.game.physics.arcade.enable(saveButton)
  saveButton.body.allowGravity = false
  saveButton.inputEnabled = true
  saveButton.events.onInputDown.add(function () {
    this._saveMap()
  }, this)

  this.navbar.add(bucket)
  this.navbar.add(saveButton)

  // arrows
  const rightArrow = this.game.add.sprite(WIDTH - 45, 30, 'editor-arrow')
  rightArrow.inputEnabled = true
  rightArrow.events.onInputDown.add(function (e) {
    this.elemWrapper.position.x -= 50
  }, this)
  const leftArrow = this.game.add.sprite(45, 30, 'editor-arrow')
  leftArrow.scale.x = -1
  leftArrow.inputEnabled = true
  leftArrow.events.onInputDown.add(function (e) {
    this.elemWrapper.position.x += 50
  }, this)
  this.navbar.add(rightArrow)
  this.navbar.add(leftArrow)

  this.navbar.fixedToCamera = true
}

ConstructLevelState._saveMap = function () {
  const payload = []
  this.elements.children.forEach(function (element) {
    payload.push({
      position: element.position,
      key: element.key,
      scale: element.scale,
      visible: true
    })
  })

  // request the server to save generated JSON
  const savingText = this.game.add.bitmapText(10, 100, 'carrier_command', 'Guardando...')
  savingText.fixedToCamera = true
  api.saveMap(this.currentLevel, payload).then(function (res) {
    savingText.kill()
  })
}

ConstructLevelState._loadMap = function (name) {
  const thisRef = this
  api.getMap(name).then(function (map) {
    if(map && map.length) {
      map.forEach(function (item) {
        const instance = levelHandler.createInstance(
          levelHandler.get(item.key),
          {
            position: item.position,
            isClonable: false,
            onStopDrag: thisRef._stopDrag
          },
          thisRef
        )
        thisRef._makeDraggable(instance)
        thisRef.elements.add(instance)
      })
    }
  })
}
