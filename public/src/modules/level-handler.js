define([
  'constants',
  'modules/element-factory',
  'map-elements/spike' // <-- TODO: check if this makes sense here
], function(constants, elementFactory, Spike) {
  const WIDTH = constants.WIDTH
  const HEIGHT = constants.HEIGHT

  console.log('factory [desde level handler] ==>', elementFactory)

  return (function () {
    let _groups = {}
    let _itemsCollected = []
    let _elements = Object.keys(elementFactory.elements).map(function(key) {
      return elementFactory.elements[key]
    })

     const _zOrders = [
       'stairs',
       'switches',
       'doors',
       'slideDoors',
       'items',
       'enemyWalls',
       'enemies',
       'platforms',
       'trickyPlatforms'
     ]

    function _get (key) {
      const f = _elements.find(function (e) { return e.key === key })
      return f
    }

    function _createInstance (element, opts) {
      opts = opts || {}
      if (!this.collideables) {
        this.collideables = this.game.add.group()
      }
      const instance = elementFactory.createInstance(element, {
        game: this.game,
        xPos: opts.position.x,
        yPos: opts.position.y
      })

      if (element.group) {
        if (!_groups[element.group]) {
          _groups[element.group] = this.game.add.group()
          if (element.collideable) {
            this.collideables.add(_groups[element.group])
          }
        }
        _groups[element.group].add(instance)
      } else {
        element.instance = instance
        this.game.add.existing(instance)
      }
      return instance
    }

    function _restart () {
      _groups = {}
      this.collideables = undefined
      this.game.state.restart(true, false, {
        level: this.currentLevel,
        lives: this.lives,
        coins: this.coins,
        hasKey: this.hasKey
      })

      // clear active timers
      this.timers.forEach(function (t) {
        clearInterval(t)
      })
    }

    function _levelUp () {
      _groups = {}
      this.collideables = undefined
      this.game.state.restart(true, false, {
        level: this.currentLevel + 1,
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
      const x = (constants.WINDOW_WIDTH - gameOverText.width) / 2
      const y = (constants.WINDOW_HEIGHT - gameOverText.height) / 2
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

    function _loadMap (mapItems) {
      let orderedList = []
      _zOrders.forEach(function(group) {
        orderedList = orderedList.concat(mapItems.filter(function(i) {
          return _get(i.key).group === group
        }, this))
      }, this)
      orderedList = orderedList.concat(mapItems.filter(function(i) {
        return !_get(i.key).group
      }, this))
      orderedList.forEach(function (item) {
        if (!_itemWasCollected(item)) {
          _createInstance.call(this, _get(item.key), {
            position: item.position,
            isClonable: false,
            onStopDrag: this._stopDrag
          })
        }
      }, this)
      this.game.physics.arcade.gravity.y = constants.GRAVITY

      // load spikes
      let done = false
      let x = 0
      let y = HEIGHT - 15   // <-- TODO: instead of "15", get actual height
      if (!_groups['deadlyObjects']) {
        _groups['deadlyObjects'] = this.game.add.group()
      }
      while (!done) {
        const spike = new Spike(x, y)
        _groups['deadlyObjects'].add(spike)
        x += spike.width
        if (x >= WIDTH) {
          done = true
        }
      }
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

      // get collideable objects
      getCollideables: function (thisRef) {
        return thisRef.collideables
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

      // level up :-)
      levelUp: function (thisRef) {
        _levelUp.call(thisRef)
      },

      // game over! :-(
      gameOver: function (thisRef) {
        _gameOver.call(thisRef)
      }
    }
  })()
})
