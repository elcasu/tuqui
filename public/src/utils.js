const levelElements = (function () {
  const _elements = [
    { key: 'spider', className: 'Spider' },
    { key: 'spider2', className: 'Spider2' },
    { key: 'lilShip', className: 'LilShip' },
    { key: 'platform', className: 'Platform' },
  ]


  return {
    getAll: function () {
      return _elements
    },
    get: function (key) {
      const f = _elements.filter(function (e) { return e.key === key })
      return f[0]
    },
    createInstance: function (game, element, opts, thisRef) {
      opts = opts || {}
      // TODO: this should be gone ASAP xD
      opts.editable = true
      const instance = new window[element.className](
        game,
        opts.position.x,
        opts.position.y,
        opts.editable
      )
      if (opts.isClonable) {
        this.makeClonable(instance, opts, thisRef)
      }
      return instance
    },
    makeClonable: function (sprite, opts, thisRef) {
      sprite.dragFromNavbar = true
      sprite.inputEnabled = true
      sprite.input.enableDrag()
      sprite.events.onDragStart.add(opts.onCloneAndDrag, thisRef)
      sprite.events.onDragStop.add(opts.onStopDrag, thisRef)
    }
  }
})()
