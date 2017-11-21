const levelHandler = (function () {
  let _groups = {}
  let _itemsCollected = []
  const _elements = [
    { key: 'player', className: 'Player' },
    { key: 'heart', className: 'Heart', group: 'items' },
    { key: 'coin', className: 'Coin', group: 'items' },
    { key: 'key', className: 'Key', group: 'items' },
    { key: 'spider', className: 'Spider', group: 'enemies' },
    { key: 'spider2', className: 'Spider2', group: 'enemies' },
    { key: 'lilShip', className: 'LilShip', group: 'enemies' },
    { key: 'grunion', className: 'Grunion', group: 'enemies' },
    { key: 'invisibleWall', className: 'EnemyWall', group: 'enemyWalls', visible: false },
    { key: 'platform', className: 'Platform', group: 'platforms' }
  ]

  function _get (key) {
    const f = _elements.filter(function (e) { return e.key === key })
    return f[0]
  }

  function _createInstance (element, opts) {
    opts = opts || {}
    const instance = new window[element.className](
      this.game,
      opts.position.x,
      opts.position.y
    )
    if (opts.isClonable) {
      _makeClonable.call(this, instance, opts)
    }

    if (element.group) {
      if (!_groups[element.group]) {
        _groups[element.group] = this.game.add.group()
      }
      _groups[element.group].add(instance)
    }
    else {
      element.instance = instance
      this.game.add.existing(instance)
    }
    return instance
  }

  function _restart () {
    _groups = {}
    this.game.state.restart(true, false, {
      level: this.currentLevel,
      lives: this.lives,
      coins: this.coins
    })
  }

  function _gameOver() {
    // set world "darker"
    const overlay = this.game.add.graphics(0, 0)
    overlay.beginFill(0)
    overlay.alpha = 0.5
    overlay.drawRect(0, 0, WIDTH, HEIGHT)
    overlay.endFill()

    // display "GAME OVER" text
    const gameOverText = this.game.add.bitmapText(0, 0, 'carrier_command', 'GAME OVER')
    const x = (WINDOW_WIDTH - gameOverText.width) / 2
    const y = (WINDOW_HEIGHT - gameOverText.height) / 2
    gameOverText.position.x = x
    gameOverText.position.y = y
    gameOverText.fixedToCamera = true
  }

  function _createStatusBar () {
    // key sprite
    const key = _createInstance.call(
      this,
      _get('key'),
      {
        position: {
          x: 10,
          y: 10
        }
      }
    )
    key.animations.play('inactive')

    // heart sprite
    const heart = _createInstance.call(
      this,
      _get('heart'),
      {
        position: {
          x: key.position.x + key.width + 30,
          y: key.position.y
        }
      }
    )

    // lives text
    const livesText = this.game.add.bitmapText(
      heart.position.x + heart.width + 10,
      heart.position.y,
      'carrier_command',
      this.lives
    )
    livesText.key = 'lives-text'

    // coin sprite
    const coin = _createInstance.call(
      this,
      _get('coin'),
      {
        position: {
          x: heart.position.x + heart.width + livesText.width + 40,
          y: 10
        }
      }
    )
    coin.animations.stop()

    // coins text
    const coinsText = this.game.add.bitmapText(
      coin.position.x + coin.width + 10,
      coin.position.y,
      'carrier_command',
      this.coins || '0'
    )
    coinsText.key = 'coins-text'
    this.statusBar = this.game.add.group()
    this.statusBar.add(key)
    this.statusBar.add(heart)
    this.statusBar.add(livesText)
    this.statusBar.add(coin)
    this.statusBar.add(coinsText)
    this.statusBar.fixedToCamera = true
  }

  function _updateStatusBar () {
    this.statusBar.children.forEach(function (item) {
      switch (item.key) {
        case 'lives-text':
          item.text = this.lives
          break
        case 'heart':
          if (this.lives === 0) {
            item.animations.play('sad')
          }
          break
        case 'coins-text':
          item.text = this.coins
          break
        case 'key':
          if (this.hasKey) {
            item.animations.play('active')
          }
          break
      }
    }, this)
  }

  function _collectItem (item) {
    _itemsCollected.push({
      key: item.key,
      position: item.position
    })
  }

  function _makeClonable (sprite, opts) {
    sprite.dragFromNavbar = true
    sprite.inputEnabled = true
    sprite.input.enableDrag()
    sprite.events.onDragStart.add(opts.onCloneAndDrag, this)
    sprite.events.onDragStop.add(opts.onStopDrag, this)
  }

  function _itemWasCollected (item) {
    let collected = false
    _itemsCollected.forEach(function (ic) {
      if (
        ic.key === item.key &&
        ic.position.x === item.position.x &&
        ic.position.y === item.position.y
      ) {
        collected = true
      }
    })
    return collected
  }

  function _loadMap (map) {
    map.forEach(function (item) {
      if (!_itemWasCollected(item)) {
        levelHandler.createInstance(
          levelHandler.get(item.key),
          {
            position: item.position,
            isClonable: false,
            onStopDrag: this._stopDrag
          }, this)
      }
    },this)
    this.game.physics.arcade.gravity.y = GRAVITY
  }

  return {
    // get a list of all elements
    getAll: function () {
      return _elements
    },

    // get single element
    get: function (key) {
      return _get(key)
    },

    // get registered groups
    getGroups: function () {
      return _groups
    },

    // get a group
    getGroup: function (key) {
      return _groups[key]
    },

    // create and set corresponding instance of specified element
    createInstance: function (element, opts, thisRef) {
      return _createInstance.call(thisRef, element, opts)
    },

    loadMap: function (map, thisRef) {
      _loadMap.call(thisRef, map)
    },

    // make a sprite "clonable" (mainly for map editor)
    makeClonable: function (sprite, opts, thisRef) {
      _makeClonable.call(thisRef, sprite, opts)
    },

    createStatusBar: function (thisRef) {
      _createStatusBar.call(thisRef)
    },

    updateStatusBar: function (thisRef) {
      _updateStatusBar.call(thisRef)
    },

    collectItem: function (item, thisRef) {
      _collectItem.call(thisRef, item)
    },

    // restart level
    restart: function (thisRef) {
      _restart.call(thisRef)
    },

    // game over! :-(
    gameOver: function (thisRef) {
      _gameOver.call(thisRef)
    }
  }
})()
