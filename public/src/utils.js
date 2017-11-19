const levelHandler = (function () {
  let _groups = {}
  const _elements = [
    { key: 'player', className: 'Player' },
    { key: 'heart', className: 'Heart', group: 'items' },
    { key: 'spider', className: 'Spider', group: 'enemies' },
    { key: 'spider2', className: 'Spider2', group: 'enemies' },
    { key: 'lilShip', className: 'LilShip', group: 'enemies' },
    { key: 'grunion', className: 'Grunion', group: 'enemies' },
    { key: 'invisibleWall', className: 'EnemyWall', group: 'enemyWalls', visible: false },
    { key: 'platform', className: 'Platform', group: 'platforms' },
  ]

  return {
    // get a list of all elements
    getAll: function () {
      return _elements
    },

    // get single element
    get: function (key) {
      const f = _elements.filter(function (e) { return e.key === key })
      return f[0]
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
    createInstance: function (game, element, opts, thisRef) {
      opts = opts || {}
      const instance = new window[element.className](
        game,
        opts.position.x,
        opts.position.y
      )
      if (opts.isClonable) {
        this.makeClonable(instance, opts, thisRef)
      }

      if (element.group) {
        if (!_groups[element.group]) {
          _groups[element.group] = game.add.group()
        }
        _groups[element.group].add(instance)
      }
      else {
        element.instance = instance
        game.add.existing(instance)
      }
      return instance
    },

    // make a sprite "clonable" (mainly for map editor)
    makeClonable: function (sprite, opts, thisRef) {
      sprite.dragFromNavbar = true
      sprite.inputEnabled = true
      sprite.input.enableDrag()
      sprite.events.onDragStart.add(opts.onCloneAndDrag, thisRef)
      sprite.events.onDragStop.add(opts.onStopDrag, thisRef)
    },

    // restart level
    restart: function (game) {
      _groups = {}
      game.state.restart()
    }
  }
})()
